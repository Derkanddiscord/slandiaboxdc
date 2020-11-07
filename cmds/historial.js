const Discord = require("discord.js")
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
  var numwarn = await warnsdb.obtener(usuario.id)
}else{
  var numwarn = 0
}

  
if(mutes.tiene(usuario.id)){
  var nummute = await mutes.obtener(usuario.id)
}else{
  var nummute = 0
}
  
  
if(kick.tiene(usuario.id)){
  var numkick = await kick.obtener(usuario.id)
}else{
  var numkick = 0
}
  
  
if(ban.tiene(usuario.id)){
  var numban = await ban.obtener(usuario.id)
}else{
  var numban = 0
}
  
if(tempban.tiene(usuario.id)){
  var numtempban = await tempban.obtener(usuario.id)
}else{
  var numtempban = 0
}
  
if(tempmute.tiene(usuario.id)){
  var numtempmute = await tempmute.obtener(usuario.id)
}else{
  var numtempmute = 0
}
  
if(unmute.tiene(usuario.id)){
  var numunmute = await unmute.obtener(usuario.id)
}else{
  var numunmute = 0
}
  
if(unban.tiene(usuario.id)){
  var numunban = await unban.obtener(usuario.id)
}else{
  var numunban = 0
}
  
    const embed2 = new Discord.RichEmbed() 
        embed2.setColor("RED")
        embed2.setDescription(`Historial de ${usuario.user.tag}`)
        embed2.addField("Warns",numwarn)
        embed2.addField("Mutes",nummute)
        embed2.addField("Kick",numkick)
        embed2.addField("Ban",numban)
        embed2.addField("TempBan",numtempban)
        embed2.addField("TempMute",numtempmute)
        embed2.addField("unmute",numunmute)
        embed2.addField("unban",numunban)
message.channel.send(embed2)
}