const Discord = require("discord.js")
exports.run = (client, message, args) => {
  const embedDatos = new Discord.RichEmbed() 

.setAuthor('✅ Método de Verificación ✅')
.setDescription("Bienvendo/a, al discord de MineChest. Aquí podrás informarte de todas las novedades. Y tener un vinculo con Staff's y Miembros.")
.addField("MineChest, donde podrás socializar e informarte de nuestras actualizaciones. Nuestro discord aporta una serie de características","● Staff's 24/7\n ● Soporte 24/7\n ● Bots de Diversión\n ● Podrás desbloquear colores y roles.")
.addField("**Modalidades Próximamente**","| ``SkyBlock``| ``Minecraft RolePlay``| ``SkyWars`` |")
.addField("**Mas información**","✢| IP: mc.minechest.cf \n ✢| Discord: https://discord.minechest.cf \n ✢| Foro: https://minechest.cf \n ✢| Tienda :")
.addField("ACCEDE A NUESTRO SERVIDOR DE DISCORD HACIENDO CLICK SOBRE EL BOTÓN QUE HAY DEBAJO DE ESTE MENSAJE","**🔔**")
  message.channel.send({ embed: embedDatos });
}