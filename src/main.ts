require("dotenv").config();

import DiscordSocket from "./utils/discordSocket";
import Message from "./utils/message"; // Type

const client = new DiscordSocket();

// Event Message
client.on("MESSAGE_CREATE", (message: Message) => {
  const prefix = process.env.PREFIX || "-";
  if (!message.content.startsWith(prefix)) return;

  const cmd = message.content.slice(prefix.length);

  switch (cmd.toLowerCase()) {
    case "ping":
      message.reply(`> ## 🏓 | Pong!!!`);
      break;
  }
});

// Event Ready
client.on("READY", () => {
  console.log(`[SYS]: ${client.user.username} status: Online!!!`);
});

client.connect(process.env.TOKEN || "");
