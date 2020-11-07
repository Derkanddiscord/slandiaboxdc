const Discord = require('discord.js');

var Economia = require("economia-discord")

exports.run = async (client, message, args) => {
  
  const PREFIX = "-"
  
  if(message.author.id != "249500266628513794" && message.author.id != "330238135629905921") return;
  if(!message.mentions.users.first()) return message.channel.send("Tienes que mencionar a alguien! "+ PREFIX + "RemoveItemInv <Usuario> <Número>")

   var RemoverItem = Economia.inventario.sacar(message.guild.id, message.author.id, args[1]);

  if(RemoverItem == "no items") return message.channel.send("El usuario no tiene items!")
  else if(RemoverItem == "no se introdujo un numero") return message.channel.send("No haz introducido un Número! " + PREFIX + "RemoveItemInv <Usuario> <Número de Item del Inventario>")
  else if(RemoverItem == "no es un numero") return message.channel.send("Eso no es un Número! " + PREFIX + "RemoveItemInv <Usuario> <Número de Item del Inventario>")
  else if (RemoverItem == "no hay ningun item con ese numero") return message.channel.send("No hay ningun item en su inventario con ese Número! "+ PREFIX + "RemoveItemInv <Usuario> <Número de Item del Inventario>")
  message.channel.send("✅ Item removido del inventario correctamente.")
  
}