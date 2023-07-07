import WebSocket from "ws";

export = class DiscordSocket {
  private GATEWAY_URL: string;
  private TOKEN: string;
  private socket: WebSocket | null;
  private eventHandlers: { [eventName: string]: (eventData: any) => void };

  constructor(token: string) {
    this.GATEWAY_URL = "wss://gateway.discord.gg";
    this.TOKEN = token;
    this.socket = null;
    this.eventHandlers = {};
  }

  public connect(): void {
    this.socket = new WebSocket(this.GATEWAY_URL);

    this.socket.onopen = () => {
      // console.log("Conexão estabelecida com a API de sockets do Discord");

      this.sendIdentify(this.TOKEN);
    };

    this.socket.onclose = (event) => {
      console.log(
        "Conexão fechada com a API de sockets do Discord:",
        event.code,
        event.reason
      );
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data.toString());

      switch (message.op) {
        case 0:
          this.handleEvent(message);
          break;
        case 10:
          this.startHeartbeat(message.d.heartbeat_interval);
          break;
        case 11:
          // console.log("Heartbeat ACK recebido");
          break;
        default:
          break;
        // console.log("Mensagem desconhecida recebida:", message);
      }
    };

    this.socket.onerror = (error) => {
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

  public handleEvent(event: any): void {
    const eventName = event.t;
    if (eventName && this.eventHandlers[eventName]) {
      this.eventHandlers[eventName](event.d);
    } else {
      // console.log("Evento desconhecido:", eventName);
    }
  }

  public on(eventName: string, handler: (eventData: any) => void): void {
    this.eventHandlers[eventName] = handler;
  }

  public close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
};
