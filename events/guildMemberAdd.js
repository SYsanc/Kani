module.exports = member => {
    let guild = member.guild;
    guild.systemChannel.send(`Please welcome ${member.user.username} to the server!`);
}