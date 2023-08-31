import DiscordSocket from "./discordSocket";

export = class Channel {
  private ch: any;
  private c: DiscordSocket;

  constructor(client: DiscordSocket, channel: string) {
    this.c = client;
    this.ch = this.c.guilds.channels.filter((c: any) => c.id == channel)[0];
  }

  get id() {
    return this.ch.id;
  }

  get name() {
    return this.ch.name;
  }
};
