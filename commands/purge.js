exports.run = (client, message, args) => {
    let messagecount = parseInt(args.join(' '));
    message.channel.fetchMessages({limit: messagecount})
        .then(messages => message.channel.bulkDelete(messages)
            .then(message.channel.send(`${messagecount} message(s) has been deleted`)));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
};

exports.help = {
    name: "purge",
    description: "Purge <amount> of messages from a given channel.",
    usage: "purge <amount>"
  };