const Discord = require("discord.js");

const Tickets = require("../tickets/tickets.js")

exports.run = async (client, message, args) => {

    
  
  if(!message.member.roles.has(Tickets.rolStaff)) return message.channel.send("Solo miembros del staff pueden usar este comando.");
  
  var Mensaje = args.join(" ");
  
  var Args2 = Mensaje.split("|").map(s => s.trim());

  if (!Args2[0]) return message.channel.send("Necesitas especificar una razón. -CerrarTicket <Razón> **|** (Nro de ticket)")

  if (!Args2[1]){
    var Res = Tickets.cerrarTicket(Args2[0], "no", message);
  }else{
    if (isNaN(Args2[1])) return message.channel.send("El número de Ticket especificado no es un número.\nIntroduzca el número de ticket correcto o utilice el comando dentro de un canal de un Ticket.\n-CerrarTicket <Razón> **|** (Nro de ticket)")
    var Res = Tickets.cerrarTicket(Args2[0], Args2[1], message);
  }
  if (typeof Res == "string") return message.channel.send(Res);
  
  
  
}