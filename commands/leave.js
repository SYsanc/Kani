exports.run = (client, message, args) => {
    let voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
        message.channel.send('I am not in a voice channel');
    } else {
        message.channel.send('Leaving...')
            .then(m => {
                voiceChannel.leave();
                m.edit('Bye bye :wave:')
                .then(response => response.delete(1500));    
        })
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "leave",
    description: "Leaving now voice channel.",
    usage: "leave"
  };