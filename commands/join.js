exports.run = (client, message, args) => {
    let voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
        message.channel.send('I am not in a voice channel');
    } else {
        message.channel.send('Joining...')
            .then(m => {
                voiceChannel.join()
            .then(() => {
                m.edit('Joined sucessfully.')
            .then(response => response.delete(1500))
            })
            .catch(error => message.channel.send(error));
        });
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['j'],
    permLevel: 0
};

exports.help = {
    name: "join",
    description: "Join your voice channel.",
    usage: "join"
};