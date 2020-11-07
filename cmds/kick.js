const Discord = require("discord.js");
const Tickets = require("../tickets/tickets.js")

exports.run = async (client, message, args) => {

let user = message.mentions.users.first();
let razon = args.slice(1).join(' ');        
/*
var perms = message.member.hasPermission("BAN_MEMBERS") && Tickets.idsExcepcion.indexOf(message.author.id) != -1;
if(!perms) return message.channel.send("`Error` `|` `No tienes Permisos para usar este comando.`");
*/
if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("➤ ┆ ¡No tienes permisos!")

if (message.mentions.users.size < 1) return message.reply('➤ ┆ Debe mencionar a alguien.').catch(console.error);
if(!razon) razon = "➤ ┆ Sin razón agregada";

  
  
 const megadb = require("megadb");
let kick = new megadb.crearDB("kick");

  
  if(kick.tiene(user.id)){
    kick.sumar(`${user.id}`,1)
    }else{
    kick.establecer(`${user.id}`,1)
  }
    
  
if (user.kickeable === false) return message.reply('➤ ┆ No puedo expulsar al usuario mencionado.');
message.guild.member(user).kick(razon);
message.channel.send("➤ ┆ Éxito").then(msg => msg.delete(6000));
const banEmbed2 = new Discord.RichEmbed()
.setColor("RED")
.setThumbnail(user.displayAvatarURL)
.setDescription("➤ ┆ Se te ha expulsado del servidor.")
.addField("➨ ┃ Usuario", `**➽ TAG** ➤ ┆ ${user.tag}\n**➽ ID** ➤ ┆ ${user.id}`)
.addField("➨ ┃ Staff", `**➽ TAG** ➤ ┆ ${message.author.tag}\n**➽ ID** ➤ ┆ ${message.author.id}\n**➽ Mención** ➤ ┆ ${message.author}`)
.addField("➨ ┃ Razón de la expulsión", `➤ ┆ ${razon}`)
.addField("➨ ┃ Apelar", `Debes de apelar con el miembro del Staff que te expulso.`)
.setTimestamp()
message.guild.member(user).send(banEmbed2)
const kickEmbed = new Discord.RichEmbed()
.setColor("RED")
.setThumbnail(user.displayAvatarURL)
.setDescription("➤ ┆ Se ha expulsado a un usuario del servidor.")
.addField("➨ ┃ Usuario", `**TAG** ➤ ┆ ${user.tag}\n**ID** ➤ ┆ ${user.id}`)
.addField("➨ ┃ Staff", `**TAG** ➤ ┆ ${message.author.tag}\n**ID** ➤ ┆ ${message.author.id}\n**Mención** ➤ ┆ ${message.author}`)
.addField("➨ ┃ Razón de la expulsión", `➤ ┆ ${razon}`)
.addField("➤ ┆ Puedes entrar otra vez al discord","https://discord.minechest.cf")
.setTimestamp()
message.guild.channels.get(process.env.CANAL_LOG).send(kickEmbed)
};
