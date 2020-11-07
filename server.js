const express = require("express");
const app = express();

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const session = require("express-session");
const passport = require("passport");
const { Strategy } = require("passport-discord");
const bodyparser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
let db = require("./db.json");
const megadb = require("megadb");
const sqlite = require("./database/database.js");
require('dotenv').config();
//azul verde
const urlRegex = require('url-regex');

//passport.serializeUser((user, done) => {
 // done(null, user);
//});
//passport.deserializeUser((obj, done) => {
//  done(null, obj);
////////});

//////let scope = ['identify'];
////passport.use(new Strategy({
//  clientID: process.env.CLI_ID,
////  clientSecret: process.env.CLI_SECRET,
//////  callbackURL: `${process.env.URL}/login`,
////////  scope: 'identify'
//////////}, function(accessToken, refreshToken, profile, done){
//  process.nextTick(function() {
////    return done(null, profile);
//////  });
////////}));
//////////app.get('/perfil', function(req, res) {
 //////////// res.send('Bienvenido/a a tu perfil.')

//})
  // Midleware

//app.use(express.static('csss'));

//app.get("/", function (request, response) {
  //response.sendFile(__dirname + '/htmls/pagina.html');
//});







app
  .get("*", (req, res) => {
    //res.send("OK");//LEPMP3oNRTARA DHDBNDH 
  })
  .listen(process.env.PORT || 3000);
// Importación de librerías
const actividades = [
    "MineChest",
    "IP: mc.minechest.cf",
]; // Esto crea una lista con las frases que quieras que tu bot cambie constantemente.

client.on("ready", async () => {

    console.log(`Conectado como ${client.user.tag}!`);
  setInterval(() => {
    const index = Math.floor(Math.random() * (actividades.length - 1) + 1); // Genera un numero aleatorio entre 1 y la longitud de la lista de actividades.
    client.user.setPresence({
      status: "online",
      game: {
        name: actividades[index],
        type: "WATCHING"
      }
    });
  }, 5000); // Este es el tiempo en el que cada vez cambiara la actividad. (en milisegundos)
  console.log("Estoy listo!");
  await sqlite.checker.createTables();
});
function aleatorioEntreE(a, b) {
  let n;
  n = Math.floor(Math.random() * (b - a) + a);
  return n;
}





let warnsdb = new megadb.crearDB("warnsdb");
let mutes = new megadb.crearDB("mutes");
let kick = new megadb.crearDB("kick");
let ban = new megadb.crearDB("ban");
let tempban = new megadb.crearDB("tempban");
let tempmute = new megadb.crearDB("tempmute");
let unmute = new megadb.crearDB("unmute");
let unban = new megadb.crearDB("unban");




const RolesByPassMayus = ["732188326487916644"]
// Id de los roles que pueden enviar links, mayusculas, escribir rapido
// usar los comandos en todos los canales y mencionar a los roles de "RolesSinMencion"

const Rolusuario = "732188321903542342";
// La id del rol "Usuario" (El rol que todo mundo tiene)

const CanalComando = "732188356074537001"
// La id del canal en donde se pueden usar los comandos del bot.


const CanalTickets = "732338485150875821"
// La id del canal en donde se pueden usar los tickets.

const ServidorId = "732187377493344257"
// La id del servidor.

const CanalMusica = "732188359388299336"
// La id del canal en donde se puede usar los comandos de musica de otro bot.

const CanalBienvenidas = "732188344733270056";
// La id del canal de las Bienvenidas

const CanalNiveles = "732338965448884297"
// La id del canal de los mensajes de subida de nivel.

const CanalLog = "733733790689656863"
// La id del canal de los Logs.

const RolesSinMencion = [""]
// Roles que no podran ser mencionados por el RolUsuario ni por nadie
// excepto por "RolesByassMayus"

var MensajesMencion = {}
var Mensajes = {}
client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "md") return;
  if (!msg.guild) return;
  

  if(urlRegex().test(msg.content) && !msg.member.roles.some((R) => RolesByPassMayus.indexOf(R.id) != -1)) {

    if(msg.channel.id == CanalMusica && msg.content.toLowerCase().includes("youtu")) return;
      
    if(msg.member.roles.has(Rolusuario)) {
      console.log('entro')
      console.log(msg.content)
      console.log(msg.channel.id)
      
      const banEmbed2 = new Discord.RichEmbed()
        .setColor("RED")
        .setThumbnail(msg.author.displayAvatarURL)
        .setDescription("Link detectado y eliminado!")
        .addField("Sanciones","MineChest")
        .addField("➨ ┃ Usuario", `**➽ TAG** ➤ ┆ ${msg.author.tag}\n**➽ ID** ➤ ┆ ${msg.author.id}`)
        .addField("➨ ┃ Canal", `➤ ┆ <#${msg.channel.id}>`)
        .addField("➨ ┃ Link", `➤ ┆ [Link detectado](${msg.content})`)
        .setTimestamp()
      
       msg.guild.channels.get(CanalLog).send(banEmbed2)
       msg.channel.send({embed: {description: `❌ | ${msg.author}, no se permiten links!.`}})
       
       
       return msg.delete(2000)
    }
   
  }
  // Mayus
  if (!msg.member.roles.some((R) => RolesByPassMayus.indexOf(R.id) != -1) && msg.guild.id == ServidorId && msg.member.roles.has(Rolusuario) && msg.guild){
    var Mayus = 0;
    const MensajeL = msg.content.length;
    if(MensajeL > 3){ 
      const Mensaje25 = Math.round(MensajeL * 0.25) + 2;

      for (var i = 0; i < MensajeL; i++) {
        var Letra = msg.content.charAt(i);

        if(Letra == Letra.toUpperCase() && Letra != Letra.toLowerCase()) Mayus++;
        if (Mayus >=  Mensaje25){
          const EmbedMayus = new Discord.RichEmbed()
          .setColor("RED")
          .setThumbnail(msg.author.displayAvatarURL)
          .setDescription("Cantida de mayusculas excesiva.")
          .addField("Sanciones","MineChest")
          .addField("➨ ┃ Usuario", `**➽ TAG** ➤ ┆ ${msg.author.tag}\n**➽ ID** ➤ ┆ ${msg.author.id}`)
          .addField("➨ ┃ Canal", `➤ ┆ <#${msg.channel.id}>`)
          .addField("➨ ┃ Mensaje", `➤ ┆ ${msg.content}`)
          .setTimestamp()
          msg.channel.send(msg.author + "! Vigila el uso excesivo de mayusculas.");

          msg.guild.channels.get(CanalLog).send(EmbedMayus)

          msg.delete();

          break;
        }
      }
    }
        
  }
  
  
  
  
  if (!msg.member.roles.some((R) => RolesByPassMayus.indexOf(R.id) != -1) && msg.guild.id == ServidorId && !msg.channel.name.includes("ticket") && !msg.member.hasPermission("ADMINISTRATOR") && msg.member.roles.has(Rolusuario)){
    
    if (!Mensajes[msg.author.id + msg.channel.id]){
      
      Mensajes[msg.author.id + msg.channel.id] = {
        "CantidadDeMensajes": 1,
        "Mensajes": [msg.id],
        "MensajeEnviado": false
      }
      
      setTimeout(() => {
        Mensajes[msg.author.id + msg.channel.id].CantidadDeMensajes -= 1;
        const index = Mensajes[msg.author.id + msg.channel.id].Mensajes.indexOf(msg.id);
        if (index > -1) {
          Mensajes[msg.author.id + msg.channel.id].Mensajes.splice(index, 1);
        }
      }, 3000)
      
    }else{
      

      Mensajes[msg.author.id + msg.channel.id].CantidadDeMensajes += 1
      Mensajes[msg.author.id + msg.channel.id].Mensajes.push(msg.id)
      
      if (Mensajes[msg.author.id + msg.channel.id].CantidadDeMensajes >= 3 && !Mensajes[msg.author.id + msg.channel.id].MensajeEnviado) {
        
        msg.reply("Estás escribiendo muy rápido! Tomate un descanso del teclado.");
        
        Mensajes[msg.author.id + msg.channel.id].MensajeEnviado = true

        
        Mensajes[msg.author.id + msg.channel.id].Mensajes.forEach(IdC =>{
          msg.channel.fetchMessage(IdC)
          .then(Mensaje => Mensaje.delete())
          .catch();
        })
        
        msg.channel.overwritePermissions(msg.author.id, { 
          'SEND_MESSAGES': false
        })
        
        setTimeout(() => {
          msg.channel.replacePermissionOverwrites({
            "overwrites": msg.channel.permissionOverwrites.filter(o => o.id !== msg.author.id)
          });
          
          Mensajes[msg.author.id + msg.channel.id].MensajeEnviado = false;
          
        }, 10000);
        
      }
      
      setTimeout(() => {
        Mensajes[msg.author.id + msg.channel.id].CantidadDeMensajes -= 1;
        const index = Mensajes[msg.author.id + msg.channel.id].Mensajes.indexOf(msg.id);
        if (index > -1) {
          Mensajes[msg.author.id + msg.channel.id].Mensajes.splice(index, 1);
        }
        
      }, 3000)
      
      

    }
  }
  
  
  
  
  
  if (msg.content === "hhdid") {
    msg.channel.send(
      "```asciidoc\n== BOT COMANDOS ==\n[Prefix: " +
        process.env.botPrefix +
        "]\n\n== Comandos Admin ==\naddcoins @user <cantidad>\nremovecoins @user <cantidad>\n\n== Comandos Generales ==\n> perfil ó perfil @user\n> top\n> robar @user <cantidad>\n> apostar <cantidad>\n> trabajar\n> transferir @user <cantidad>\n```"
    );
  }
  
  
  
  sqlite.users.updateXP(msg.author.id, msg.guild.id, aleatorioEntreE(1, process.env.EXP_GANADA));
  let valid = await sqlite.users.getXP(msg.author.id, msg.guild.id);
  if (valid) {
    let xpLevel = Math.floor(0.1 * Math.sqrt(valid.xp + 1));
    let realLevel = valid.level;
    if (xpLevel > realLevel) {
      let member = msg.guild.member(msg.author)
      sqlite.users.updateLevel(msg.author.id, msg.guild.id, xpLevel);
      
        let nivel = xpLevel;
        /*
        switch (nivel) {
  
          case 1:
              member.addRole(process.env.ROLE_NIVEL_1)
            break; 
          case 2:
              member.addRole(process.env.ROLE_NIVEL_2)
              member.removeRole(process.env.ROLE_NIVEL_1)
            break;
          case 3:
              member.addRole(process.env.ROLE_NIVEL_3)
              member.removeRole(process.env.ROLE_NIVEL_2)
            break;
         case 4:
              member.addRole(process.env.ROLE_NIVEL_4)
              member.removeRole(process.env.ROLE_NIVEL_3)
            break;
         case 5:
              member.addRole(process.env.ROLE_NIVEL_5)
              member.removeRole(process.env.ROLE_NIVEL_4)
            break;
         case 6:
              member.addRole(process.env.ROLE_NIVEL_6)
              member.removeRole(process.env.ROLE_NIVEL_5)
            break;
         case 7:
              member.addRole(process.env.ROLE_NIVEL_7)
              member.removeRole(process.env.ROLE_NIVEL_6)
            break;
         case 8:
              member.addRole(process.env.ROLE_NIVEL_8)
              member.removeRole(process.env.ROLE_NIVEL_7)
            break;
         case 9:
              member.addRole(process.env.ROLE_NIVEL_9)
              member.removeRole(process.env.ROLE_NIVEL_8)
            break;
         case 10:
              member.addRole(process.env.ROLE_NIVEL_10)
              member.removeRole(process.env.ROLE_NIVEL_9)
            break;
            
          default:
            console.log('nada!');
        }
      */
        console.log(  "__**Un jugador ha subido de nivel**__\nFelicidades a <@" + msg.author.id + "> por haber subido al nivel **" + xpLevel + "**. ✨")
let canal = msg.guild.channels.get(CanalNiveles)
  let embed = new Discord.RichEmbed() 
  .setDescription(  "__**Un jugador ha subido de nivel**__\nFelicidades a <@" + msg.author.id + "> por haber subido al nivel **" + xpLevel + "**. ✨")
  .setColor(`RANDOM`)
  canal.send(embed);
    } 
  }  
  
  if (msg.mentions.members.some(Me => Me.roles.some(Ro => RolesSinMencion.indexOf(Ro.id) != -1)) && !msg.member.roles.some((R) => RolesByPassMayus.indexOf(R.id) != -1)&& msg.author.id != "") {
    
    const IdAutor = msg.author.id + msg.guild.id;
    if(!MensajesMencion[IdAutor]) MensajesMencion[IdAutor] = 1;
    else MensajesMencion[IdAutor] ++;
    
    if(MensajesMencion[IdAutor] >= 2){
    
      MensajesMencion--;
      
      msg.reply("No puedes tagear a un staff repetidas veces, crea un ticket de soporte si necesitas ayuda")
      msg.delete()
      
    }else{

      setTimeout(()=>{
        MensajesMencion--;
      }, 10000)
      
    }
    
  }
  
  if (!msg.content.startsWith(process.env.botPrefix)) return;
  let args = msg.content
    .slice(process.env.botPrefix.length)
    .trim()
    .split(/ +/g);
  let cmd = args.shift().toLowerCase();
  
//if (msg.author.id != "249500266628513794" && msg.author.id != "330238135629905921" && msg.author.id != "680486040351539241") return msg.channel.send("Bot en mantenimiento! Disculpe las molestias.");
  // Para sacar el mantenimiento simplemete pon // al inicio de la linea de arriba ^^
  // Cuando quieras volver a poner el mantenimiento borra los // del inicio de la linea
    
  
  
  
  
  // Command handler
  try {
    
    let cmdFile = require(`./cmds/${cmd}.js`);
    if (!cmdFile) return;
    
    // Comandos que se puede ejecutar en todos los canales
    const ComandosParaTodosLosCanales = [
      "ban",
      "mute",
      "unmute",
      "kick",
      "warn",
      "unban",
      "yt",
      "cerrarticket",
      "crearticket",
      "helptickets",
      "adduser",
      "removeuser",
      "verificar",
      "infoticket"
    ];
    
    
    const ByPass = ComandosParaTodosLosCanales.some(e => e == cmd);
    if (!ByPass && msg.channel.id != CanalComando && msg.author.id != "249500266628513794" && msg.author.id != "330238135629905921" &&!msg.member.roles.some((R) => RolesByPassMayus.indexOf(R.id) != -1) && msg.author.id !="471068281080512523"){
        var EmbedCanalInvalido = new Discord.RichEmbed()
        .setTitle("❗ Canal invalido")
    
    }
    
    if ((cmd == "crearticket" || cmd == "helptickets") && msg.channel.id != CanalTickets && msg.author.id != "330238135629905921" && msg.author.id != "249500266628513794"){
      var EmbedCanalInvalido = new Discord.RichEmbed()
        .setTitle("❗ Canal invalido")
        .setDescription(`El comando ${cmd} **no está disponible en ${msg.channel.name}**, úsalo en <#${CanalTickets}>`)
        .setColor("RANDOM");
        msg.channel.send(EmbedCanalInvalido);
        return;
    }
    
    // Borra el comando:
    // msg.delete();
    
    
    await cmdFile.run(client, msg, args);
    
    
    
    
    
  } catch (e) {
    
    console.error(e);
  } finally {
    console.log(`${msg.author.tag} ejecutó el comando ${cmd}`);
  }
});
// Errores no procesados
//process.on("unhandledRejection", (r, p) => {
//  console.log(true);
//});  

client.on('guildMemberAdd', member => {
  
  if(member.guild.id != ServidorId) return;
  
  const channel = member.guild.channels.get(CanalBienvenidas)
  // ya 
  const embed = new Discord.RichEmbed()
    .setThumbnail(client.user.avatarURL)
    .setAuthor("BIENVENIDAS" , client.user.avatarURL)
    .setTitle("👤 Nuevo usuario 👤")
    .setDescription(`Bienvenido/a ${member} a nuestro servidor ${member.guild.name}`)
    .addField("📋 Reglas 📋","<#732188348545761281>")
    .addField("IP:","mc.minechest.cf")
    .addField("Discord : ","https://discord.minechest.cf")
    .addField("Foro :","https://minechest.cf")
    .addField("Tienda :","Próximamente")
    .addField("ID", `${member.id}`)
    .setFooter("Sistema de bienvenida ")
    .setImage(member.user.avatarURL)
    .setTimestamp()
    .setColor("RANDOM")
  channel.send(embed)
});

client.on('raw', async dados => {
  if(dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
  if(dados.d.message_id != "732340078143209524") return
  
  let servidor = client.guilds.get("732187377493344257") // ID DE TU SERVIDOR
  let membro = servidor.members.get(dados.d.user_id)

  let rol1 = servidor.roles.get("724719987981418567") // ID DEL ROL1
  let rol2 = servidor.roles.get("732188323413622795")
  let rol3 = servidor.roles.get("732188333081624606")
  let rol4 = servidor.roles.get("732188321903542342")
  let rol5 = servidor.roles.get("732188322491006977")
  if(dados.t === "MESSAGE_REACTION_ADD"){
      if(dados.d.emoji.name === "🔔"){ // EMOJI QUE USARAS
          if(membro.roles.has(rol1)) return
          if(membro.roles.has(rol2)) return
          if(membro.roles.has(rol3)) return
          if(membro.roles.has(rol4)) return
          membro.addRole(rol1)
          membro.addRole(rol2)
          membro.addRole(rol3)
          membro.addRole(rol4)
          membro.removeRole(rol5)
      }
  }
  
});
client.on('messageUpdate', (oldMessage, newMessage) => {
  //Este es el evento cuando se actualiza un mensaje, el mensaje editado será "newMessage"
  if(newMessage.author.bot) return;
  //Si el usuario que editó el mensaje es un bug retornamos (importante para evitar errores)
    if (newMessage.member.hasPermission("ADMINISTRATOR")) return;
  //Con esto hacemos que si tiene permisos de administrador no le afecte
 if (newMessage.channel.id != "725773361107566712" && !newMessage.member.roles.has("724719985888329838")) {
   //Con esto podemos hacer que la moderación no afecte a canales o roles (todos los que quieras)
  if(newMessage.content.includes("https://") || newMessage.content.includes(".es") || newMessage.content.includes(".com") || newMessage.content.includes(".net") || newMessage.content.includes(".gg")) {
//Esto es lo que hace la automoderación
    newMessage.channel.send("No están permitidos los links en este servidor")
    //Mandamos un mensaje al canal del mensaje editado
      newMessage.delete(100);
    //Eliminamos el mensaje editado
    }
 }
});


/*

  client.on('guildMemberAdd', async member => {
    
    const createCaptcha = require('./captcha.js');

    const captcha = await createCaptcha();
    try {
      
      let embed = new Discord.RichEmbed()
      embed.setTitle(`Hola, ${member.user.tag}`)
      embed.setDescription("Este es tu captcha único. \n Para verificar su cuenta con el captcha, lea las letras y numeros de la imagen y vaya al canal de verificación y use ``!verify <codigo>``.")
      embed.attachFiles([{
        attachment: `${__dirname}/captchas/${captcha}.png`,
        name: `test.png`
      }])
      console.log(`attachment://${member.user.tag}.png`)
      //embed.setImage(`${__dirname}/captchas/${captcha}.png`)
      embed.setImage("attachment://test.png")

        const msg = await member.send(embed) 
        try {
          
            const filter = m => {
                if(m.author.bot) return;
                if(m.author.id === member.id && m.content === captcha) return true;
            };
          
            var MafiaCollectorMatar = new Discord.MessageCollector(msg.channel, m => !m.author.bot, {time: 60000, max: 1 });
            
            MafiaCollectorMatar.on("collect", async m =>{
              if(m.content == "!verify "+captcha){
                await member.addRoles('703372975126085653');
                
                      let embed2 = new Discord.RichEmbed()
                      embed2.setTitle(`Has sido verificado, ${member.user.tag}`)
                      embed2.setDescription("Su captcha ha sido verificado correctamente. \n Ahora puedes acceder a nuestro servidor!")
                      await member.send(embed2)
                return
//                await msg.channel.send('Verificado, correctamente.');
              }else{
                let embed3 = new Discord.RichEmbed()
                embed3.setDescription("Error, no te has verificado.\n Sal y vuelve a entrar.\n https://discord.gg/qg3nhBY")

                msg.channel.send(embed3)
              }
            })
            MafiaCollectorMatar.on("end", (r)=> {
                let embed4 = new Discord.RichEmbed()
                embed4.setDescription("El tiempo se ha acabado.\n Sal y vuelve a entrar.\n https://discord.gg/qg3nhBY")

              if(r.size == 0) msg.channel.send(embed4)
            })
  
          
        }catch(err) {
            console.log(err);
                        let embed6 = new Discord.RichEmbed()
      embed6.setDescription("Error, no te has verificado.");

            await msg.channel.send(embed6);
            await member.kick();
         //   await fs.unlink(`${__dirname}/captchas/${captcha}.png`)
           //         .catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
});
*/

client.login(process.env.botToken);
