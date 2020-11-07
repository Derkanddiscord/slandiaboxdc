const Discord = require("discord.js");


const RolPermitido = "702292847029780610"



exports.run = (client, message, args) => {
  
      console.log("test")

  
  if(message.author.id != "330238135629905921" && message.author.id != "249500266628513794" && !message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("➤ ┆ ¡No tienes permisos!")
  
  
  var Opciones = args.map(e => e.trim()).join(" ").split("/");
    
  console.log(Opciones)

  var Error = false;
  
  var Embed = new Discord.RichEmbed()
    Embed.setColor("DARK_RED")  
  
  if(!Opciones[0]) {
    Error = true
    Embed.setTitle("❗  No has introducido bien la pregunta.")
    Embed.setDescription("Uso del comando: ``-poll <Pregunta> / <Opción 1> / <Opción 2> / <Opción X>``")
  }else if(!Opciones[1] || !Opciones[2]){
    Error = true
    Embed.setTitle("❗ No has introducido bien las opciones.")
    Embed.setDescription("Uso del comando: ``-poll <Pregunta> / <Opción 1> / <Opción 2> / <Opción X>``")
  }
  
  const Pregunta = Opciones.shift();
  
  if(Opciones.length >= 11){
   Embed.setTitle("❗ Máximo de 10 opciones")
   Error = true
  }
  
  if(Error) return message.channel.send(Embed);
  
  const NumerosO = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟']
  
  
  var Numero = 1;
  
  //Embed.addBlankField();
  for(var Numero = 0; Numero < Opciones.length; Numero++){
    Embed.addField("=======================", NumerosO[Numero] + " **``" + Opciones[Numero] + "``**");
  }
  
  
 // Embed.setTitle("Nueva Encuesta!")
  Embed.setTitle("❓ " + Pregunta + "")
  Embed.setColor("GREEN")
  Embed.setTimestamp();
  Embed.setThumbnail(message.client.user.avatarURL);
  
  
  
  
  message.channel.send("Reaccione con ✅ para enviar la encuesta. Vista previa:", {"embed":Embed} ).then(async Men =>{
    
    await Men.react("✅")
    
    const filter = (reaction, user) => reaction.emoji.name == "✅" && user.id == message.author.id;
    var RecolectorReacciones = new Discord.ReactionCollector(Men, filter, { time: 30000 });
    
    message.delete();
    
    RecolectorReacciones.on("collect", Rec => RecolectorReacciones.stop("Aceptar") )
    
    RecolectorReacciones.on("end", (col, Razon) =>{
      
      Men.delete();
      
      if(Razon != "Aceptar") {
        
        var EmbedErr = new Discord.RichEmbed()
        .setColor("DARK_RED")
        .setTitle("❗ No se ha respondido.")
        .setDescription("La encuesta será cancelada.\nEncuesta cancelada:\n" + message.content);
        message.channel.send(EmbedErr);
      }else{
        message.channel.send(Embed).then(async EmbedOk =>{
          for(var Numero = 0; Numero < Opciones.length; Numero++){
            await EmbedOk.react(NumerosO[Numero]);
          }
        })
      }
    })
    
  });
  
  
  
  
}