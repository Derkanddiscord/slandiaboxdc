const Discord = require("discord.js");

const Tickets = require("../tickets/tickets.js")

exports.run = async (client, message, args) => {
    
  let razon = args.join(' ');        

  //if (!razon) return message.channel.send("Necesitas especificar una razón. -CrearTicket <Razón>");
    //return message.channel.send("➤ ┆ Este comando esta en mantenimiento. Lamentamos las molestias.")


  const EmbedCargando = new Discord.RichEmbed()
  .setTitle("**Cargando**")
  .setAuthor("Pedido por: " + message.author.username, message.author.avatarURL)
  .setDescription("Agregando reacciones...");
  
  message.channel.send(EmbedCargando).then(async MensajeOpciones =>{
  
    var Emojis = "0⃣ 1⃣ 2⃣ 3⃣ 4⃣ 5⃣ 6⃣".split(" ");
    
    await MensajeOpciones.react("1⃣");
    await MensajeOpciones.react("2⃣");
    await MensajeOpciones.react("3⃣");
    await MensajeOpciones.react("4⃣");
    await MensajeOpciones.react("5⃣");
    await MensajeOpciones.react("6⃣");
    
    var Razones = {
      "1⃣": "APELAR SANCIÓN",
      "2⃣": "REPORTAR USUARIO",
      "3⃣": "REPORTAR STAFF",
      "4⃣": "SOPORTE",
      "5⃣": "BUGS",
      "6⃣": "OTROS"
    }
    
    
    const EmbedOpciones = new Discord.RichEmbed()
    .setTitle("Razón del Ticket")
    .setDescription("Reacciona con un emoji para elegir la razón de tu Ticket")
    .addField("Reacciona con :one:", "Para elegir ``APELAR SANCIÓN``")
    .addField("Reacciona con :two:", "Para elegir ``REPORTAR USUARIO``")
    .addField("Reacciona con :three:", "Para elegir ``REPORTAR STAFF``")
    .addField("Reacciona con :four:", "Para elegir ``SOPORTE``")
    .addField("Reacciona con :five:", "Para elegir ``BUGS``")
    .addField("Reacciona con :six:", "Para elegir ``OTROS``")
    .setFooter("Tienes 40 segundos")
    .setColor("RANDOM");
    
    MensajeOpciones.edit(EmbedOpciones);
    const filter = (reaction, user) => (Emojis.some(e => e == reaction.emoji.name)) && user.id == message.author.id;
    const CollectorDeReacciones = MensajeOpciones.createReactionCollector(filter, {time: 40000});

    CollectorDeReacciones.on ('end', (Recolectado, Emoji) => {
        if (Recolectado.size == 0){
            MensajeOpciones.delete();
            message.channel.send('No has reaccionado.');
        }else {
          
            if (!Razones[Emoji]) message.channel.send("Un error inesperado ha ocurrido.").then(m => m.delete(8000));
            else Tickets.crearTicket(Razones[Emoji], message);
          
            MensajeOpciones.delete();
        }
    });

    CollectorDeReacciones.on ('collect', Reaccion => {
      
      CollectorDeReacciones.stop(Reaccion.emoji.name);
      
    })
  })
    
}