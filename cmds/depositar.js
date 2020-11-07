var Discord = require("discord.js");
var Economia = require("economia-discord");

exports.run = async (client, message, args) => { 

  const PREFIX = "-"
  var Mensaje = Economia.dinero.depositar(message.guild.id, message.author.id, message.author.username, args[0]);
  var Embed = new Discord.RichEmbed()
  Embed.setColor("DARK_RED")
  
  if (Mensaje == "no se introdujo una cantidad") Embed.setDescription("Tienes que poner una cantidad para depositar! " + PREFIX + "Depositar <Cantidad (Puedes escribir 'Todo' para depositar todo tu efectivo)>")
  else if(Mensaje == "string no compatible") Embed.setDescription("Tienes que escribir 'todo'  para depositar todo tu efectivo")
  else if(Mensaje == "no es un numero ni string")Embed.setDescription("Tienes que poner una cantidad para depositar! " + PREFIX + "Depositar <Cantidad (Puedes escribir 'Todo' para depositar todo tu efectivo)>")
  else if(Mensaje == "el valor es inferior a cero") Embed.setDescription("La cantidad es negativa. Quieres retirar dinero? Utiliza el comando " + PREFIX + "Retirar")
  else if(Mensaje == "el valor es muy grande") Embed.setDescription("La cantidad introducida es infinita.")
  else if(Mensaje == "no tiene dinero") Embed.setDescription("No tienes efectivo como para depositar. Utiliza" + PREFIX + "Trabajar")
  else if(Mensaje == "no tiene tanto dinero") Embed.setDescription("No tienes tanto efectivo")
  else{
    Embed.setDescription("✅ Dinero depositado correctamente.")
    Embed.setColor("GREEN")
  }
  
  message.channel.send(Embed)
  
}