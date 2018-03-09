const Discord = require('discord.js');
exports.run = (client, message, args) => {
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'muted');
    if (!muteRole)  {
        message.guild.createRole({
            name: 'muted',
            color: 0xFF2424,
            hoist: true,
            mentionable: true
        })
        message.channel.send('I cannot find muteRole. I will create one for you.');
    }
    if (reason.length < 1) return message.reply('You must supply a reason for the mute.').catch(console.error);
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
    if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

    if (message.guild.member(user).roles.has(muteRole.id)) {
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setTimestamp()
            .addField('Action:', 'Unmute')
            .addField('User:', `${user.username}#${user.discriminator}`)
            .addField('Modrator:', `${message.author.username}#${message.author.discriminator}`);

        message.guild.member(user).removeRole(muteRole).then(() => {
        client.channels.get(message.channel.id).send(embed).catch(console.error);
        });
    } else {
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setTimestamp()
            .addField('Action:', 'Mute')
            .addField('User:', `${user.username}#${user.discriminator}`)
            .addField('Modrator:', `${message.author.username}#${message.author.discriminator}`);

        message.guild.member(user).addRole(muteRole).then(() => {
        client.channels.get(message.channel.id).send(embed).catch(console.error);
        });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'mute',
    description: 'mutes or unmutes a mentioned user',
    usage: 'un/mute [mention]'
};