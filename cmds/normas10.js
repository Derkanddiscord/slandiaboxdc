const Discord = require("discord.js")
exports.run = (client, message, args) => {
  const embedDatos = new Discord.RichEmbed() 

.setAuthor('❌ NORMAS OBLIGATORIAS ❌')
.setDescription("❎ Normativa del servidor de GreeenBear, no leerlas, no te hace inmune a no ser sancionado. ❎")
.addField("**⭕ | Respeta a los demás miembros del chat.**","_✅ | Sé respetuoso, no molestes, ni insultes ni acoses a los demás. No menciones a usuarios sin ningún motivo, ni tampoco a GreeenBear._")
.addField("**⭕ | No están permitidos los mensaje con contenido NSFW.**","_✅ | No envíes contenido no apto para menores._")
.addField("**⭕ | No está permitido hacer Spam ni Flood.**","_✅ | No envíes mensajes no deseados (spam) como publicidad/venta de cuentas/reclutamientos para clanes o equipos, ni hagas flood (inundar el canal con mensajes/reenviar cadenas de mensajes/mandar un mensaje lleno de contenido basura/hablar en otros idiomas)._")
.addField("**⭕ | No suplantes la identidad de otra persona.**","_✅ | No te hagas pasar por otra persona._")
.addField("**⭕ | Privacidad de datos.**","_✅ | No compartas información personal._")
.addField("**⭕ | Cuidado con lo que comentas.**","_✅ | No hagas spoilers de ninguna serie/juego/película/etc. solo para molestar._")
.addField("**⭕ | Cada canal tiene su propósito.**","_✅ | Usa los canales de texto y voz correctamente._") 
  
  
message.channel.send({ embed: embedDatos });
}