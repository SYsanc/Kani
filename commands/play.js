const ytdl = require('ytdl-core');
const queue = new Map();

exports.run = async (client, message, args) => {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
        return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
    }
    if (!permissions.has('SPEAK')) {
        return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
    }

    try {
        var connection = await voiceChannel.join();
    } catch (error) {
        console.error(`I could not join the voice channel: ${error}`);
        return message.channel.send(`I could not join the voice channel: ${error}`);
    }

    const dispatcher = connection.playStream(ytdl(args[0]))
        .on('end', () => {
            consoel.log('song ended!');
            voiceChannel.leave();
        })
        .on('error', error => {
            console.error(error);
        })
    dispatcher.setVolumeLogarithmic(50 / 100);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['p'],
    permLevel: 0
};

exports.help = {
    name : "play",
    description: "Search or play songs",
    usage: "play [songs(url)]"
};