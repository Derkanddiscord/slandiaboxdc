const { RichEmbed } = require("discord.js");
exports.run = (client, message, args) => {
  
let users = message.mentions.users.map(m => m.username).join(' y ');
if(!users) return message.channel.send('Mencione a dos usuarios para calcular');
    
const random = Math.floor(Math.random() * 100);
let heard = "";
 
    if(random < 50){
        heard=':broken_heart:';

    }else if(random < 80){
        heard=':sparkling_heart: ';
        
    }else if(random < 101){
        heard=':heart:';

    }
            
const embed = new RichEmbed()
    .setAuthor('El porcentaje de amor de '+users+' es:')
    .setDescription(heard+' **'+random+' %**'+' '+heard)
    .setColor(0xff4d4d)

message.channel.send(embed);
}