const Discord = require("discord.js");
module.exports.run = async (client, message, args, msg) => {
  
 
const Discord = require("discord.js");

async function mines() {
  const choices = [
    "||:one:||",
    ...Array(5).fill("||:two:||"),
    ...Array(2).fill("||:bomb:||"),
    ...Array(5).fill("||:zero:||")
  ];

  const generateChoice = () =>
    choices[Math.floor(Math.random() * choices.length)];

  const generateGrid = (width, height) => {
    return Array(height)
      .fill(Array(width))
      .map(arr => arr.fill([]).map(generateChoice));
  };

  const generated = generateGrid(10, 10);
  let whatToSend = generated.map(arr => arr.join(" ")).join("\n");
  return message.channel.send(whatToSend);
}
mines();
}