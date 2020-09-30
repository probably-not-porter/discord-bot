module.exports = {
    name: 'ticket',
    description: 'Create an error ticket in the admin channel',
    execute(message, args, bot, admin_channel_id){
        const admin_channel = bot.channels.cache.get(admin_channel_id);
        console.log();
        admin_channel.send("```diff\n- An ERROR TICKET has been created!" +
            "\nTicket Author: " + message.author.username +
            "\nTicket Content: " + args.join(' ') +
            "```"
        );
    }
}