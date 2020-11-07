const Discord = require('discord.js');
var Economia = require("economia-discord")

exports.run = (client, message, args) => {
  
  if(message.author.id != "330238135629905921" && message.author.id != "249500266628513794"&& message.author.id != "471068281080512523") return;
  
  var Items = args.join(" ").split("/").map(I => I.trim());
  
  var MensajeDelPackage = Economia.tienda.agregar(message.guild.id, Items[0], Items[1], Items[2], Items[3]);
  
  const MensajeDeError = "Uno de los parametros no fue introducido. Uso del comando -AgregarItem <Nombre> / <Descripcion> / <Valor> / <Emoji>";
  var Embed = new Discord.RichEmbed()
  Embed.setColor("DARK_RED")
   if(MensajeDelPackage == "el nombre del item no fue introducido" 

     || MensajeDelPackage == "la descripcion del item no fue introducida"
     || MensajeDelPackage == "el valor del item no fue introducido" 
     || MensajeDelPackage == "el emoji no fue introducido"
     ||MensajeDelPackage == "el valor no es un numero") Embed.setDescription(MensajeDeError)
  else if (MensajeDelPackage ==  "el valor es muy grande") Embed.setDescription("El costo es muy grande")
  else if(MensajeDelPackage == "ya hay un item con ese nombre") Embed.setDescription('Ya hay un Item con ese Nombre!')
  
  else{
    Embed.setDescription('El item fue agregado a la tienda!')
    Embed.setColor("GREEN")
  }
  message.channel.send(Embed);

}