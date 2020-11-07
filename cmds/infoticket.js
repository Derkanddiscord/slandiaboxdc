const Discord = require("discord.js");

const Tickets = require("../tickets/tickets.js")

exports.run = async (client, message, args) => {
  
    
  if(!message.member.roles.has(Tickets.rolStaff)) return message.channel.send("Solo miembros del staff pueden usar este comando.");

  if (!args[0]) return message.channel.send("Necesita escribir el número de ticket. -InfoTicket <Número de Ticket>")
  if (isNaN(args[0])) return message.channel.send("Necesita escribir el número de ticket. -InfoTicket <Número de Ticket>")
  
  var Respuesta = Tickets.infoTicket(args[0], message)
  
  
  if(typeof Respuesta == "string") return message.channel.send(Respuesta);
  
  var Embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("Información del Ticket " + args[0] )
  .setAuthor("Pedido por " + message.author.username, message.author.avatarURL)
  .addField("📥 Creado por:" , Respuesta.autor.username + " (**" + Respuesta.autor.id + "**)")
  .addField("❔ Razón:", Respuesta.razon)
  .addField("📤 Estado:", "El ticket se encuentra **" + Respuesta.estado.ticket + "**.")
  
  if (Respuesta.estado.ticket == "Cerrado"){
    Embed.addField("✅ Cerrado por:", Respuesta.estado.autor.username + " (**" + Respuesta.estado.autor.id + "**)")
    Embed.addField("❔ Razón:", Respuesta.estado.razon)
  }
  message.channel.send(Embed);
  
  
  
  
  
  {
    
   }
  
  
}