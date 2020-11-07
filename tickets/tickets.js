var fs = require("fs");
var Discord = require("discord.js");
var Tickets = require("./tickets.json");

function Escribir (Elemento){
  fs.writeFile('./tickets/tickets.json', JSON.stringify(Elemento, null, " "), function(err) {
      if (err) throw TypeError("Un error inesperado ha ocurrido!");
  });
}

const RolStaff = "732188326487916644" 
const Categoria = "732953989506662451"

const idsExcepcion = ["330238135629905921", "Id2", "Id3"]

// Imaginate quiero poner mi id (249500266628513794) para que pueda usar  todos esos comandos, 
// lo que tengo que hacer es remplazar Id1 por "249500266628513794" aca arriba ^^
// Una vez remplazado, el usuario con esa id podra usar todos esos comandos de aca abajo.
// Si quiero agregar a otra persona pues remplazo Id2 por la id de la otra persona.
// Comandos que podra usar:
/*
warn
unmute
unban
tickets
tempmute
tempban
removeuser
removerole
mute
kick
ban
adduser
addrole
*/

module.exports = {
  idsExcepcion: idsExcepcion,
  rolStaff: RolStaff,
  crearTicket: (Razon, message) =>{
    
    const NroDeTicket = Tickets.nroDeTicket;
    
    
    message.guild.createChannel("🎫┋ticket-" + NroDeTicket, {
      "type": "text", 
      "permissionOverwrites": [
        {"allow": 437264, "id": "697226816112558143"},
        {"id": RolStaff, "allow": ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES']},
        {"id": "688399314845958403", "allow": ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES']},
        {"id": message.author.id, "allow": ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES']},
        {"id": message.guild.roles.find(r => r.name == '@everyone').id, "deny":['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES']}
      ]
    }).then (Canal => {
      
      
      
      Canal.setParent(Categoria)
      
      
      
      const EmbedTicketCreado = new Discord.RichEmbed()
      .setTitle("**Ticket "+ NroDeTicket +" creado**")
      .setDescription("🎫 Tu ticket fue creado exitosamente.\n__Razón__:\n``" + Razon + "``")
      .addField("Canal", "Dirígete a <#" + Canal.id + ">")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setColor("RANDOM")
      .setTimestamp();
      message.channel.send(EmbedTicketCreado);
      
      const EmbedTicketCreadoCanal = new Discord.RichEmbed()
      .setTitle("__**Ticket "+ NroDeTicket +" creado**__")
      .setAuthor("Creado por: " + message.author.tag, message.author.avatarURL)
      .setDescription("🎫 Nuevo ticket creado!\n__Razón:__\n``" + Razon + "``")
      .addField("🕐 Paciencia", "Por favor, ten paciencia. Un miembro de nuestro staff te atenderá en un momento.")
      .setColor("RANDOM")
      .setTimestamp();
      
      Canal.send(EmbedTicketCreadoCanal)
      
      Tickets.Logs.push( {
        "autor": {"username": message.author.tag, "id":message.author.id},
        "razon": Razon,
        "canal": Canal.id,
        "estado": {"ticket": "Abierto"}
      })
      
      Tickets.nroDeTicket += 1;
      Escribir(Tickets);
      
    }).catch((e) =>{
      message.channel.send("Un error inesperado ha ocurrido. Si el error persiste, contacte al Staff.\nDisculpe las molestias.")
      console.error(e);
    })
   
    
  },
  cerrarTicket: (Razon, nroDeTicket, message) =>{
    
    
    var Encontrado = false;
    if (nroDeTicket == "no"){
      for(let k = 0; k < Tickets.Logs.length; k++){
        if (Tickets.Logs[k].canal == message.channel.id){
          nroDeTicket = k;
          Encontrado = true;
          break;
        }
      }
    }else{
      Encontrado = true;
    }
    
    if (!Encontrado) return "El canal en el que está no es un ticket. Introduzca el número de ticket o utilice el comando dentro de un canal de un Ticket.";
    
    nroDeTicket = Number(nroDeTicket);

    if(nroDeTicket >= Tickets.Logs.length) return "El número de ticket ingresado no fue encontrado!";
    else if (Tickets.Logs[nroDeTicket].estado.ticket == "Cerrado") return "El ticket ya fue cerrado.\nPara ver información acerca del ticket, utilice -InfoTicket <Número de ticket>"
    else{
      
      if (message.guild.channels.has(Tickets.Logs[nroDeTicket].canal)){
        message.channel.send("✅ El ticket ha sido cerrado correctamente.").then(m => {
           message.guild.channels.get(Tickets.Logs[nroDeTicket].canal).delete(Razon);
        });
      }else return "El canal del ticket ya ha sido borrado. Se cerrará el ticket correctamente."
      
    
      Tickets.Logs[nroDeTicket].estado = {
        "ticket": "Cerrado",
        "autor": {"username": message.author.tag, "id": message.author.id},
        "razon": Razon
      }

      Escribir(Tickets);
      
      return true;
      
    }
    
    
    
  },
  addUser: (IdUsuario, nroDeTicket, message) =>{
    
    var Encontrado = false;
    if (nroDeTicket == "no"){
      for(let k = 0; k < Tickets.Logs.length; k++){
        if (Tickets.Logs[k].canal == message.channel.id){
          nroDeTicket = k;
          Encontrado = true;
          break;
        }
      }
    }else{
      Encontrado = true;
    }
    
    if (!Encontrado) return "El canal en el que está no es un ticket. Introduzca el número de ticket o utilice el comando dentro de un canal de un Ticket.";
    
    nroDeTicket = Number(nroDeTicket);

    if(nroDeTicket >= Tickets.Logs.length) return "El número de ticket ingresado no fue encontrado!";
    else if (Tickets.Logs[nroDeTicket].estado.ticket == "Cerrado") return "El ticket ya fue cerrado.\nPara ver información acerca del ticket, utilice -InfoTicket <Número de ticket>"
    else{
    
      if (message.guild.channels.has(Tickets.Logs[nroDeTicket].canal)){
        message.guild.channels.get(Tickets.Logs[nroDeTicket].canal).overwritePermissions(IdUsuario, { 
          'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'READ_MESSAGE_HISTORY': true, 'ATTACH_FILES': true
        }).then(C => C.send("✅ <@"+ message.author.id+"> ha añadido al usuario <@"+ IdUsuario+ "> correctamente."))
      }else{
        return "Parece que el canal del ticket ha sido borrado sin haberlo cerrado.\nUtilice -CerrarTicket <Razón> | " + nroDeTicket + " Para cerrarlo correctamente."
      }
    
    }
    
  },
  removeUser: (IdUsuario, nroDeTicket, message) =>{
    
    var Encontrado = false;
    if (nroDeTicket == "no"){
      for(let k = 0; k < Tickets.Logs.length; k++){
        if (Tickets.Logs[k].canal == message.channel.id){
          nroDeTicket = k;
          Encontrado = true;
          break;
        }
      }
    }else{
      Encontrado = true;
    }
    
    if (!Encontrado) return "El canal en el que está no es un ticket. Introduzca el número de ticket o utilice el comando dentro de un canal de un Ticket.";
    
    nroDeTicket = Number(nroDeTicket);

    if(nroDeTicket >= Tickets.Logs.length) return "El número de ticket ingresado no fue encontrado!";
    else if (Tickets.Logs[nroDeTicket].estado.ticket == "Cerrado") return "El ticket ya fue cerrado.\nPara ver información acerca del ticket, utilice -InfoTicket <Número de ticket>"
    else{
    
      if (message.guild.channels.has(Tickets.Logs[nroDeTicket].canal)){
        message.guild.channels.get(Tickets.Logs[nroDeTicket].canal).overwritePermissions(IdUsuario, { 
          'VIEW_CHANNEL': false, 'SEND_MESSAGES': false, 'READ_MESSAGE_HISTORY': false, 'ATTACH_FILES': false
        }).then(C => C.send("✅ <@"+ message.author.id+"> ha removido al usuario "+ message.guild.members.get(IdUsuario) + " correctamente."))
      }else{
        return "Parece que el canal del ticket ha sido borrado sin haberlo cerrado.\nUtilice -CerrarTicket <Razón> | " + nroDeTicket + " Para cerrarlo correctamente."
      }
    
    }
    
  },
  infoTicket: (nroDeTicket, message) => {
    
    nroDeTicket = Number(nroDeTicket);

    if(nroDeTicket >= Tickets.Logs.length) return "El número de ticket ingresado no fue encontrado!";
    if (!Tickets.Logs[nroDeTicket]) return "El número de ticket ingresado no fue encontrado!";
    
    return Tickets.Logs[nroDeTicket];
  },
  ticketsDe: (UsuarioId, message) =>{
    var MensajeFinal = "📥 __El usuario abrió los tickets:__\n``";
    var TieneTickets = false;
    Tickets.Logs.forEach((Ticket, Index) => {
      if (Ticket.autor.id == UsuarioId){
        MensajeFinal += Index + ", "
        TieneTickets = true
      }
    });
    if (!TieneTickets) return "❌ El usuario no abrió un Ticket aún";
    MensajeFinal = MensajeFinal.substring(0, MensajeFinal.length - 2);
    MensajeFinal += "``\n\nPara ver información de algun ticket utilice -InfoTicket <Número de ticket>"
    return MensajeFinal;
  },
  reiniciarTickets:() =>{
    Tickets.nroDeTicket = 0;
    Tickets.Logs = [];
    
    Escribir(Tickets);
    
  }
  
}