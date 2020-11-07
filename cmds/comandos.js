const Discord = require("discord.js");

exports.run = async (client, message, args) => {
const embed = new Discord.RichEmbed()
.setThumbnail(client.user.avatarURL)
.setAuthor("COMANDOS" , client.user.avatarURL)
.setTitle("Los comandos que dispongo: ")
.setDescription("Estos son los comandos que podras utilizar con respecto a nuestro bot:")
.addField("Generales:","**-_invite_** ``Invitación del discord.`` \n**_-8ball_** ``Repuesta aleatoria.`` \n **_-avatar_** ``Avatar de tu cuenta.`` \n **_-sugerencia_** ``Enviar una sugerencia.`` \n  **_-amor_** ``Menciona 2 Usuarios, y veras el amor.``")
.addField("Tickets:","**_-crearticket_** ``Crear el ticket.``\n **_-helptickets_** ``Información de como funcionan.``")
.addField("Tickets Staff:","**_-infoticket_** `` Información del Ticket``\n**_-cerrarticket_** ``Cerrar Ticket`` ")
.addField("Economía:","**_-shop_** ``Muestra la tienda.``\n **_-trabajar_** ``Gana dinero cada 300 segundos.``\n **_-top_** ``Top con mas dinero.``\n **_-retirar_** ``Retirar dinero del banco a efectivo.``\n **_-depositar_** ``Deposita tu dinero efectivo al banco.``\n **_-robar_** ``Robar dinero a un Usuario.``\n **_-robarbanco_** ``Robar dinero del banco.``\n **_-donar_** ``Donar Dinero a un Usuario.``\n **_-perfil_** ``Muestra tu perfil.``\n **_-comprar_** ``Comprar Item de la tienda.``")
.addField("Administrativos:", "**_-addcoins_**``Agregar coins.``\n **_-removecoins_**``Eliminar coins.``\n **_-warn_** ``Avisar Usuario.`` \n **_-kick_** ``Expulsar Usuario.`` \n **_-ban_** ``Banear usuario.`` \n **_-mute_** ``Silenciar Usuario.`` \n  **_-historial_** ``Ver el Historial de sanciónes de un Usuario.`` \n **_-unban_** ``Desbanear Ususario.``\n **_-unmute_** ``Desmutear Usuario.`` \n **_-reiniciarhistorial_** ``Borrar el historial del Usuario.``\n **_-agregaritem_** ``Agrega un item a la tienda``\n **_-agregariteminv_** ``Agregar Un item al inventario de otro usuario.``\n **_-removeItem_** ``Remueve un item de la tienda.``\n **_-removeItemInv_** ``Remueve un item del inventario de una persona.``\n **_-aviso_** ``Aviso general``\n **_-anuncio_** ``Anuncio Global`` ")
.setColor(0x66b3ff)
message.channel.send({ embed })
}