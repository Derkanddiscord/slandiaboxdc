const Discord = require('discord.js');
var Economia = require("economia-discord")
var fs= require("fs")
var ColoresJson= require("../colores.json")

exports.run = async (bot, message, args) => {
  
  var Inventario = Economia.inventario.mostrar(message.guild.id, message.author.id, false);

  var Embed = new Discord.RichEmbed();
  Embed.setColor("DARK_RED")
  
  if(Inventario == "no items"){
      Embed.setDescription("No tienes el item comprado")

      message.channel.send(Embed);
  }else if(!Inventario.some((I) => I.nombre == "Color")) {
    Embed.setDescription("No tienes el item comprado")
    message.channel.send(Embed);

  }else {
    
    var PosicionEnElInventario = Inventario.map((I)=> I.nombre).indexOf("Color");
    
    PosicionEnElInventario += 1;
    
    var Cargando = new Discord.RichEmbed()
    .setTitle("Cargando Reacciones")
    
    
    message.channel.send(Cargando).then(async Car => {
      
      var ColoresA = "0⃣ 1⃣ 2⃣ 3⃣ 4⃣ 5⃣ 6⃣".split(" ");
      await Car.react("1⃣");
      await Car.react("2⃣");
      await Car.react("3⃣");
      await Car.react("4⃣");
      await Car.react("5⃣");
      await Car.react("6⃣");
      
          
      var Colores = {
        "1⃣": "725001394683379732",
        "2⃣": "725001398671900815",
        "3⃣": "725001400236376144",
        "4⃣": "725001401297666097",
        "5⃣": "725001401771622451",
        "6⃣": "725001402459357196"
      }

      const EmbedOpciones = new Discord.RichEmbed()
      .setTitle("Colores!")
      .setDescription("Reacciona con un emoji para elegir tu nuevo color!")
      .addField("Reacciona con :one:", "Para elegir <@&725001394683379732>")
      .addField("Reacciona con :two:", "Para elegir <@&725001398671900815>")
      .addField("Reacciona con :three:", "Para elegir <@&725001400236376144>")
      .addField("Reacciona con :four:", "Para elegir <@&725001401297666097>")
      .addField("Reacciona con :five:", "Para elegir <@&725001401771622451>")
      .addField("Reacciona con :six:", "Para elegir <@&725001402459357196>")
      .setFooter("Tienes 40 segundos")
      .setColor("RANDOM");

      Car.edit(EmbedOpciones);
      

      const filter = (reaction, user) => (ColoresA.some(e => e == reaction.emoji.name)) && user.id == message.author.id;
      const CollectorDeReacciones = Car.createReactionCollector(filter, {max: 1, time: 40000});

      CollectorDeReacciones.on ('end', (Recolectado, Emoji) => {
          if (Recolectado.size == 0) message.channel.send('No has reaccionado.');
          Car.delete();

      });

      CollectorDeReacciones.on ('collect', Reaccion => CambiarRol(message, Colores, Reaccion, Object.values(Colores), Embed, PosicionEnElInventario))
      
    })
    
    
  }
  
}

function CambiarRol(message, Colores, Reaccion, IdsA, Embed, PosicionEnElInventario){
  var YaTiene = false;
  var MensajeExtraOtroRol = "";
  message.member.roles.forEach((Rol)=>{
    if(Rol.id == Colores[Reaccion.emoji.name]) YaTiene = true;
    else if(IdsA.indexOf(Rol.id) != -1){
      message.member.removeRole(Rol.id);
      MensajeExtraOtroRol += "\nEl Rol <@&" + Rol.id + "> fue removido."
    }
  })

  if(YaTiene){
    Embed.setDescription("Ya tienes ese color!")
    message.channel.send(Embed)
    return
  } 

  message.member.addRole(Colores[Reaccion.emoji.name]).then(() =>{
    if(!ColoresJson[message.guild.id]){
      ColoresJson[message.guild.id] = {}
    }
    if (!ColoresJson[message.guild.id][message.author.id]){
      ColoresJson[message.guild.id][message.author.id] = []
    }
    if(ColoresJson[message.guild.id][message.author.id].indexOf(Colores[Reaccion.emoji.name]) == -1){
      ColoresJson[message.guild.id][message.author.id].push(Colores[Reaccion.emoji.name])
    } 
    
    fs.writeFile('./colores.json', JSON.stringify(ColoresJson, null, "  "), function(err) {
      
       Economia.inventario.sacar(message.guild.id, message.author.id, PosicionEnElInventario);
    
       Embed.setDescription("✅ Su rol <@&" + Colores[Reaccion.emoji.name] + "> ha sido agregado correctamente." + MensajeExtraOtroRol);

       Embed.setColor("GREEN")

       message.channel.send(Embed);
      
    });
     


  }).catch(() =>{
    message.channel.send("Algo inesperado ha ocurrido")
  });
}