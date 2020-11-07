const Discord = require('discord.js');

var Economia = require("economia-discord")

exports.run = async (client, message, args) => {
  if(message.author.id != "249500266628513794" && message.author.id != "330238135629905921" && message.author.id != "471068281080512523") return;
  
  const PREFIX = "-";
  var Mensaje = Economia.tienda.sacar(message.guild.id, args[0]);
  if (Mensaje == "no hay tienda") return message.channel.send('Aún no hay ningun Item en la tienda! Para agregar uno, usar ' + PREFIX + "AgregarItem")
  else if (Mensaje == "no se introdujo un numero") return message.channel.send('Escribe un número! '+PREFIX+'RemoveItem <Número del Item>. Para ver los Items utiliza '+PREFIX+'Shop')
  else if (Mensaje == "no es un numero") return message.channel.send('Escribe un número! -RemoveItem <Número del Item>. Para ver los Items utiliza '+PREFIX+'Shop');
  else if (Mensaje == "no hay ningun item con ese numero") return message.channel.send("No hay ningun item con ese número! Para ver los Items utiliza "+PREFIX+"Shop")
  
  message.channel.send('El objeto se removió de la Tienda.');


}