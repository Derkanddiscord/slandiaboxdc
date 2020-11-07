const Discord = require("discord.js");
const Tickets = require("../tickets/tickets.js")

exports.run = async (client, message, args) => { 
  
  return message.channel.send("➤ ┆ Este comando esta en mantenimiento. Lamentamos las molestias.")
  
const megadb = require("megadb");
let tempban = new megadb.crearDB("tempban");
const ms = require("ms");

var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1;
var yyyy = hoy.getFullYear();
  hoy = dd+'/'+mm+'/'+yyyy;
  
if(!message.member.hasPermission("BAN_MEMBERS") && Tickets.idsExcepcion.indexOf(message.author.id) != -1) return message.channel.send("➤ ┆ No tienes los permisos suficientes.");  
let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!user) return message.channel.send("➤ ┆ Menciona a un usuario");
  if(user.hasPermission("MANAGE_MESSAGES")) return message.reply("➤ ┆ No puedo mutear a este usuario,tiene permisos");

          if(tempban.tiene(user.id)){
          tempban.sumar(`${user.id}`,1)
        }else{
          tempban.establecer(`${user.id}`,1)
        }
  
  let splitmsg = args.join(" ").split("|");
let motivo = splitmsg[1];
let tempBanTimes = splitmsg[2];
  if(!motivo) return message.channel.send("➤ ┆ Introduzca el motivo")
  let tempBanTime = tempBanTimes
  if (ms(tempBanTime)) {
      await message.guild.member(user).ban(motivo);
        let canal = message.guild.channels.get("704457853934633010")

        const embed = new Discord.RichEmbed() 
        .setColor("RED")
        .setThumbnail(user.user.displayAvatarURL)
        .setDescription("Se te ha baneado temporalmente del servidor.")
        .addField("➨ ┃ Usuario", `**➽ TAG** ➤ ┆ ${user.user.tag}\n**➽ ID** ➤ ┆ ${user.user.id}`)
        .addField("➨ ┃ Staff", `**➽ TAG** ➤ ┆ ${message.author.tag}\n**➽ ID** ➤ ┆ ${message.author.id}\n**➽ Mención** ➤ ┆ ${message.author}`)
        .addField("➨ ┃ Razón del baneo", `➤ ┆ ${motivo}`)
        .addField("➨ ┃ Tiempo",`➤ ┆ ${tempBanTime}`)
        .addField("➨ ┃ Apelar", `➽ Debes de apelar con el miembro del Staff que te baneo.`)
        .addField("➨ ┃ Discord", "➽ https://discord.gg/VkptDZS ")

        .setFooter(hoy)
canal.send(embed)
    user.send(embed)
      message.channel.send(`${user} esta baneado durante ${tempBanTime} minutos`);
      setTimeout(function () {            
          message.guild.unban(user.id);
        
        const embed = new Discord.RichEmbed() 
        .setColor("RED")
        .setThumbnail(user.user.displayAvatarURL)
        .setDescription("Se te ha baneado temporalmente del servidor.")
        .addField("➨ ┃ Usuario", `**➽ TAG** ➤ ┆ ${user.user.tag}\n**➽ ID** ➤ ┆ ${user.user.id}`)
        .addField("➨ ┃ Staff", `**➽ TAG** ➤ ┆ ${message.author.tag}\n**➽ ID** ➤ ┆ ${message.author.id}\n**➽ Mención** ➤ ┆ ${message.author}`)
        .addField("➨ ┃ Desbaneado automáticamente", `➽  Ya te puedes volver a unir.`) 
        .addField("➨ ┃ Discord", "➽ https://discord.gg/VkptDZS ")
        .setFooter(hoy)
                    user.send(embed)
          message.channel.send(embed);
      }, ms(tempBanTime));
  } else {
        return message.channel.send("➤ ┆ Introduzca el tiempo de baneo.");
};
}