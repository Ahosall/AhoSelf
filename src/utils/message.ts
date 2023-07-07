import { APIConnect } from "./APIConnect";
import { Channel } from "./channel";
import { User } from "./user";

export = class Message {
  private m: any;
  private api: APIConnect;

  constructor(data: any) {
    this.m = data;
    this.api = new APIConnect();
  }

  get author(): User {
    return this.m.author;
  }

  get content() {
    return this.m.content;
  }

  get channel() {
    return new Channel(this.m.channel_id);
  }
};
