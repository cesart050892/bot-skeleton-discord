const { MessageEmbed } = require("discord.js")
const { prefix} = require('../configs/init')

module.exports = {
  name: "help",
  aliases: ["h", "ayuda"],
  description: "Muestra todos los comandos y descripciones",
  call(message) {
    let commands = message.client.commands.array();

    let embed = new MessageEmbed()
      .setThumbnail(message.client.user.displayAvatarURL())
      .setTitle(`${message.client.user.username} Ayuda`)
      .setDescription("Lista de ayuda para todos los comandos")
      .setColor("#F8AA2A");

    commands.forEach((cmd) => {
      embed.addField(
        `**${prefix}${cmd.name} ${cmd.aliases ? ` Atajos: ${cmd.aliases}` : ""}**`,
        `${cmd.description}`,
        true
      );
    });

    embed.setTimestamp();

    return message.channel.send(embed).catch(console.error);
  }
};