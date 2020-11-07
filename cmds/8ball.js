const Discord = require("discord.js");
exports.run = async (client, message, args) => {

  let pregunta = args.join(" ");
  if (!pregunta) return message.reply(`Escriba una pregunta.`)
  let rpts = ["Sí", "No", "Tal vez", "No sé", "¡Claro!"]

  let usuario = message.member.user
  message.delete();

  let embed = new Discord.RichEmbed() 
  .setAuthor(message.author.username +"#"+ message.author.discriminator, message.author.avatarURL)
  .addField(`Pregunta: ${pregunta}`,`Respuesta: ${rpts[Math.floor(Math.random() * rpts.length)]}`)
  .setFooter(`- Slandia Adivinador -`)
  //.setDescription(usuario +' a su pregunta `'+args+'` mi respuesta es: `'+ rpts[Math.floor(Math.random() * rpts.length)]+'`')
  .setColor(`RANDOM`)
return message.channel.send(embed);
};