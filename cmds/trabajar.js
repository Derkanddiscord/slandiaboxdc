const Discord = require("discord.js");
const db = require("../database/database.js");
var Economia = require("economia-discord")
exports.run = async (client, message, args) => {
  let idserver = message.guild.id;
  
  // Cooldown
  let existsCooldown = await db.users.existsCooldown(message.author.id, 'trabajar');
  if(existsCooldown) {
    let resultCool = await db.users.getCooldown(message.author.id, 'trabajar')
    let tiempo = parseInt(resultCool.tiempo);
    
    if (tiempo < Date.now()) {
      await db.users.removeCooldown(message.author.id, 'trabajar');
    } else {
      return message.channel.send('Tienes un cooldown de '+ process.env.TIEMPO_COOLDOWN + ' segundos.');
    }
   
  } 
  await db.users.addCooldown(message.author.id, 'trabajar', process.env.TIEMPO_COOLDOWN);
  
  let exists = await db.users.exists(message.author.id, idserver);
  if (exists) {
 
    let numberRoll = aleatorioEntreE(process.env.TRABAJAR_MIN, process.env.TRABAJAR_MAX)
    
    //let result = await db.users.getAll(message.author.id, idserver);
 
    const embed = new Discord.RichEmbed();
    
    //await db.users.addCoins(message.author.id, parseInt(numberRoll))
    
    var Mensaje = Economia.dinero.agregar(message.guild.id, message.author.id, message.author.username, numberRoll, false)

    embed.setDescription(`<@${message.author.id}>, has obtenido 💰 **${numberRoll}** coins por trabajar.!`)
    embed.setColor("GREEN")
    message.channel.send(embed)
      
    
    
  } else {
    return message.channel.send('Debe registrar su cuenta, usando `'+ process.env.botPrefix +'perfil`')
  }
};



function aleatorioEntreE(a,b){
  let n;
  n = Math.floor((Math.random() * (b - a)) + a);
  return n;
}
