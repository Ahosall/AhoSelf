import { APIConnect } from "./APIConnect";

export type TChannel = {
  name: string;
  id: string;
} | null;

export class Channel {
  private channel: TChannel = null;
  private api: APIConnect;

  constructor(id: string) {
    this.api = new APIConnect();
    this.getChannelData(id);
  }

  private async getChannelData(id: string): Promise<void> {
    try {
      this.channel = await this.api.getChannel(id);
    } catch (error) {
      console.error(error);
    }
  }

  get name(): string | undefined {
    return this.channel?.name;
  }

  get id(): string | undefined {
    return this.channel?.id;
  }

  public send = (message: string | object): void => {
    let nMessage = {};

    if (typeof message === "object") {
      nMessage = message;
    } else if (typeof message === "string") {
      nMessage = { content: message };
    } else {
      console.error("O tipo da mensagem é inválido!");
      return;
    }

    if (this.id) {
      this.api.sendMessage(this.id, {
        ...nMessage,
        tts: false,
        flags: 0,
      });
    } else {
      console.error("O canal não foi encontrado!");
    }
  };
}
