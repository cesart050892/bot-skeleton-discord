const Discord = require("discord.js");
const { token, prefix } = require("./configs/init");
const fs = require("fs");

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(" ");
  const commandName = args.shift().toLowerCase(); // ESTRUCTURA : ${PREFIX}COMMAND ARGS -> !ping hola
  // if (!client.commands.has(commandName)) return;

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `Por favor espera ${timeLeft.toFixed(
          1
        )} segundos para volver a utilizar el comando \`${prefix}${command.name}\`.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    if (command.guildOnly && message.channel.type === "dm") {
      return message.reply(
        `No puedo ejecutar este comando, dentro de DM's, ${message.author}`
      );
    }
    if (command.args && !args.length) {
      return message.channel.send(`${command.usage}, ${message.author}!`);
    }

    command.call(message, args);
  } catch (error) {
    console.error(error);
    message.reply(":x: || Hubo un error al ejecutar ese comando!");
  }
});
client
  .login(token)
  .then(() => {
    console.log(`${client.user.username} Esta conectado!`);
  })
  .catch((e) => {
    console.log(e);
  });
