/*const Discord = require("discord.js");
const Tickets = require("../tickets/tickets.js")

exports.run = async (client, message, args) => {
  
  const RelosPermitidos = ["692000679677394944"]

  if (!message.member.roles.some((Rol) => RelosPermitidos.indexOf(Rol.id) != -1) && Tickets.idsExcepcion.indexOf(message.author.id) != -1) return message.channel.send("No tienes los permisos necesarios para ejecutar este comando.");
   
    
  if (message.mentions.users.size < 1) return message.chnnel.send("Necesitas mencionar a un usuario! -removeRole <Usuario> <YT o TWITCH>")
    
  let mentions = message.mentions.members.first();

    
  if (!args[1]) return message.channel.send("Necesitas especificar el rol! -removeRole <Usuario> <YT o TWITCH>")
  
  
  const rango = args[1].toLowerCase();
  
  if (rango != "yt" && rango != "twitch") return message.channel.send("Necesitas especificar el rol indicado! -removeRole <Usuario> <YT o TWITCH>")
  
  if(rango == "yt"){
    if (mentions.roles.has("665687887076917302")){
      mentions.removeRole("665687887076917302").then(() => {
          message.channel.send("✅ El rol <&665687887076917302> ha sido removido del usuario "+ mentions.user.username + " correctamente");
      }).catch(console.error);
    }else{
      message.channel.send("El usuario " + mentions.user.username + " no tiene el rol.")
    }
  }else if(rango == "twitch"){
    if(mentions.roles.has("665687886053507076")){
      mentions.removeRole("665687886053507076").then(() => {
          message.channel.send("✅ El rol <&665687886053507076> ha sido removido del usuario "+ mentions.user.username + " correctamente");
      }).catch(console.error);
    }else{
      message.channel.send("El usuario " + mentions.user.username + " no tiene el rol .")
    }
  }else{
    message.channel.send("Un error inesperado ha ocurrido.")
  }
  
  
}*/