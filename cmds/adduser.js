const Discord = require("discord.js");

const Tickets = require("../tickets/tickets.js")

exports.run = async (client, message, args) => {
  
  
  if(!message.member.roles.has(Tickets.rolStaff) && Tickets.idsExcepcion.indexOf(message.author.id) != -1) return message.channel.send("Solo miembros del staff pueden usar este comando.");
  
  let mentions = message.mentions.users.first();
  const Mensaje = args.join(" ");
  
  var Args2 = Mensaje.split("|").map(s => s.trim());
  
  if (message.mentions.users.size < 1) {
    
    if (!message.guild.members.has(args[0])) return message.reply('Debe mencionar a un usuario o escribir la ID del usuario.\n-addUser <Usuario> | (Número de Ticket)').catch(console.error);
    if (args[0] == message.author.id) return message.reply("No puedes agregarte a ti mismo.")
    if(!Args2[1]){
      var Res = Tickets.addUser(args[0], "no", message);
    }else{
      if (isNaN(Args2[1])) return message.channel.send("El número de Ticket especificado no es un número.\nIntroduzca el número de ticket correcto o utilice el comando dentro de un canal de un Ticket.\n-addUser <Usuario> | (Número de Ticket)")
      var Res = Tickets.addUser(args[0], Args2[1], message);
    }
    if (typeof Res == "string") return message.channel.send(Res);
    
    
  }else{
    if (mentions.id == message.author.id) return message.reply("No puedes agregarte a ti mismo.")
    if(!Args2[1]){
      var Res = Tickets.addUser(mentions.id, "no", message);
    }else{
      if (isNaN(Args2[1])) return message.channel.send("El número de Ticket especificado no es un número.\nIntroduzca el número de ticket correcto o utilice el comando dentro de un canal de un Ticket.\n-addUser <Usuario> **|** (Número de Ticket)")
      var Res = Tickets.addUser(mentions.id, Args2[1], message);
    }
    if (typeof Res == "string") return message.channel.send(Res);
  }
}