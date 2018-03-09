const chalk = require('chalk');

module.exports = client => {
    console.log(chalk.green('I\'m Online'));
    client.user.setActivity('Kani 0.0.1 | !help');
}