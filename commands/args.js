const { prefix } = require('../configs/init')

module.exports = {
    name: 'args',
    description: 'Verifica todos los args!',
    aliases: ['a'],
    args :true,
    usage: `Modo de uso: \`${prefix}args <args>\``,
    call(message, args) {
        if (args[0] === 'foo') {
            return message.channel.send('bar');
        }

        message.channel.send(`Argumentos: ${args}\nCantidad de argumentos: ${args.length}`);
    },
};