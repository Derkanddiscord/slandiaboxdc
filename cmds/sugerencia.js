const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  
  let canal = client.channels.get("732188353986035732");//canal sugerencias
  let sugerencia = args.join(" ");
if (message.channel.id !== "732188356074537001                  ") {//donde debe funcionar
	return message.channel.send(':x: | ¡Este comando no funciona aquí! <#732188356074537001>')
} else {
	if(!sugerencia) return message.channel.send(`Escribe una sugerencia usando "-sugerencia [sugerencia]"`);
	message.channel.bulkDelete(1)
	const embed = new Discord.RichEmbed() 
	  .setTitle("Sistema de sugerencias.")
	  .setColor(0x1805fa)
	  .setDescription(args.join('** **')) 
	  .addField('Opcion 1', '``👍``  Si')
	  .addField('Opcion 2', '``👎`` No')
	  .setFooter(`Sugerencia de ${message.author.tag}`)
	  .setTimestamp()
	  
	canal.send(embed)  .then(async m => {
	await m.react("👍")
	await m.react("👎")
	});
}
  }