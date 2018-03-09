const ddiff = require('return-deep-diff');

module.exports = (oMember, nMember) => {
    if (oMember.user.bot) return;
    console.log(ddiff(oMember, nMember));
}