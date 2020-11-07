const Discord = require("discord.js");
exports.run = async (client, message, args) => {

    let cantidad = args[0];
    var perms = message.member.hasPermission("ADMINISTRATOR") || message.author.id =="249500266628513794" ;
if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
if(!cantidad || isNaN(cantidad) || cantidad > 100) {
message.channel.send("Selecciona una cantidad de mensajes a borrar [2-100]")
return;
}
message.delete().then(() => {//Borrar el comando enviado para que después no interfiera con el bulkDelete
message.channel.bulkDelete(cantidad).then((e) => message.channel.send(`Se ha borrado la cantidad total de ${e.size}`)).catch(() => message.channel.send("No he podido borrar los mensajes"))
})
    
};