/*const Discord = require('discord.js');


module.exports = {

nombre: "encuesta",
alias:[],
  descripcion: "Para realizar encuestas",
run: (client, message, args) => {

  message.delete()//hacemos que el mensaje se borre al momento de escribirlo
  
  
if(!args) return message.channel.send('Agrege una pregunta para la encuesta.')//Respuesta que dara si no escriben nada

const embed = new Discord.RichEmbed()
      .setAuthor('Pregunta:')
      .setDescription('**'+args.join(' ')+'**\nâââââââââââ')
      .addField('Opcion 1', '1\u20e3 Si') //puedes cambiarle los emojis 
      .addField('Opcion 2', '2\u20e3 No')//aqui igual se le puede cambiar los emojis y/o agregarle mas
        .setColor(0x82a442)
      .setTimestamp()

message.channel.send(embed)
.then(m => {  //agregamos los emojis con el que reaccionaran.
        m.react("1\u20e3");// si son emojis de tu servidor solo agregar el ID
        m.react("2\u20e3");

});


  }
  }/*