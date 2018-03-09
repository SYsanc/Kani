exports.run = (client, message, args) => {
    if (!args[0]) {
        message.channel.send(`= Command List =\n\n[Use ?help <commandname> for details]\n\n${client.commands.map(c=>`${c.help.name}:: ${c.help.description}`).join("\n")}`, {code: "asciidoc"});
    } else {
        let command = args[0];
        if(client.commands.has(command)) {
            command = client.commands.get(command);
            message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}`, {code: "asciidoc"});
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name : "help",
    description: "Returns page details from root's awesome bot guide.",
    usage: "help [command]"
};