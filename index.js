const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "kda"
const songs = ['popstars', 'more', 'baddest', 'drum', 'showyou', 'vilain']
const save = require("./save.json");
const fs = require('fs');

let data = JSON.parse(fs.readFileSync('save.json', "ascii"));

function incrementField(name){
    for(let i = 0; i < data.length; i++){
        if(data[i].name == name){
            data[i].count += 1
            fs.writeFileSync("save.json", JSON.stringify(data));
            return 0;
        }
    }
}


bot.on('ready', function(){
    bot.user.setActivity("🌟Gonna shake it in your face🌟").catch(console.error);
})

bot.login('save.token')
    .catch(console.error);


bot.on("message", function(message){
    let voiceChannel = message.member.voice.channel;
    if(message.content.startsWith(prefix+" popstars")){
        voiceChannel.join().then(connection => {
            playMusic("popstars", connection)
            data["popstars"] += 1
            incrementField("popstars")
        }) 
    }
    else if(message.content.startsWith(prefix+" more")){
        voiceChannel.join().then(connection => {
            playMusic("more", connection)
            data["more"] += 1
            incrementField("more")
        }) 
    }
    else if(message.content.startsWith(prefix+" baddest")){
        voiceChannel.join().then(connection => {
            playMusic("baddest", connection)
            data["baddest"] += 1
            incrementField("baddest")
        }) 
    }
    else if(message.content.startsWith(prefix+" drum")){
        voiceChannel.join().then(connection => {
            playMusic("drum", connection)
            data["drum"] += 1
            incrementField("drum")
        }) 
    }
    else if(message.content.startsWith(prefix+" vilain")){
        voiceChannel.join().then(connection => {
            playMusic("vilain", connection)
            data["vilain"] += 1
            incrementField("vilain")
        }) 
    }
    else if(message.content.startsWith(prefix+" showyou")){
        voiceChannel.join().then(connection => {
            playMusic("showyou", connection)
            data["showyou"] += 1
            incrementField("showyou")
        }) 
    }
    else if(message.content.startsWith(prefix+" random")){
        voiceChannel.join().then(connection => {
            let songName = songs[Math.floor((Math.random() * songs.length))]
            playMusic(songName, connection)
            data[songName] += 1
            incrementField(songName)
        }) 
    }
    else if(message.content.startsWith(prefix+" stop")){
        message.member.voice.channel.leave();
    }
    else if(message.content.startsWith(prefix+" ranking")){
        data.sort(function(a, b){
            return b.count - a.count;
        });

        const embed = new Discord.MessageEmbed();
        embed.setTitle("♥♥ K/DA ♥♥")
        embed.setAuthor(bot.user.username,  bot.user.avatarURL())
        embed.setTimestamp(Date.now());
        embed.setColor("#00ffff")
        for(var i = 0; i < data.length; i++){
            embed.addField((i+1)+" - "+data[i].name, 
            ">>> Ecoutée **"+data[i].count+"** fois"
            )
        }
        message.channel.send(embed);
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
