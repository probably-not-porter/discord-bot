// XBOT
// Porter L

// JS REQUIREMENTS
const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const bot = new Discord.Client(); // Create discord bot

// Get settings from .env (See README for setup details)
const prefix = process.env.PREFIX;
const token = process.env.DISCORD_TOKEN;


// -------------------- BOT CONFIGURATION -------------------- // 
const filter_words = ["heck", "shoot", "darn"];
// channels
const rules_channel_id = '740382874225737779'; // channel for ONLY rules agreement
const admin_channel_id = '742832716923535480'; // admin only channel

// roles
const user_role_id = '740383032560844873'; // role for basic user
const mod_role_id; // role for moderator
const admin_role_id; // role for administrator
bot.commands = new Discord.Collection();


// -------------------- EXTERNAL FUNCTIONS -------------------- // 
const functionFiles = fs.readdirSync('./functions/').filter(file => file.endsWith('.js'));
for (const file of functionFiles){
    const command = require(`./functions/${file}`);
    bot.commands.set(command.name, command);
}
bot.commands.get('rules-agreement').execute(bot, rules_channel_id, user_role_id); // start rules agreement, check for agrees
bot.commands.get('text-filter').execute(bot, filter_words); // check for filter words


// -------------------- EXTERNAL COMMANDS -------------------- // 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}
bot.on('message', message => {  // check for commands being run
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping'){
        bot.commands.get('ping').execute(message, args);
    }
    if (command === 'ticket'){
        bot.commands.get('ticket').execute(message, args, bot, admin_channel_id);
    }
});


// -------------------- STARTUP BOT -------------------- // 
bot.login(token);