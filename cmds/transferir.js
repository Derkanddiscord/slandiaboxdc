const Discord = require("discord.js");
const db = require("../database/database.js");
exports.run = async (client, message, args) => {
  let idserver = message.guild.id;
  let mentions = message.mentions.users.first();

  if (message.mentions.users.size < 1)
    return message.reply("Debe mencionar a un usuario.").catch(console.error);
  if(mentions.id === message.author.id) return message.reply("Debe mencionar a otro usuario.").catch(console.error);
  let cantidad = parseInt(args[1]);

  let exists = await db.users.exists(mentions.id, idserver);
  if (exists) {

    let result = await db.users.getAll(message.author.id, idserver);
    if (result.coins < cantidad)
      return message.channel.send(
        "No tiene suficientes coins para hacer la transferencia."
      );
    const embed = new Discord.RichEmbed();
    await db.users.addCoins(mentions.id, cantidad);
    await db.users.removeCoins(message.author.id, cantidad);

    embed.setDescription(
      `<@${message.author.id}> has transferido 💰**${cantidad}** coins, al usuario <@${mentions.id}>`
    );
    embed.setColor("GREEN");
    message.channel.send(embed);
  } else {
    return message.channel.send(
      "El usuario mencionado no tiene un perfil registrado."
    );
  }
};

function aleatorioEntreE(a, b) {
  let n;
  n = Math.floor(Math.random() * (b - a) + a);
  return n;
}
