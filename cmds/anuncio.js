const Discord = require('discord.js');
exports.run = async (client, message, args, text) => {
    let perms = message.member.hasPermission("MANAGE_GUILD"); //Sino tiene permisos el autor
    if(!perms) return message.channel.send('X | No tienes permisos para publicar el anuncio');
    
    let anuncio = args.slice(0).join(" ") //Si faltan los argumentos (anuncio)
    if(!anuncio) return message.channel.send('X | Falta el anuncio')
    
    let autor = message.author;
  
  const embed = new Discord.RichEmbed() //Creamos un embed
    .setTitle('**Anuncio MineChest**')
    .setDescription(anuncio) //El anuncio
    .addField('Anunciado por:', autor.username)
    .setColor("BLUE")
  client.channels.get('732188349246210140').send(embed); //Enviamos el embed (anuncio) a un canal por ID
  //client.channels.get('726303555203629116').send('@everyone') //Para que mencione a los miembros con un everyone
  //message.channel.send('| Anuncio Enviado') //Mensaje que envia al canal donde se ejecuto el comando
}