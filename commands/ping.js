module.exports = {
    name: 'ping',
    description: 'Ping!',
    aliases: ['p','pong'],
    args :false,
    guildOnly: true,
    cooldown: 5,
    call(message, args) {
        message.channel.send('Pong.');
        // message.reply('Pong')
    },
};