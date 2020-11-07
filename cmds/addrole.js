const Discord = require("discord.js");
const Tickets = require("../tickets/tickets.js")

exports.run = async (client, message, args) => {
  
  const RelosPermitidos = ["672082416151822355"]

  const RolYT = "672082231812030465";
  const RolTwitch = "665687886053507076";
  
 // if (!message.member.roles.some((Rol) => RelosPermitidos.indexOf(Rol.id) != -1) && Tickets.idsExcepcion.indexOf(message.author.id) != -1) return message.channel.send("No tienes los permisos necesarios para ejecutar este comando.");
   if(message.author.id !="330238135629905921") return message.channel.send("No tienes los permisos necesarios para ejecutar este comando.");
    
  if (message.mentions.users.size < 1) return message.channel.send("Necesitas mencionar a un usuario! -addRole <Usuario> <YT o TWITCH>")
    
  let mentions = message.mentions.members.first();

    
  if (!args[1]) return message.channel.send("Necesitas especificar el rol! -addRole <Usuario> <YT o TWITCH>")
  
  
  const rango = args[1].toLowerCase();
  
  if (rango != "yt" && rango != "twitch") return message.channel.send("Necesitas especificar el rol indicado! -addRole <Usuario> <YT o TWITCH>")
  
  if(rango == "yt"){
    if(!mentions.roles.has(RolYT)){
      mentions.addRole(RolYT).then(() => {
       //   message.channel.send("✅ El rol <&"+RolYT+"> ha sido agregado al usuario "+ mentions.user.username + " correctamente");
      }).catch(console.error);
    }else{
      message.channel.send("El usuario " + mentions.user.username + " ya tiene el rol.")
    }
    
  }else if(rango == "twitch"){
    if(!mentions.roles.has(RolTwitch)){

      mentions.addRole(RolTwitch).then(() => {
         // message.channel.send("✅ El rol <&"+RolTwitch+"> ha sido agregado al usuario "+ mentions.user.username + " correctamente");
      }).catch(console.error);
    }else{
      message.channel.send("El usuario " + mentions.user.username + " ya tiene el rol.")
    }
  }else{
    message.channel.send("Un error inesperado ha ocurrido.")
  }
  
  
}
