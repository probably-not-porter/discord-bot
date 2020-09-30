module.exports = {
    name: 'ping',
    description: 'ping the bot',
    execute(message, args){
        console.log("Return ping")
        message.channel.send('Return ping');
    }
}