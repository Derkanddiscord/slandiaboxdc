var Economia = require("economia-discord")
const Discord = require('discord.js');
var Economia = require("economia-discord")

exports.run = (client, message, args) => {

  if(message.author.id != "330238135629905921" && message.author.id != "249500266628513794") return;
  if(!message.mentions.users.first()) return message.channel.send("Tienes que mencionar.  -AgregarItemInv <Usuario> <Número de Item de la Tienda>")

  var Numero = args[1];
  
  var Mencionado = message.mentions.users.first()
  
  var AgregarItem = Economia.inventario.agregar(message.guild.id, Mencionado.id, Numero);
  
  if(AgregarItem == "no hay tienda") return message.channel.send("> No hay una tienda aun en el servidor!")
  else if(AgregarItem == "no se introdujo un numero") return message.channel.send("> No haz introducido un número! -AgregarItemInv <Usuario> <Número de Item de la Tienda>")
  else if(AgregarItem == "no es un numero") return message.channel.send("> Ingrese un numero! -AgregarItemInv <Usuario> <Número de Item de la Tienda>")
  else if(AgregarItem == "el numero es inferior a cero") return message.channel.send("> El número tiene que ser positivo!")
  else if(AgregarItem == "el numero es muy grande") return message.channel.send("> El número es infinito")
  else if (AgregarItem == "no hay ningun item con ese numero") return message.channel.send("> No hay ningun item en la tienda con ese número! -AgregarItemInv <Usuario> <Número de Item de la Tienda>");
  else if(AgregarItem == "ya tiene el item") return message.channel.send("> El usuario ya tiene ese item")
  else return message.channel.send("> ✅ Item agregado correctamente");
  

}