/*const Discord = require("discord.js");
const db = require("../database/database.js");
exports.run = async (client, message, args) => {
  let idserver = message.guild.id;

  let exists = await db.users.exists(message.author.id, idserver);
  if (exists) {
    if(!args[0]) return message.channel.send('Ingrese la cantidad a apostar, ejemplo `'+ process.env.botPrefix  + 'perfil`')
    
    if (isNaN(args[0])) return message.channel.send('El dato ingresado no es un numero.')
    let numberRoll = aleatorioEntreE(1, process.env.NUMERO_APOSTAR)
    
    let result = await db.users.getAll(message.author.id, idserver);
    if(result.coins < args[0]) return message.channel.send('No tienes suficientes coins para apostar en este juego.')
    const embed = new Discord.RichEmbed();
    if(numberRoll > 59) {
      //add
      let TotalWin = parseInt(args[0]) * 2
      await db.users.addCoins(message.author.id, TotalWin)
      embed.setDescription(`<@${message.author.id}>, Sacaste **${numberRoll}**. has ganado 💰**${TotalWin}** coins!`)
      embed.setColor("GREEN")
      message.channel.send(embed)
      
    } else {
      //remove
      await db.users.removeCoins(message.author.id, parseInt(args[0]))
      embed.setDescription(`<@${message.author.id}>, Sacaste **${numberRoll}**. has perdio 💰**${parseInt(args[0])}** coins!`)
      embed.setColor("RED")
      message.channel.send(embed)
    }
    
    //printEmbed(result, msg, message);
  } else {
    return message.channel.send('Debe registrar su cuenta, usando `'+ process.env.botPrefix +'perfil`')
  }
};

function printEmbed(result, msg) {
 
  const embed = new Discord.RichEmbed()
    .setDescription(``)
    .setColor("GREEN");
  msg.channel.send(embed);
  
}

function aleatorioEntreE(a,b){
  let n;
  n = Math.floor((Math.random() * (b - a)) + a);
  return n;
}
*/