const Discord = require("discord.js");
const Tickets = require("../tickets/tickets.js")

exports.run = async (client, message, args) => {

  var perms = message.member.hasPermission("BAN_MEMBERS") && Tickets.idsExcepcion.indexOf(message.author.id) != -1;
 if(!perms) return message.channel.send("`Error` `|` `No tienes Permisos para usar este comando.`");
  
if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("➤ ┆ ¡No tienes permisos!")

const ms = require ("ms");
  let user = message.mentions.members.first();
  if(!user) return message.reply("➤ ┆ No has mencionado a un miembro");
  let muteRole = message.guild.roles.find(x => x.name ===  "Muted"); 
  if(!muteRole) return message.reply("➤ ┆ No existe ningún rol llamado `Muted` en el Servidor");
  let params = message.content.split (" ").slice(1);
  let razon = args.slice(2).join(' ');        
  if(!razon) razon = "➤ ┆ Sin razón agregada";
  
 const megadb = require("megadb");
let mutes = new megadb.crearDB("mutes");

  
  if(mutes.tiene(user.id)){
    mutes.sumar(`${user.id}`,1)
    }else{
    mutes.establecer(`${user.id}`,1)
  }
  
  user.addRole(muteRole.id)
  user.removeRole('732188321903542342')
  
  const muteEmbed = new Discord.RichEmbed()
  .setColor("RED")
  .setThumbnail(user.user.displayAvatarURL)
  .setDescription("➤ ┆ Se ha muteado a un usuario del servidor.")
  .addField("➨ ┃ Usuario", `**➽ TAG** ➤ ┆ ${user.user.tag}\n**➽ ID** ➤ ┆ ${user.user.id}`)
  .addField("➨ ┃ Staff", `**➽ TAG** ➤ ┆ ${message.author.tag}\n**➽ ID** ➤ ┆ ${message.author.id}\n**➽ Mención** ➤ ┆ ${message.author}`)
  .addField("➨ ┃ Razón del Muteo", `➤ ┆ ${razon}`)
  .setTimestamp()
  user.send(muteEmbed)
  const banEmbed2 = new Discord.RichEmbed()
  .setColor("RED")
  .setThumbnail(user.user.displayAvatarURL)
  .setDescription("➤ ┆ Te han muteado en el servidor.")
  .addField("➨ ┃ Usuario", `**➽ TAG** ➤ ┆ ${user.tag}\n**➽ ID** ➤ ┆ ${user.user.id}`)
  .addField("➨ ┃ Staff", `**➽ TAG** ➤ ┆ ${message.author.tag}\n**➽ ID** ➤ ┆ ${message.author.id}\n**➽ Mención** ➤ ┆ ${message.author}`)
  .addField("➨ ┃ Razón del Muteo", `➤ ┆ ${razon}`)

  .addField("➨ ┃ Apelar", `Debes de apelar con el miembro del Staff que te muteo.`)
  .setTimestamp()
  
  //message.guild.channels.get("693798085809405973").send(muteEmbed)
  client.channels.get(process.env.CANAL_LOG).send(muteEmbed)
}

