const Discord = require('discord.js');
var Economia = require("economia-discord")
exports.run = async (bot, message, args) => { 
  
  var PREFIX = "-";
  if (message.mentions.users.size < 1) return message.channel.send ("Introduzca un usuario (mencionalo): "+ PREFIX+"Donar **<Usuario>** <Dinero>")
  
  
  var Mencion = message.mentions.users.first ();

  if(Mencion.id == message.author.id) return message.channel.send("No puedes donarte a ti mismo.");
  
  var DineroDonador = Economia.dinero.mostrar(message.guild.id, message.author.id, message.author.username)
  if(DineroDonador.dinero <= 0 || DineroDonador == "no tiene dinero") return message.channel.send("No tienes dinero para donar! Usa " + PREFIX + "Trabajar");

  
  if(!args[1]) return message.channel.send ("Introduzca una cantidad: "+ PREFIX+"Donar <Usuario> **<Dinero>**")
  var CantidadDonar = args[1];
  
  if (isNaN(CantidadDonar)){
      message.channel.send ("Escriba solo un **número**. La donación será cancelada")
      return;
  }
  if (CantidadDonar == 0 ) return message.channel.send ("... Le donaste 0$")
  if (CantidadDonar < 0 ) return message.channel.send ("Ingresa un numero positivo. La donación será cancelada")
  if (CantidadDonar > DineroDonador.dinero) return message.channel.send("No tienes tanto dinero\nTu efectivo actual es de: ``" + DineroDonador.dinero + "$``. La donación será cancelada" )
  
              
  var DineroAgregara = Economia.dinero.agregar(message.guild.id, Mencion.id, Mencion.username, Number(CantidadDonar))
  
  if (DineroAgregara == "el valor es muy grande") return message.channel.send("Esa cantidad es infinita!")
  
  else if(DineroAgregara == "el usuario tiene demasiado dinero") return message.channel.send("Con esa cantidad el usuario tendría una infinidad de dinero!")
  
  else {
    Economia.dinero.sacar(message.guild.id, message.author.id, message.author.username, Number(CantidadDonar));
    message.channel.send ("Le has donado ``" + CantidadDonar + "$`` a **" + Mencion.username + "**.");
  }
}