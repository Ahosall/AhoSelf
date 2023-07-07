import Axios, { AxiosInstance, AxiosResponse } from "axios";

import { TUser } from "./user";
import { TChannel } from "./channel";

export class APIConnect {
  private api: AxiosInstance;

  constructor() {
    this.api = Axios.create({
      baseURL: "https://discord.com/api/v9",
      headers: {
        Authorization: process.env.TOKEN || "",
      },
    });
  }

  sendMessage = async (channel: string, message: any) => {
    console.log(channel, message);
    this.api.post(`/channels/${channel}/messages`, message);
  };

  getUser = async (id: string): Promise<TUser> => {
    const response: AxiosResponse<TUser> = await this.api.get("/users/" + id);
    return response.data;
  };

  getChannel = async (id: string): Promise<TChannel> => {
    const response: AxiosResponse<TChannel> = await this.api.get(
      "/channels/" + id
    );
    return response.data;
  };
}
