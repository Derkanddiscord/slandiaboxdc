const { RichEmbed } = require("discord.js");
exports.run = (client, message, args) => {
  message.channel.send(new RichEmbed()
   .setTitle("** 🔗 Invitación | MineChest | 🔗 **")
   .addField("**Discord**", "https://discord.minechest.cf/")
   .setColor(0x66b3ff))
}