import { APIConnect } from "./APIConnect";

export type TUser = {
  username: string;
  id: string;
  global_name: string;
  discriminator: string;
  avatar_decoration: any;
  avatar: string;
} | null;

export class User {
  private user: TUser = null;

  constructor(id: string) {
    const api = new APIConnect();

    (async () => {
      try {
        this.user = await api.getUser(id);
      } catch (error) {
        console.error(error);
      }
    })();
  }

  get username() {
    return this.user?.username;
  }

  get id() {
    return this.user?.id;
  }

  get global_name() {
    return this.user?.global_name;
  }

  get discriminator() {
    return this.user?.discriminator;
  }

  get avatar_decoration() {
    return this.user?.avatar_decoration;
  }

  get avatar() {
    return this.user?.avatar;
  }
}
