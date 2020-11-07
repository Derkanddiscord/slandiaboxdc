const Discord = require("discord.js");
const db = require("../database/database.js");
var Economia = require("economia-discord")

exports.run = async (client, message, args) => {
  
  let idserver = message.guild.id;
  let mentions = message.mentions.users.first();
  
  if (message.mentions.users.size < 1) return message.reply('Debe mencionar a un usuario.').catch(console.error);
  if(mentions.id === message.author.id) return message.reply("Debe mencionar a otro usuario.").catch(console.error);
  // Cooldown
  let existsCooldown = await db.users.existsCooldown(message.author.id, 'robar');
  if(existsCooldown) {
    let resultCool = await db.users.getCooldown(message.author.id, 'robar')
    let tiempo = parseInt(resultCool.tiempo);
    
    if (tiempo < Date.now()) {
      await db.users.removeCooldown(message.author.id, 'robar');
    } else {
      return message.channel.send('Tienes un cooldown de '+ process.env.TIEMPO_COOLDOWN + ' segundos.');
    }
   
  } 
  await db.users.addCooldown(message.author.id, 'robar', process.env.TIEMPO_COOLDOWN);

  
  let exists = await db.users.exists(mentions.id, idserver);
  if (exists) {
    var DineroLadron = Economia.dinero.mostrar(message.guild.id, message.author.id);
    var DineroVictima = Economia.dinero.mostrar(message.guild.id, mentions.id);


    if (DineroVictima == "no tiene dinero") return message.channel.send ("El usuario no tiene dinero!");
    if (DineroVictima.dinero == 0) return message.channel.send("No tiene efectivo actualmente, a lo mejor tiene dinero en el banco.");
    if (DineroLadron == "no tiene dinero") return message.channel.send('No tienes nada de dinero como para robar. Utiliza -trabajar');
    if (DineroLadron.dinero <= 0) return message.channel.send('No tienes nada de dinero como para robar. Utiliza -trabajar');
    
    
    let numberRoll = aleatorioEntreE(1, 100)
    let numberWin = aleatorioEntreE(process.env.ROBO_MIN, process.env.ROBO_MAX)
    
   // let result = await db.users.getAll(mentions.id, idserver);
    
    if(DineroVictima.dinero < process.env.ROBO_MIN) return message.channel.send('El usuario mencionado, no tiene suficientes coins para poder robarle.')
    
    const embed = new Discord.RichEmbed();
    let TotalWin = parseInt(numberWin)
    if(numberRoll > 50) {
      //add
      
     // await db.users.addCoins(message.author.id, TotalWin)
      // await db.users.removeCoins(mentions.id, TotalWin)
      
      Economia.dinero.agregar(message.guild.id, message.author.id, message.author.username, TotalWin);
      Economia.dinero.sacar(message.guild.id, mentions.id, mentions.username, TotalWin);

      
      await db.users.addRobos(message.author.id)
      embed.setDescription(`<@${message.author.id}> has robado 💰**${TotalWin}** coins, al usuario <@${mentions.id}>`)
      embed.setColor("GREEN")
      message.channel.send(embed)
      
    } else {
      //removo
      //await db.users.removeCoins(message.author.id, TotalWin)
      Economia.dinero.sacar(message.guild.id, message.author.id, message.author.username, TotalWin)
      Economia.dinero.agregar(message.guild.id, mentions.id, mentions.username, Math.floor(TotalWin * 0.5))
      
      embed.setDescription(`<@${message.author.id}>, tu acción no fue buena. Has perdido 💰**${TotalWin}** coins!`)
      embed.setColor("RED")
      message.channel.send(embed)
    }
    
    //printEmbed(result, msg, message);
  } else {
    return message.channel.send('El usuario mencionado no tiene un perfil registrado.');
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


