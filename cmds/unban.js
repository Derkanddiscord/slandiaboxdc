const Discord = require("discord.js")
const Tickets = require("../tickets/tickets.js")

exports.run = (client, message, args) => {

if(!message.member.hasPermission("MENTION_EVERYONE") && Tickets.idsExcepcion.indexOf(message.author.id) != -1) return message.channel.send("➤ ┆ No tienes los permisos necesarios.")
if(!args[0]) return message.channel.send("➤ ┆ Ingresa la ID del usuario.")
let id = args[0]

if(isNaN(id)) return message.channel.send("➤ ┆ Ingresa una ID válida.")
if(id == client.user.id) return message.channel.send("Error.")
if(message.guild.members.get(id)) return message.channel.send("➤ ┆ Esa ID le pertenece a uno de los usuarios de este servidor.")

  
 const megadb = require("megadb");
let unban = new megadb.crearDB("unban");

  
  if(unban.tiene(message.author.id)){
    unban.sumar(`${message.author.id}`,1)
    }else{
    unban.establecer(`${message.author.id}`,1)
  }
  
  
  
client.fetchUser(id).then(async (usuario) => { 
   let banusers = await message.guild.fetchBans();
   if(!banusers.has(usuario.id)) return message.channel.send('➤ ┆ Este usuario actualmente no se encuentra baneado en este servidor.');
   
  const banEmbed = new Discord.RichEmbed()
  .setColor("RED")
  .setThumbnail(usuario.displayAvatarURL)
  .setDescription("Se ha desbaneado a un usuario en el servidor.")
  .addField("➨ ┃ Usuario", `**➽ TAG** ➤ ┆ ${usuario.tag}\n**➽ ID** ➤ ┆ ${usuario.id}`)
  .addField("➨ ┃ Staff", `**➽ TAG** ➤ ┆ ${message.author.tag}\n**➽ ID** ➤ ┆ ${message.author.id}\n**➽ Mención** ➤ ┆ ${message.author}`)
  .setTimestamp()
  
   message.guild.unban(usuario.id).then(  () => {
     message.channel.send('➤ ┆ Se ha desbaneado correctamente al usuario en el servidor.')
     message.guild.channels.get(process.env.CANAL_LOG).send(banEmbed) 
    }).catch(error => {
       //message.channel.send("error: "+error.message)
   })
}).catch(error => {
   message.channel.send("➤ ┆ El usuario con ese ID no existe.")
})

}