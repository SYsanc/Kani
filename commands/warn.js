const Discord = require('discord.js');
exports.run = (client, message, args) => {
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    // let modlog = client.channels.find('name', 'mod-log');
    // if (!modlog) return message.reply('I cannot find a mod-log channel');
    if (reason.length < 1) return message.reply('You must supply a reason for the warning.');
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);

    const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Action', 'Warning')
    .addField('Reason', `${reason}`)
    .addField('User', `${user.username}#${user.discriminator}`)
    .addField('Moderator', `${message.author.username}#${message.author.discriminator}`);
    
    return message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name : "warn",
    description: "Returns page details from root's awesome bot guide.",
    usage: "warn [command]"
};