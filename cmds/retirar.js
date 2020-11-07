var Discord = require("discord.js");
var Economia = require("economia-discord")

exports.run = async (client, message, args) => { 

  const PREFIX = "-"
  var Mensaje = Economia.dinero.retirar(message.guild.id, message.author.id, message.author.username, args[0]);
  
  if (Mensaje == "no se introdujo una cantidad") return message.channel.send("Tienes que poner una cantidad para retirar! " + PREFIX + "retirar <Cantidad (Puedes escribir 'Todo' para retirar todo tu dinero del banco)>")
  else if(Mensaje == "string no compatible") return message.channel.send("Tienes que escribir 'todo' o 'all' para retirar todo tu dinero")
  else if(Mensaje == "no es un numero ni string")return message.channel.send("Introducir una cantidad para retirar " + PREFIX + "retirar <Cantidad (Puedes escribir 'Todo' para retirar todo tu dinero del banco)>")
  else if(Mensaje == "el valor es inferior a cero") return message.channel.send("La cantidad es negativa. Quieres depositar dinero? Utiliza el comando " + PREFIX + "depositar")
  else if(Mensaje == "el valor es muy grande") return message.channel.send("La cantidad introducida es infinita")
  else if(Mensaje == "no tiene dinero") return message.channel.send("No tienes dinero como para retirar! Utiliza" + PREFIX + "Trabajar")
  else if(Mensaje == "no tiene tanto dinero") return message.channel.send("No tienes tanto dinero!")
  else message.channel.send("✅ Dinero retirado correctamente.")
  
  
}