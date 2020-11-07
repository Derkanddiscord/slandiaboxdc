const Discord = require("discord.js");
const Tickets = require("../tickets/tickets.js")

exports.run = async (client, message, args) => { 
  
  return message.channel.send("➤ ┆ Este comando esta en mantenimiento. Lamentamos las molestias.")
  
  const megadb = require("megadb");
let tempmute = new megadb.crearDB("tempmute");
const ms = require("ms");

var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1;
var yyyy = hoy.getFullYear();
  hoy = dd+'/'+mm+'/'+yyyy;
  
    if(!message.member.hasPermission("BAN_MEMBERS") && Tickets.idsExcepcion.indexOf(message.author.id) != -1) return message.channel.send("➤ ┆ No tienes los permisos necesarios.");  
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("➤ ┆ Menciona a un Usuario.");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("➤ ┆ No puedo mutear a ese usuario!");
    let muterole = message.guild.roles.find(m => m.name === 'Muteado')
    let razon = args[2]
    console.log("razon "+razon)
            if(tempmute.tiene(tomute.id)){
          tempmute.sumar(`${tomute.id}`,1)
        }else{
          tempmute.establecer(`${tomute.id}`,1)
        }
    
    
    
    if(muterole){
        try{
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
          name: "Muteado",
          color: "#14F214",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }


    let mutetime = args[1]; 
      console.log("mutetime "+mutetime)

    if(!mutetime) return message.reply("➤ ┆ Introduzca el tiempo de mute!");
    let canal = message.guild.channels.get("692841218547253273") //704457853934633010
        let canal2 = message.guild.channels.get("704457853934633010") //704457853934633010

    await tomute.addRole(muterole.id);
        const embed = new Discord.RichEmbed() 
        embed.setColor("RED")
        embed.setDescription(`Un usuario ha sido muteado temporalmente`)
        embed.addField("➨ ┃ Usuario", `**➽ TAG** ➤ ┆ ${tomute.user.tag}\n**➽ ID** ➤ ┆ ${tomute.user.id}`)
        embed.addField("➨ ┃ Staff", `**➽ TAG** ➤ ┆ ${message.author.tag}\n**➽ ID** ➤ ┆ ${message.author.id}\n**➽ Mención** ➤ ┆ ${message.author}`)
        embed.addField("➨ ┃ Razón del baneo", `➤ ┆ ${razon}`)
        embed.addField("➨ ┃ Tiempo",`➤ ┆ ${mutetime}`)
        embed.addField("➨ ┃ Apelar", `➽ Debes de apelar con el miembro del Staff que te ha silenciado.`)
        embed.addField("➨ ┃ Discord", "➽ https://discord.gg/VkptDZS ")
        embed.setFooter(hoy)
      canal.send(embed)
      canal2.send(embed)

        tomute.send(embed)
  
    setTimeout(function(){
      tomute.removeRole(muterole.id);
        const embed2 = new Discord.RichEmbed() 
        embed2.setColor("RED")
        embed2.setDescription(`Se ha desmuteado al usuario temporal`)
        embed2.addField("➨ ┃ Usuario", `**➽ TAG** ➤ ┆ ${tomute.user.tag}\n**➽ ID** ➤ ┆ ${tomute.user.id}`)
        embed2.addField("➨ ┃ Staff", `**➽ TAG** ➤ ┆ ${message.author.tag}\n**➽ ID** ➤ ┆ ${message.author.id}\n**➽ Mención** ➤ ┆ ${message.author}`)
        embed2.addField("➨ ┃ Desmuteado automáticamente ", "➽  Ya puedes hablar.") 
        embed2.addField("➨ ┃ Discord", "➽ https://discord.gg/VkptDZS ")
        embed2.setFooter(hoy)
          canal.send(embed2)
      canal2.send(embed)

          tomute.send(embed2)
    }, ms(mutetime));
}
