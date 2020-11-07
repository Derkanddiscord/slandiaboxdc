const Discord = require("discord.js");

const db = require("../database/database.js");
var Economia = require("economia-discord")
var Colores = require("../colores.json")

exports.run = async (client, message, args) => {
  
  
  
  let mentions = message.mentions.users.first() || message.author;

  let idserver = message.guild.id;

  

  
  
  let exists = await db.users.exists(mentions.id, idserver);
  if (exists) {
    
    
    let result = await db.users.getAll(mentions.id, idserver);
    printEmbed(result, mentions, message);
    
    
  } else {
    
    
    
    await db.users.registerUsers(mentions.id, idserver);
    let result = await db.users.getAll(mentions.id, idserver);
    
    
    printEmbed(result, mentions, message);
    
    
    
  }
  
  
  
  
};

function printEmbed(result, mentions, msg) {
  let expT = Math.trunc(Math.pow(Number(result.level) / 0.1, 2)).toString();
  let Factor =
    Math.trunc(Math.pow((Number(result.level) + 1) / 0.1, 2)) -
    Math.trunc(Math.pow(Number(result.level) / 0.1, 2));
  let stats = result.xp - expT + "/" + Factor;
  let porcent = (((Number(result.xp) - Number(expT)) / Factor) * 100).toFixed(
    0
  );

  
  var Dinero = Economia.dinero.mostrar(msg.guild.id, mentions.id, mentions.username)

  if(Dinero == "no tiene dinero") Dinero = {"dinero": 0, "banco": 0}

  var Logros = Economia.inventario.mostrar(msg.guild.id, mentions.id, true)  
  if (Logros == "no items") Logros = "Aún no has comprado items!";
  
  var ColoresSt = ""
  if(!Colores[msg.guild.id] || !Colores[msg.guild.id][msg.author.id] || Colores[msg.guild.id][msg.author.id].length == 0) ColoresSt = "Aún no has comprado colores!";
  else ColoresSt = Colores[msg.guild.id][msg.author.id].map(C => "<@&" + C + ">").join("\n");
  
  const embed = new Discord.RichEmbed()
    .setTitle(mentions.tag)
    .addField(
      "Perfil",
      `🌟 **Nivel:** ${result.level} (${stats} XP)\n💠 **Total XP:** ${result.xp}\n\n__**Dinero**__\n💰 **Efectivo:** ${Dinero.dinero}$\n🏦 **Banco:** ${Dinero.banco}$` 
    )
    .addBlankField()
    .addField("📊 Stats", `**Robos:** ${result.robos}`, true)
    .addField("🗃️ Inventario", Logros)
    .addField("===", "🎨 **Colores:**\n" + ColoresSt)
    .addField("Progreso", "```\n"+printProress(porcent)+"\n```")
    .setThumbnail(mentions.displayAvatarURL)
    .setColor("0xEC7063");
  msg.channel.send(embed);
  console.log(porcent)
}

const printProress = porcent => {
  if (porcent < 10) {
    return `⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜ ${porcent}%`;
  } else if (porcent < 20) {
    return `⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜ ${porcent}%`;
  } else if (porcent < 30) {
    return `⬛⬛⬜⬜⬜⬜⬜⬜⬜⬜ ${porcent}%`;
  } else if (porcent < 40) {
    return `⬛⬛⬛⬜⬜⬜⬜⬜⬜⬜ ${porcent}%`;
  } else if (porcent < 50) {
    console.log(porcent + 'Entro if 40')
    return `⬛⬛⬛⬛⬜⬜⬜⬜⬜⬜ ${porcent}%`;
  } else if (porcent < 60) {
    return `⬛⬛⬛⬛⬛⬜⬜⬜⬜⬜ ${porcent}%`;
  } else if (porcent < 70) {
    return `⬛⬛⬛⬛⬛⬛⬜⬜⬜⬜ ${porcent}%`;
  } else if (porcent < 80) {
    return `⬛⬛⬛⬛⬛⬛⬛⬜⬜⬜ ${porcent}%`;
  } else if (porcent < 90) {
    return `⬛⬛⬛⬛⬛⬛⬛⬛⬜⬜ ${porcent}%`;
  } else if (porcent < 95) {
    return `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬜ ${porcent}%`;
  } else if (porcent < 105) {
    return `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛ ${porcent}%`;
  }
};
