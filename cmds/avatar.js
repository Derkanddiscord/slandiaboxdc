const { RichEmbed } = require("discord.js");

exports.run = (client, message, args) => {
  let miembro = message.mentions.users.first()
if (!miembro) {
    const embed = new RichEmbed()
        .setImage(`${message.author.displayAvatarURL}`)
        .setColor(0x66b3ff)
        .setFooter(`Avatar de ${message.author.tag}`);
    message.channel.send(embed);

} else {
    const embed = new RichEmbed()
        .setImage(`${miembro.displayAvatarURL}`)
        .setColor(0x66b3ff)
        .setFooter(`Avatar de ${miembro.tag}`);

    message.channel.send(embed);

};
}
                     
