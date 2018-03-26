exports.run = (client, message, args = []) => {
        message.channel.send("error");
    };
    
    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['q'],
        permLevel: 0
    };
    
    exports.help = {
        name: "queue",
        description: "Song add to queue.",
        usage: "queue [songs(url)]"
        };
        