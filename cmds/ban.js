const Discord = require("discord.js");
const Tickets = require("../tickets/tickets.js")

exports.run = async (client, message, args) => {
let user = message.mentions.members.first();
let razon = args.slice(1).join(' ');        
if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("➤ ┆ ¡No tienes permisos!")


var perms = message.member.hasPermission("BAN_MEMBERS") && Tickets.idsExcepcion.indexOf(message.author.id) != -1;
if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");

if (message.mentions.users.size < 1) return message.reply('➤ ┆ Debe mencionar a alguien. ┆').catch(console.error);
if(!razon) razon = "➤ ┆ Sin razón agregada";

  
  
 const megadb = require("megadb");
let ban = new megadb.crearDB("ban");

  
  if(ban.tiene(user.id)){
    ban.sumar(`${user.id}`,1)
    }else{
    ban.establecer(`${user.id}`,1)
  }
  
  
  
if (user.bannable === false) return message.reply('➤ ┆ No puedo banear al usuario mencionado. ');
const banEmbed2 = new Discord.RichEmbed()
.setColor("RED")
.setThumbnail(user.user.displayAvatarURL)
.setDescription("Se te ha baneado del servidor.")
.addField("➨ ┃ Usuario", `**➽ TAG** ➤ ┆ ${user.user.tag}\n**➽ ID** ➤ ┆ ${user.user.id}`)
.addField("➨ ┃ Staff", `**➽ TAG** ➤ ┆ ${message.author.tag}\n**➽ ID** ➤ ┆ ${message.author.id}\n**➽ Mención** ➤ ┆ ${message.author}`)
.addField("➨ ┃ Razón del baneo", `➤ ┆ ${razon}`)
.addField("➨ ┃ Apelar", `➽ Debes de apelar con el miembro del Staff que te baneo.`)
.setTimestamp()

const member = message.guild.member(user);
await member.ban({reason: razon})
 member.send(banEmbed2) 
const banEmbed = new Discord.RichEmbed()
.setColor("RED")
.setThumbnail(user.user.displayAvatarURL)
.setDescription("Se ha baneado a un usuario del servidor.")
.addField("➨ ┃ Usuario", `**➽ TAG** ➤ ┆ ${user.user.tag}\n**➽ ID** ➤ ┆ ${user.user.id}`)
.addField("➨ ┃ Staff", `**➽ TAG** ➤ ┆ ${message.author.tag}\n**➽ ID** ➤ ┆ ${message.author.id}\n**➽ Mención** ➤ ┆ ${message.author}`)
.addField("➨ ┃ Razón del baneo", `➤ ┆ ${razon}`)
.setTimestamp()

message.guild.channels.get(process.env.CANAL_LOG).send(banEmbed)
  
}