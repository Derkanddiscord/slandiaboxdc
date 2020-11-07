const Discord = require("discord.js");
var Economia = require("economia-discord")
const db = require("../database/database.js");

var Cooldown = {};

exports.run = async (client, message, args) => {
  if(!Cooldown[message.author.id]){
    const PREFIX = "-";
    const Victima = message.mentions.users.first();
  
    if(!Victima) return message.channel.send("Debe mencionar a un usuario. "+PREFIX+"RobarBanco **<Usuario>**")
    if(Victima.id == message.author.id) return message.channel.send("Debe mencionar a otro usuario.")
    
    
    var DineroLadron = Economia.dinero.mostrar(message.guild.id, message.author.id);
    var DineroVictima = Economia.dinero.mostrar(message.guild.id, Victima.id);

    if(DineroLadron == "no tiene dinero") return message.channel.send("No tienes dinero como para robar. Usa " + PREFIX + "Trabajar")
    if(DineroVictima == "no tiene dinero" || DineroVictima.banco <= 0) return message.channel.send(Victima.username + " no tiene dinero en el banco.")
    if(DineroLadron.dinero <= Math.floor(DineroVictima.banco / 4)) return message.channel.send("Necesitas tenes al menos un cuarto del dinero de la otra persona en efectivo para intentar robar")

    const RobarAleatorio = Math.floor(Math.random() * 100) + 1;
  
    const embed = new Discord.RichEmbed();
    if(RobarAleatorio <= 63){
      var DineroPerdido = Math.round(Math.random() * (DineroLadron.dinero * 0.75));

      if (isNaN(DineroPerdido)) DineroPerdido = 1;
      
      message.channel.send ("Intentaste robar el banco, " + Victima + " pero la policia te vio!\nHas perdido ``"  + DineroPerdido + "$``");

      Economia.dinero.sacar(message.guild.id, message.author.id, message.author.username, DineroPerdido)
      Economia.dinero.agregar(message.guild.id, Victima.id, Victima.username, Math.floor(DineroPerdido * 0.6))
      
      embed.setDescription(`<@${message.author.id}>, tu acción no fue buena. Has perdido 💰**${DineroPerdido}** coins!`)
      embed.setColor("RED")
      message.channel.send(embed)
      
    }else{
      var DineroGanado = Math.round(Math.random() * (DineroVictima.banco * 0.60));

      if (isNaN(DineroPerdido)) DineroPerdido = 1;
      
      await db.users.addRobos(message.author.id)
      embed.setDescription(`<@${message.author.id}> has robado 💰**${DineroGanado}** coins, al usuario <@${Victima.id}>`)
      embed.setColor("GREEN")
    }
    
    Cooldown[message.author.id] = true;
    
    message.channel.send(embed)
    Economia.dinero.agregar(message.guild.id, message.author.id, message.author.username, DineroGanado);
    Economia.dinero.sacar(message.guild.id, Victima.id, Victima.username, DineroGanado, true);
    setTimeout(()=>{
      delete Cooldown[message.athor.id];
    }, 300000)
  }else message.channel.send("Tienes que esperar 300 segundos para volver a utilizar este comando");
  
  
}