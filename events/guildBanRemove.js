module.exports = (guild, user) => {
    guild.systemChannel.send(`${user.username} has unbanned!`);
}