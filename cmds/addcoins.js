const db = require("../database/database.js");
const Discord = require("discord.js");
var Economia = require("economia-discord")

exports.run = async (client, message, args) => {

  

  if (message.author.id != "330238135629905921") return message.channel.send("No tienes los permisos necesarios para ejecutar este comando.");
   
  
  
  //return message.channel.send("No tienes los permisos necesarios!"); //633508205573570562
  let mentions = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('Debe mencionar a un usuario.').catch(console.error);
  let Totalnew = args[1];
  
  let idserver = message.guild.id;
  
 /* let exists = await db.users.exists(mentions.id, idserver);
  if (exists) {
    await db.users.addCoins(mentions.id, Totalnew)
    
  } else {
    await db.users.registerUsers(mentions.id, idserver);
    await db.users.addCoins(mentions.id, Totalnew)
    
  }*/
 
  let UsuarioAAgergarMencion = message.mentions.users.first();
  var Mensaje = Economia.dinero.agregar(message.guild.id, UsuarioAAgergarMencion.id, UsuarioAAgergarMencion.username, args[1], false)
  
  
  var Embed = new Discord.RichEmbed()
  Embed.setColor("DARK_RED")
  
  if (Mensaje == "no se introdujo una cantidad") Embed.setDescription("Escribe cuanto dinero quieres agregarle ``-Agregar <Usuario> <Cantidad>``")
  else if (Mensaje == "no es un numero") Embed.setDescription("Escribe un **número**. ``-Agregar <Usuario> <Cantidad>``")
  else if (Mensaje == "el valor es inferior a cero") Embed.setDescription("Escribe un número superior a 0!")
  else if (Mensaje == "el valor es muy grande") Embed.setDescription("Esa cantidad es muuuuy grande!")
  else if(Mensaje == "el usuario tiene demasiado dinero") Embed.setDescription("Con esa cantidad el usuario tendría una infinidad de dinero!")
  else {
    Embed.setDescription(`Coins agregado correctamente a **${mentions.username}**, cantidad: **${Totalnew}**!`)
    Embed.setColor("GREEN")
  }
  
  message.channel.send(Embed);
  
  
};
