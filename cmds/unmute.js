const Discord = require("discord.js");
const Tickets = require("../tickets/tickets.js")

exports.run = async (client, message, args) => {


      if (!message.member.hasPermission("MENTION_EVERYONE") && Tickets.idsExcepcion.indexOf(message.author.id) != -1) return;
      let miembro = message.mentions.members.first();

      let role = message.guild.roles.find(x => x.name === 'Muted')
      if (!miembro) return message.reply('➤ ┆ Menciona a un Usuario.');

     const megadb = require("megadb");
let unmute = new megadb.crearDB("unmute");

  
  if(unmute.tiene(message.author.id)){
    unmute.sumar(`${message.author.id}`,1)
    }else{
    unmute.establecer(`${message.author.id}`,1)
  }
  
  
      miembro.removeRole(role).catch(console.error);
      miembro.addRole("732188321903542342").catch(console.error);
  
        const muteEmbed = new Discord.RichEmbed()
          .setColor("RED")
          .setThumbnail(miembro.displayAvatarURL)
          .setDescription("Se ha desmuteado a un usuario del servidor.")
          .addField("➨ ┃ Usuario", `**➽ TAG** ➨ ┃ ${miembro.tag}\n**➽ ID** ➨ ┃ ${miembro.id}`)
          .addField("➨ ┃ Staff", `**➽ TAG** ➨ ┃ ${message.author.tag}\n**➽ ID** ➨ ┃ ${message.author.id}\n**➽ Mención** ➨ ┃ ${message.author}`)

          .setTimestamp()
          //message.guild.channels.get("693798085809405973").send(muteEmbed)
          client.channels.get(process.env.CANAL_LOG).send(muteEmbed)
      message.channel.send(miembro + ` Desmuteado`);
      const banEmbed2 = new Discord.RichEmbed()
        .setColor("RED")
        .setThumbnail(miembro.displayAvatarURL)
        .setDescription("Te han desmuteado en el servidor.")
        .addField("➨ ┃ Usuario", `**➽ TAG** ➨ ┃ ${miembro.tag}\n**➽ ID** ➨ ┃ ${miembro.id}`)
        .addField("➨ ┃ Staff", `**➽ TAG** ➨ ┃ ${message.author.tag}\n**➽ ID** ➨ ┃ ${message.author.id}\n**➽ Mención** ➨ ┃ ${message.author}`)
        .setTimestamp()
      miembro.send(banEmbed2)
      
   
}

