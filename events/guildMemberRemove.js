module.exports = member => {
    let guild = member.guild;
    guild.systemChannel.send(`Please say goodbye ${member.user.username}, we will miss you!`);
}