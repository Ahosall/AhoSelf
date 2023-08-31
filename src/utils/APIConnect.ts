import Axios, { AxiosInstance, AxiosResponse } from "axios";

export class APIConnect {
  private api: AxiosInstance;

  constructor(token: string) {
    this.api = Axios.create({
      baseURL: "https://discord.com/api/v9",
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  sendMessage = async (channel: string, message: any) => {
    this.api.post(`/channels/${channel}/messages`, message);
  };
}
