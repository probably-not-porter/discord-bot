// XBOX DISCORD BOT FOR XRP
// Porter L

// JS REQUIREMENTS
const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();

// BOT CONFIG
const bot = new Discord.Client();

const prefix = process.env.PREFIX;
const token = process.env.DISCORD_TOKEN;

const filter_words = ["heck", "shoot", "darn"];
const rules_channel_id = '740382874225737779';
const admin_channel_id = '742832716923535480';
const user_role_id = '740383032560844873';

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

// BOT STARTUP SEQUENCE
bot.on('ready', () => { // Print rules to rules channel
    console.log('BOT ONLINE');
    const rules_channel = bot.channels.cache.get(rules_channel_id);
    rules_channel.bulkDelete(3);

    rules_channel.send({ embed: new Discord.MessageEmbed() // create rules embed
        .setColor('#0099ff')
        .setTitle('XRP Discord')
        .setURL('https://discord.js.org/')
        .setDescription('Some description here')
        .setThumbnail('https://i.imgur.com/wSTFkRM.png')
        .addFields(
            { name: 'Rules', value: '1. first rule\n 2. second rule' },
        )
        .addField('Inline field title', 'Some value here', true)
        .setFooter('React with ✅ to agree to the rules', 'https://i.imgur.com/wSTFkRM.png')
        });
});

bot.on('message', msg=>{ // Start listener for rules agreement
    if (msg.channel.name == "rules"){
        msg.react('✅');
    } 
    const filter = (reaction, user) => {
        return reaction.emoji.name === '✅' && user.id !== msg.author.id;
    };
    const collector = msg.createReactionCollector(filter);
    collector.on('collect', (reaction, user) => {
        const guild = reaction.message.guild;
        const memberWhoReacted = guild.members.cache.find(member => member.id === user.id);
        memberWhoReacted.roles.add(user_role_id);
        console.log(user.username + " added to users");
    });
});

// TEXT FILTER
bot.on('message', msg=>{
    for (var x = 0; x < filter_words.length; x++){
        if (msg.content.includes(filter_words[x])){
            console.log('filter word instance deleted');
            msg.delete();
        }
    }
});

// COMMANDS
bot.on('message', message => { 
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

// Start bot
bot.login(token);