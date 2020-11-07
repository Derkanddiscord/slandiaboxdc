/*const Discord = require("discord.js");
exports.run = async (client, message, args) => {
const request = require('request'); 
let pingURL = `https://api.minetools.eu/ping/play.slandia.com`;  

    request(pingURL, function(err, resp, body){
      if(err) return console.log(err.message);
      body = JSON.parse(body);
      if(body.error) return message.channel.send("El servidor esta apagado")
      const embed = new Discord.RichEmbed()
        .setTitle("Información del servidor play.slandia.com")
        .setColor("#7289D9")
        .addField('Descripción:', body.description)
        .addField('Latencia:', body.latency, true)
        .addField('Jugadores:', body.players.online+'/'+body.players.max, true)
        .addField('Versiones:', body.version.name +' Protocolo: '+ body.version.protocol+ '')    
      message.channel.send(embed);
    })  
}; */ //NO LO BORRES POR SI NO FUNCIONA LA NPM ( mc-server-status )

/*const ping = require('minecraft-server-util');
const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  
  
  ping('play.cubecraft.net', 25565)
    .then((body) => {
         const embed = new Discord.RichEmbed()
            .setTitle("Información del servidor ")
            .setColor("#7289D9")
            .addField('Jugadores:', body.onlinePlayers+'/'+body.maxPlayers, true)
            //.setThumbnail(body.favicon)
          message.channel.send(embed);
    })
    .catch((error) => {
      message.channel.send("Un error inesperado  ha ocurrido. Disculpe las molestias.")  
      throw error;
    });
  
 
}*/