exports.run =  async (client, message, args) => {
  const Discord = require('discord.js');

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No tienes los permisos necesarios!")

    let msg = args.join(" ")

    message.delete
    message.channel.bulkDelete(1)

   message.channel.send(msg);

}