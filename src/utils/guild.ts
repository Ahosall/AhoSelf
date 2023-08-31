import DiscordSocket from "./discordSocket";

export = class Guild {
  private g: any;
  private c: DiscordSocket;

  constructor(client: DiscordSocket, guild: string) {
    this.c = client;
    this.g = this.c.guilds.filter((g: any) => g.id == guild)[0];

    console.log(this.g);
  }

  get id() {
    return this.g.id;
  }

  get name() {
    return this.g.name;
  }

  get icon() {
    return this.g.icon;
  }

  get channels() {
    return this.g.channels;
  }

  get threads() {
    return this.g.threads;
  }

  get roles() {
    return this.g.roles;
  }
};
