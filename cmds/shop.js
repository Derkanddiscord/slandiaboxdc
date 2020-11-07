var Economia = require("economia-discord")
var Discord = require("discord.js")
exports.run = async (client, message, args) => {
  
   var TiendaArray = Economia.tienda.mostrar(message.guild.id, false);

   if (TiendaArray == "no hay tienda") return message.channel.send("❗ No hay una tienda aún.");
  
  var TiendaMensaje = [];
  var Contador = 1;
  TiendaArray.forEach(Item => {
    TiendaMensaje.push("``" + Contador + ".`` " + Item.emoji + " __**" + Item.nombre + "**__\n" +Item.descripcion + "\nConsiguelo por tan solo: ``" + Item.valor + "$``")
    Contador ++;
  })
  
  
   const EmbedTienda = new Discord.RichEmbed()
     .setColor ('RANDOM')
     .setAuthor ("Compra lo que quieras!", message.author.avatarURL)
     .setDescription(TiendaMensaje.join("\n\n"))
     .addBlankField()
     .addField("=== Info ===", "Para comprar un item utiliza **-comprar <Numero de Item>**")
     .setFooter('Estos Items aparecerán en el comando -Perfil')
  
  message.channel.send(EmbedTienda);
}