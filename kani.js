const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const fs = require('fs');
const moment = require("moment");
const settings = require('./settings.json');
const token = settings.token;
require('./util/eventLoader.js')(client);
// test
const log = (message) => {
    console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
    if(err) console.error(err);

    log(`Loading a total of ${files.length} commands.`);
    files.forEach(f => {
        let props = require(`./commands/${f}`);
        log(`Loading Command : ${props.help.name}`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

client.reload = function(command) {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./commands/${command}`)];
            let cmd = require(`./commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
    
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e){
            reject(e);
        }
    });
};
  
client.elevation = function(msg) {
    let permlvl = 0;
    let mod_role = msg.guild.roles.find("name", "Mods");
    if(mod_role && msg.member.roles.has(mod_role.id)) permlvl = 2;
    let admin_role = msg.guild.roles.find("name", "Devs");
    if(admin_role && msg.member.roles.has(admin_role.id)) permlvl = 3;
    if(msg.author.id === settings.ownerid) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('debug', e => {
    log(chalk.blue(e.replace(regToken, 'that was redacted')));
});

client.on('warn', e => {
    log(chalk.yellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    log(chalk.red(e.replace(regToken, 'that was redacted')));
});

client.login(token);