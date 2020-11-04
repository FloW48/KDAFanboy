const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "kda"
const songs = ['popstars', 'more', 'baddest']

bot.on('ready', function(){
    bot.user.setActivity("🌟We popstars🌟").catch(console.error);
})

bot.login('NzczNDk2OTQyMDgwNTU3MDg2.X6KFKQ.uK7C19ilz60667_NEuqUuJ58Zcw')
    .catch(console.error);


bot.on("message", function(message){
    let voiceChannel = message.member.voice.channel;
    if(message.content.startsWith(prefix+" popstars")){
        voiceChannel.join().then(connection => {
            playMusic("popstars", connection)
        }) 
    }
    else if(message.content.startsWith(prefix+" more")){
        voiceChannel.join().then(connection => {
            playMusic("more", connection)
        }) 
    }
    else if(message.content.startsWith(prefix+" baddest")){
        voiceChannel.join().then(connection => {
            playMusic("baddest", connection)
        }) 
    }
    else if(message.content.startsWith(prefix+" stop")){
        message.member.voice.channel.leave();
    }
    else if(message.content.startsWith(prefix+" random")){
        voiceChannel.join().then(connection => {
            playMusic(songs[Math.floor((Math.random() * songs.length))], connection)
        }) 
    }
})


async function playMusic(name, connection){
    console.log("play "+name+".mp3")
    dispatcher = connection.play(name+'.mp3', {volume : 1})
    .on('error', () => {
        message.channel.send('**__Une erreur s\'est produite, veuillez réessayer__**')
    })

    dispatcher.on('finish', function(){
        connection.disconnect();
    })
}