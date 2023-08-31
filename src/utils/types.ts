export type TEventName = "READY" | "MESSAGE_CREATE" | "INTERACTION_CREATE";
export type TMessageContent =
  | String
  | {
      content: String;
    };
