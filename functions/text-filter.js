module.exports = {
    name: 'text-filter',
    description: 'filter messages for banned text',
    execute(bot, filter_words){
        bot.on('message', msg=>{
            for (var x = 0; x < filter_words.length; x++){
                if (msg.content.includes(filter_words[x])){
                    console.log('filter word instance deleted');
                    msg.delete();
                }
            }
        });
    }
}