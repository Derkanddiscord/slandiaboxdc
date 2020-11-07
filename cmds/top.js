const Discord = require("discord.js");
const db = require("../database/database.js");
var Economia = require("economia-discord")

exports.run = async (client, message, args) => {
  //let listAll = await db.users.listAll("coins", process.env.TOP_CANTIDAD);
  var Top = Economia.dinero.leaderboard(message.guild.id);
  if(Top == "no hay usuarios con dinero aun") return message.channel.send("No hay usuarios con dinero aún");
  
  if (!args[0]) {
    if (!Top[2]) Top[2] = { dinero: 0, banco: 0 ,nombre: "No hay nadie aún!" };

    if (!Top[1]) Top[1] = { dinero: 0, banco: 0 ,nombre: "No hay nadie aún!" };
    
    const EmbedTop = new Discord.RichEmbed()
      .setAuthor(
        "Pedido por " + message.author.username,
        message.author.avatarURL
      )
      .setTitle("Top 3 Dinero")
      .addField("**Top 1:**", "**__" + Top[0].nombre + "__**\nDinero: ``" + (Top[0].dinero + Top[0].banco) + "$``")
      .addField("**Top 2:**", "**__" + Top[1].nombre + "__**\nDinero: ``" + (Top[1].dinero + Top[1].banco) + "$``")
      .addField("**Top 3:**", "**__" + Top[2].nombre + "__**\nDinero: ``" + (Top[2].dinero + Top[2].banco) + "$``")
      .setColor("RANDOM")
      .setFooter(
        "Si queres ver más personas pon -Top <Número>",
        message.author.avatarURL
      );
    message.channel.send(EmbedTop);
    
  }else {
    
    if (isNaN(args[0])) return message.channel.send("Escribe un **número** -Top <Número de personas>")
    
    var Numero = Math.floor(Number(args[0]))

    if (Numero <= 0 || Numero > 15)return message.channel.send("Ingrese un número entre 1 y 15. -Top <Número Entre 1 y 15>")
    
    var EmbedTop = new Discord.RichEmbed()
      .setAuthor(
        "Pedido por " + message.author.username,
        message.author.avatarURL
      )
      .setTitle("Top " + Numero + " dinero")
      .setColor("RANDOM")
      .setFooter("En caso de no haber suficientes personas, no mostrará más.");
    
    
    
    var NumeroTop = 1;
    var Terminado = false;
    var i = 0;
    
    while (!Terminado) {
      
      if (!Top[i]) {
        Top[i] = { dinero: 0, banco: 0, nombre: "Nadie" };
        Terminado = true;
      }

      EmbedTop.addField(
        "**Top " + NumeroTop + ":**",
        "**__" + Top[i].nombre + "__\nDinero:** ``" + (Top[i].dinero + Top[i].banco) + "$``"
      );

      NumeroTop++;
      i++;
      
      if(i >= Numero) Terminado = true;
      
    }
        message.channel.send(EmbedTop);

  }
  
   //printEmbed(listAll, message);
};

function printEmbed(result, msg) {
  let data = result.map(user => {
    let verific = msg.guild.members.get(user.iduser);

    if (verific) {
      return `👤 ${
        msg.guild.members.get(user.iduser).user.username
      } - 💰 **${user.coins} Coins.**`;
    }
  });
  console.log(data);
  const embed = new Discord.RichEmbed();
  embed.setTitle("Top de usuarios");
  embed.setThumbnail(msg.guild.iconURL);
  embed.setDescription(data.join("\n"));

  embed.setFooter(msg.guild.name);
  embed.setColor("0x36393f");
  msg.channel.send(embed);
}
