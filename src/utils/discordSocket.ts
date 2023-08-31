import WebSocket from "ws";

import Message from "./message";

import { APIConnect } from "./APIConnect";
import { TEventName } from "./types";

export = class DiscordSocket {
  private GATEWAY_URL: string;
  private socket: WebSocket | null;
  private eventHandlers: { [eventName: string]: (eventData: any) => void };
  private api: APIConnect | null = null;

  public user: any;
  public guilds: any;
  public channels: any;

  constructor() {
    this.GATEWAY_URL = "wss://gateway.discord.gg";
    this.socket = null;
    this.eventHandlers = {};

    return this;
  }

  public connect(token: string): void {
    this.socket = new WebSocket(this.GATEWAY_URL);
    this.api = new APIConnect(token);
    this.socket.onopen = () => {
      this.sendIdentify(token);
    };

    this.socket.onclose = (event: any) => {
      console.log(
        "Conexão fechada com a API de sockets do Discord:",
        event.code,
        event.reason
      );
    };

    this.socket.onmessage = (event: any) => {
      const message = JSON.parse(event.data.toString());

      switch (message.op) {
        case 0:
          this.handleEvent(message);
          break;
        case 10:
          this.startHeartbeat(message.d.heartbeat_interval);
          break;
        case 11:
          break;
        default:
          break;
      }
    };

    this.socket.onerror = (error: any) => {
      console.error("Erro na conexão com a API de sockets do Discord:", error);
    };
  }

  public send(data: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }

  public sendIdentify(token: string): void {
    const payload = {
      op: 2,
      d: {
        token: token,
        intents: 131071,
        properties: {
          $os: "linux",
          $browser: "my_library",
          $device: "my_library",
        },
      },
    };

    this.send(payload);
  }

  public startHeartbeat(interval: number): void {
    setInterval(() => {
      const payload = {
        op: 1,
        d: null,
      };

      this.send(payload);
    }, interval);
  }

  public sendMessage(channel: string, data: any, type: "reply" | "send"): void {
    var contentBuilder: any = {};

    if (typeof data.content == "string") {
      contentBuilder.content = data.content;
    } else {
      contentBuilder = { ...data.content };
    }

    if (type == "reply")
      contentBuilder.message_reference = {
        message_id: data.m.id,
        guild_id: data.m.guild_id,
        channel_id: data.m.channel_id,
      };

    if (this.api !== null) {
      this.api.sendMessage(channel, contentBuilder);
    }
  }

  public handleEvent(event: any): void {
    const eventName = event.t as string;
    if (eventName && this.eventHandlers[eventName]) {
      switch (eventName) {
        case "READY":
          this.user = event.d.user;
          this.guilds = event.d.guilds;

          this.eventHandlers[eventName](event.d);
          break;
        case "MESSAGE_CREATE":
          const msg = new Message(this, event.d);
          this.eventHandlers[eventName](msg);
          break;
        default:
          this.eventHandlers[eventName](event.d);
          break;
      }
    } else {
    }
  }

  public on(eventName: TEventName, handler: (eventData: any) => void): void {
    this.eventHandlers[eventName] = handler;
  }

  public close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
};
