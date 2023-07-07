require("dotenv").config();
console.clear();

import DiscordSocket from "./utils/discordSocket";
import Message from "./utils/message";

const discordSocket = new DiscordSocket(process.env.TOKEN || "");

discordSocket.connect();

discordSocket.on("MESSAGE_CREATE", (event) => {
  const message = new Message(event);
  const prefix = ".";

  if (!message.content.startsWith(prefix)) return;

  if (message.content == ".test") {
    message.channel.send(
      `Olá ${message.author.username}, você está no canal *${message.channel.name}* (\`${message.channel.id}\`)`
    );
  }

  console.log(`[LOG] <user> executou o comando ${message.content}`);
});

discordSocket.on("READY", (event) => {
  console.log(`[SYS] ${event.user.username} status: Online!\n`);
});
