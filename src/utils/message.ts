import Channel from "./channel";
import DiscordSocket from "./discordSocket";
import Guild from "./guild";
import { TMessageContent } from "./types";
import { User } from "./user";

export = class Message {
  private m: any;
  private c: DiscordSocket;

  constructor(client: DiscordSocket, handler: any) {
    this.c = client;
    this.m = handler;
  }

  get author(): User {
    return this.m.author;
  }

  get content(): string {
    return this.m.content;
  }

  get channel() {
    return new Channel(this.c, this.m.channel_id);
  }

  get guild(): Guild {
    return new Guild(this.c, this.m.guild_id);
  }

  reply(content: TMessageContent) {
    this.c.sendMessage(this.m.channel_id, { m: this.m, content }, "reply");
  }
};
