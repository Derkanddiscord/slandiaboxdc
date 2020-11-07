exports.run = async (client, message, args) => {
  if (message.author.id != "330238135629905921" && message.author.id !="249500266628513794") return
  const Tickets = require("../tickets/tickets.js")
  Tickets.reiniciarTickets();
  
  message.channel.send("✅ Tickets reiniciados correctamente.")
  
}