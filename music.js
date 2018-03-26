const YouTube = require('simple-youtube-api');

const settings = require('../settings.json');
const queue = new Map();
const serverQueue = queue.get(message.guild.id);
const youtube = new YouTube(settings.yt_api_key);

exports.run = (client, message, args = []) => {

    if (args[0] === '재생' || args[0] === 'play' || args[0] === 'p') {

        const voiceChannel = message.member.voiceChannel;
        const permissions = voiceChannel.permissionsFor(message.client.user);

        if (!voiceChannel) return message.channel.send({embed: {
            color: 0xFF3636,
            description: `**음성채널에 입장해주세요, ${message.author}!**`
        }})

        if (!permissions.has('CONNECT')) return message.channel.send({embed: {
            color: 0xFF3636,
            description: `**해당 채널에 입장할 수 있는 권한이 없습니다, ${message.author}!**`
        }})

        if (!permissions.has('SPEAK')) return message.channel.send({embed: {
            color: 0xFF3636,
            description: `**해당 채널에 입장할 수 있는 권한이 없습니다, ${message.author}!**`
        }})

        if (!args[1]) { 
            message.channel.send({embed: {
                color: 0xFF3636,
                description: `**노래이름 또는 유튜브 링크를 입력해주세요, ${message.author}!**`
            }})
        }

        if (url.match(/^https?:\/\/(www.youtube.com||youtube.com)\/playlist(.*)$/)) {

            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();

            for (const video of Object.values(videos)) {

                const video2 = await youtube.getVideoByID(video.id);
                await VideoHandler(video2, message, voiceChannel);
            }

            message.channel.send({embed: {
                title: '재생목록이 추가되었습니다',
                color: 0x1D82B6,
                description: `**${playlist.title}**`
            }})
        } else {

            try {

                var video = await youtube.getVideo(url)
            } catch (error) {

                try {

                    var videos = await youtube.searchVideos(searchString, 10);

                    let index = 1;

                    message.channel.send({embed: {
                        title: `__**검색 결과**__`,
                        color: 0x1D82B6,
                        description: `${videos.map(video2 => `**${index++}.** ${video2.title}`).join('\n')}\n\n**c .** 취소`,
                    }})

                    try {

                        var response = await message.channel.awaitMessages(message2 => {

                            if (message2.content > 0 && message2.content < 11) {
                                if (message2.author = message.author) return message2;
                            }
                        }, 
                        {
                            maxMatches: 1,
                            errors: ['time']
                        })
                    } catch(err) {

                        console.error(err);
                        if (message2.content == 'c') return;
                        return message.channel.send({embed: {
                            color: 0xFF3636,
                            description: `**검색결과가 없습니다, ${message.author}!**`
                        }})
                    }

                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {

                    console.error(err)
                    return message.channel.send({embed: {
                        color: 0xFF3636,
                        description: `**검색결과가 없습니다, ${message.author}!**`
                    }})
                }
            }

            return VideoHandler(video, message, voiceChannel);
        }
    //} else if (args[0] === '추가') {

        if (!args[1]) return message.channel.send({embed: {
            color: 0xFF3636,
            description: `**노래이름 또는 유튜브 링크를 입력해주세요, ${message.author}!**`
        }})
    } else if (args[0] === '스킵' || args[0] === 'skip') {

        if (!message.member.voiceChannel) return message.channel.send({embed: {
            color: 0xFF3636,
            description: `**음성채널에 입장해주세요, ${message.author}!**`
        }})

        if (!serverQueue) return message.channel.send({embed: {
            color: 0xFF3636,
            description: `**재생중인 음악이 없습니다, ${message.author}!**`
        }})

        message.channel.send({embed: {
            title: '음악이 스킵되었습니다',
            color: 0x1D82B6,
            description: `**${serverQueue.songs[0].title}**`
        }})
        
        serverQueue.connection.dispatcher.end(`${message.author} : 노래를 스킵하였습니다`);
    } else if (args[0] === '중지' || args[0] === 'stop') {

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
    } else if (args[0] === '음량' || args[0] === 'volume') {

        if (!message.member.voiceChannel) return message.channel.send({embed: {
            color: 0xFF3636,
            description: `**음성채널에 입장해주세요, ${message.author}!**`
        }})

        if (!serverQueue) return message.channel.send({embed: {
            color: 0xFF3636,
            description: `**재생중인 음악이 없습니다, ${message.author}!**`
        }})

        if (!args[1]) return message.channel.send({embed: {
            color: 0x1D82B6,
            description: `**현재 음량: ${serverQueue.volume} / 100**`
        }})

        serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100);
        message.channel.send({embed: {
            color: 0x1D82B6,
            description: `**현재 음량: ${serverQueue.volume} / 100**`
        }})

    } else if (args[0] === '목록' || args[0] === 'list') {

        if (!serverQueue) return message.channel.send({embed: {
            color: 0xFF3636,
            description: `**재생 목록이 비었습니다, ${message.author}!**`
        }})

        message.channel.send({embed: {
            title: `__**현재 재생목록**__`,
            color: 0x1D82B6,
            description: `${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`,
            field: {
                value: `지금 재생중 : **${serverQueue.songs[0].title}**`
            }
        }})

    } else if (args[0] === '일시중지' || args[0] === 'pause') {

        if (serverQueue && serverQueue.playing) {

            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();

            message.channel.send({embed: {
                title: '음악이 일시중지되었습니다',
                color: 0x1D82B6,
                description: `**${serverQueue.songs[0].title}**`
            }})
        }
    } else if (args[0] === '다시재생' || args[0] === 'resume') {

        if (serverQueue && !serverQueue.playing) {

            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();

            message.channel.send({embed: {
                title: '음악이 다시재생되었습니다',
                color: 0x1D82B6,
                description: `**${serverQueue.songs[0].title}**`
            }})
        }
    } else {
        message.channel.send({embed: {
            title: '현재 재생중',
            color: 0x1D82B6,
            description: `**${serverQueue.songs[0].title}**\n\n도움말은 '${prefix}도움말 음악'을 사용해주세요`,
        }})
    }
};
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['m'],
    permLevel: 0
};
  
exports.help = {
    name: "music",
    description: "music commands",
    usage: "music"
};