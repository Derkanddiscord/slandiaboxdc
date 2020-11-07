const Discord = require("discord.js");
exports.run = async (client, message, args) => {

if(message.author.bot) return; 
  
var ids = ["330238135629905921", "249500266628513794"] 

if(!ids.some(ids => message.author.id == ids)) return message.channel.send(":x: ¡No tienes permisos para usar ese comando! (Solo creador del bot)")
    console.log(`asd`) 
    message.channel.send("`> [ REINICIANDO ] <`").then(() => {
        client.destroy().then(() => {
            process.exit(); 
        });
    }); 
} 