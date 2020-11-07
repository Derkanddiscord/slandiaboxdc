const Discord = require('discord.js');
var Economia = require("economia-discord")


exports.run = async (bot, message, args) => { 

  var PREFIX = "-"
  var Mensaje =  Economia.tienda.comprar(message.guild.id, message.author.id, args[0]);
  
  var Embed = new Discord.RichEmbed()
  Embed.setColor("DARK_RED")
  if (Mensaje == "no hay tienda") Embed.setDescription('Todavía no hay ningun Item en la tienda! Para agregar uno, usar ' + PREFIX + "AgregarItem")
  else if (Mensaje == "no tiene dinero") Embed.setDescription('No tienes dinero para comprar algo. Utiliza '+ PREFIX+'trabajar')
  else if (Mensaje == "no se introdujo un numero")Embed.setDescription('Escribe un número '+ PREFIX+'Comprar <Número del Item>. Para ver la Tienda: '+ PREFIX +'Shop')
  else if (Mensaje == "no es un numero") Embed.setDescription('Escribe un número' + PREFIX +'Comprar <Número del Item>. Para ver la Tienda: ' + PREFIX +'Shop')
  else if (Mensaje == "item ya comprado") Embed.setDescription("Ya tienes ese item")
  else if (Mensaje == "no suficiente dinero") Embed.setDescription('No tienes suficiente Dinero!')
  else if (Mensaje == "no hay ningun item con ese numero") Embed.setDescription("No hay ningun item con ese número! Para ver la tienda: " + PREFIX + "Shop")
  
  else{
    Embed.setDescription("✅ Su compra se ha realizado correctamente!");
    Embed.setColor("GREEN")
  }

  message.channel.send(Embed)
}