const settings = require('../settings.json');
const prefix = settings.prefix;

module.exports = message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    let client = message.client;
    let command = message.content.split(" ")[0].slice(prefix.length);
    let args = message.content.split(" ").slice(1);
    let perms = client.elevation(message);
    let cmd;
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
        if (perms < cmd.conf.permLevel) return;
        cmd.run(client, message, args, perms);
    }
}