const Discord = require('discord.js');
module.exports = {
    name: 'rules-agreement',
    description: 'Create a permission modifying rules agreement in specific channel',
    execute(bot, rules_channel_id, user_role_id){
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
    }
}