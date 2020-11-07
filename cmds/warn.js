const Discord = require("discord.js");
const Tickets = require("../tickets/tickets.js")

exports.run = async (client, message, args) => {

let wuser = message.mentions.users.first() 
if(!wuser) return message.channel.send(`¡Menciona algún Usuario!`)
  let wreason = args.join(" ")
  if (!wreason) return message.channel.send("➤ ┆ Escriba la razón del aviso")
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("➤ ┆ ¡No tienes permisos!")

//  if (!message.member.hasPermission("BAN_MEMBERS") && Tickets.idsExcepcion.indexOf(message.author.id) != -1) return message.channel.send("➤ ┆ ¡No tienes permisos!")
  let guild = message.guild;
  
 const megadb = require("megadb");
let warnsdb = new megadb.crearDB("warnsdb");

  
  if(warnsdb.tiene(wuser.id)){
    warnsdb.sumar(`${wuser.id}`,1)
    }else{
    warnsdb.establecer(`${wuser.id}`,1)
  }
    
  const embed = new Discord.RichEmbed()
  .setThumbnail(wuser.avatarURL)
  .setColor("RANDOM")
  .addField("➨ ┃ Usuario Avisado","Discord: MineChest")
  .addField("➨ ┃ ID", wuser.id)
  .addField("➨ ┃ Motivo", wreason)
  .addField("➨ ┃ Miembro del Staff", message.author.username)
  .addField ("➤ ┆ Has sido avisado por comportamiento inadecuado", "Aviso")
  
  message.guild.channels.get(process.env.CANAL_LOG).send(embed) 
  
  const banEmbed2 = new Discord.RichEmbed()
  .setThumbnail(wuser.avatarURL)
  .setColor("RANDOM")
  .addField("Usuario Avisado","Discord: MineChest")
  .addField("➨ ┃ ID", wuser.id)
  .addField("➨ ┃ Motivo", wreason)
  .addField("➨ ┃ Miembro del Staff", message.author.username)
  .addField ("➤ ┆Has sido avisado por comportamiento inadecuado", "Aviso")
    
    .addField("➤ ┆ Apelar", `Debes de apelar con el miembro del Staff que te expulso.`)
    .setTimestamp()
  wuser.send(banEmbed2)
}