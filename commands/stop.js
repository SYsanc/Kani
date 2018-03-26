exports.run = (client, message, args = []) => {
    if (!message.member.voiceChannel) return message.channel.send({embed: {
        color: 0xFF3636,
        description: `**음성채널에 입장해주세요, ${message.author}!**`
    }})
    
    if (!serverQueue) return message.channel.send({embed: {
        color: 0xFF3636,
        description: `**재생중인 음악이 없습니다, ${message.author}!**`
    }})
    
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end(`${message.member.tag} : 노래를 중지하였습니다`);
    message.channel.send({embed: {
        title: '음악이 중지되었습니다',
        color: 0x1D82B6,
        description: `**음악이 중지되어 재생목록을 초기화합니다**`
    }})
};
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "stop",
    description: "Stop playing music and Purge queue.",
    usage: "stop"
};