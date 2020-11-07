const db = require("../database/database.js");
const Discord = require("discord.js");
var Economia = require("economia-discord")

exports.run = async (client, message, args) => {
 // if(message.author.id !== '330238135629905921') return
   // return message.channel.send("No tienes los permisos necesarios!");
  

  if (message.author.id != "249500266628513794" && message.author.id !="330238135629905921") return message.channel.send("No tienes los permisos necesarios para ejecutar este comando.");
  
  
  
  
  let mentions = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('Debe mencionar a un usuario.').catch(console.error);
  
  var Banco = false;
  if(!args[2]) Banco = false;
  else if(args[2].toLowerCase() == "si") Banco = true;
  
  let UsuarioAAgergarMencion = message.mentions.users.first();
  
  var Mensaje = Economia.dinero.sacar(message.guild.id, UsuarioAAgergarMencion.id, UsuarioAAgergarMencion.username, args[1], Banco);
  
  var Embed = new Discord.RichEmbed()
  Embed.setColor("DARK_RED")
  
  if (Mensaje == "no se introdujo una cantidad")Embed.setDescription("Escribe cuanto dinero quieres sacarle ``-removeCoins <Usuario> <Cantidad> <Banco(Si o No)> ``")
  if (Mensaje == "no es un numero")Embed.setDescription("Escribe un **número**. ``-removeCoins <Usuario> <Cantidad> <Banco(Si o No)>``")
  if (Mensaje == "el valor es inferior a cero") Embed.setDescription("Escribe un número superior a 0!")
  else if(Mensaje == "el valor es muy grande") Embed.setDescription("No le puedes remover tanta cantidad! Si quieres reiniciar el dinero del Usuario, usa -Reiniciar <Usuario>")
  else if(Mensaje == "el usuario no tiene demasiado dinero") Embed.setDescription("Con esa cantidad de dinero removida, el usuario no tendría absolutamente nada de dinero!")
  else {
    Embed.setDescription(`Coins removidos correctamente a **${mentions.username}**` + ". Dinero actual:\n``Efectivo: " + Mensaje.dinero + "$\nBanco: " + Mensaje.banco + "$``");
    Embed.setColor("GREEN");
  }
  message.channel.send(Embed);
  
  /*
  let Totalnew = parseInt(args[1]);
  let idserver = message.guild.id;
  let exists = await db.users.exists(mentions.id, idserver);
  if (exists) {
    await db.users.removeCoins(mentions.id, Totalnew)
    
  } else {
    await db.users.registerUsers(mentions.id, idserver);
    await db.users.removeCoins(mentions.id, Totalnew)
    
  }*/
  
 // message.channel.send(`Coins removidos correctamente a **${mentions.username}**, cantidad **${Totalnew}**!`)
};
