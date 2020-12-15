const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Ping!',
    aliases: ['p','pong'],
    args :false,
    guildOnly: true,
    cooldown: 5,
    call(message, args) {
        let ping = Math.floor(message.client.ping);
        message.channel.send("Cargando...").then(m => {
          m.edit({embed: {
            title: "Pong!:ping_pong: ",
            description: `Mensaje: **${Math.floor(
              m.createdTimestamp - Date.now()
            )}ms**, API: **${ping}ms**`
            }});
        });
    },
};