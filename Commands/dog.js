
//braucht diese files um zu funktionieren

const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot,message,args) => {

//"body" muss definiert sein. (Auf der Seite ist das Bild im "Body" part des codes (html))

  let {body} = await superagent
  .get(`https://random.dog/woof.json`);

//Discord embed sieht einfach schöner aus als eine normale Nachricht

  let dogembed = new Discord.RichEmbed()

//Farbe des Balkens außen

  .setColor("#F0E68C")
  .setTitle(":dog:")
  .setImage(body.url);

//Reaktion auf den Befehl #dog

  message.channel.send(dogembed);

}

module.exports.help = {
  name: "dog"
}
