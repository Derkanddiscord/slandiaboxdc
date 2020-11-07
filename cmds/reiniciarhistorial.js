const Discord = require("discord.js");
exports.run = async (client, message, args) => {

if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No tienes el permiso ``BAN_MEMBERS``.");  

 let usuario = message.mentions.members.first()
if(!usuario) return message.channel.send("Menciona a un usuario")
 
  
  const megadb = require("megadb");
let warnsdb = new megadb.crearDB("warnsdb");
let mutes = new megadb.crearDB("mutes");
let kick = new megadb.crearDB("kick");
let ban = new megadb.crearDB("ban");
let tempban = new megadb.crearDB("tempban");
let tempmute = new megadb.crearDB("tempmute");
let unmute = new megadb.crearDB("unmute");
let unban = new megadb.crearDB("unban");
      
  
if(warnsdb.tiene(usuario.id)){
  var numwarn = await warnsdb.eliminar(usuario.user.id)
}

  
if(mutes.tiene(usuario.id)){
  var nummute = await mutes.eliminar(usuario.id)
}
  
  
if(kick.tiene(usuario.id)){
  var numkick = await kick.eliminar(usuario.id)
}
  
  
if(ban.tiene(usuario.id)){
  var numban = await ban.eliminar(usuario.id)
}
  
if(tempban.tiene(usuario.id)){
  var numtempban = await tempban.eliminar(usuario.id)
}
  
if(tempmute.tiene(usuario.id)){
  var numtempmute = await tempmute.eliminar(usuario.id)
}
if(unmute.tiene(usuario.id)){
  var numunmute = await unmute.eliminar(usuario.id)
}
  
if(unban.tiene(usuario.id)){
  var numunban = await unban.eliminar(usuario.id)
}
  
message.channel.send("Se ha reiniciado el historial de "+usuario )
  
}
