module.exports = (guild, user) => {
    guild.systemChannel.send(`${user.username} has been banned!`);
}