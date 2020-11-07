const Discord = require("discord.js");

const Tickets = require("../tickets/tickets.js")

exports.run = async (client, message, args) => {
  
     // return message.channel.send("➤ ┆ Este comando esta en mantenimiento. Lamentamos las molestias.")

  if(!message.member.roles.has(Tickets.rolStaff) && Tickets.idsExcepcion.indexOf(message.author.id) != -1) return message.channel.send("Solo miembros del staff pueden usar este comando.");
  
  let mentions = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('Debe mencionar a un usuario.\n-tickets <Usuario>').catch(console.error);
  
  
  var Mensaje = Tickets.ticketsDe(mentions.id, message);
  message.channel.send(Mensaje);
  
  
  
  
  
}