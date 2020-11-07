const Discord = require("discord.js")
exports.run = async (client, message, args) => {
const embed = new Discord.RichEmbed()
.setThumbnail(client.user.avatarURL)
.setAuthor("MineChest" , client.user.avatarURL)
.setTitle("Los comandos de Tickets ")
.setDescription("Estos son los comandos que podras utilizar con respecto al sistema de tickets:")
.addField("**-crearTicket**", "Utiliza este comando para abrir un nuevo ticket.")
.addField("------------------", "**Comandos solo para Staff**")
.addField("**-CerrarTicket <Razón> | (Número de ticket)**", "Cerrar un ticket abierto.\nPara este comando es necesario escribir la razón del cierre del ticket y es opcional indicar el número del ticket si se encuentra en el canal del ticket. Utiliza **|** para separar la razón del número de ticket")
.addField("**-addUser <Usuario> | (Número de ticket)**", "Agregar a un usuario al canal del ticket.\nPara este comando es necesario mencionar al usuario o escribir la ID del usuario de quien se quiere agregar y es opcional indicar el número del ticket si se encuentra en el canal del ticket. Utiliza **|** para separar al usuario del número de ticket")
.addField("**-removeUser <Usuario> | (Número de ticket)**", "Remover a un usuario del canal del ticket.\nPara este comando es necesario mencionar al usuario a quien se quiere remover y es opcional indicar el número del ticket si se encuentra en el canal del ticket. Utiliza **|** para separar al usuario del número de ticket")
.addField("**-infoTicket <Número de ticket>**", "Mira información del Ticket.\nPara este comando es necesario especificar el Número de ticket.")
.addField("**-tickets <Usuario>**", "Mira todos los tickets abiertos por el usuario.\nPara este comando es necesario mencionar al usuario.")
.setColor(0x66b3ff)
message.channel.send(embed);
}