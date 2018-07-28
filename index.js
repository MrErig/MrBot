const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

//commands

fs.readdir("./Commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("couldn't find commands.");
  }

jsfile.forEach((f, i) =>{
  let props = require(`./commands/${f}`);
  console.log(`${f} ready!`);
  bot.commands.set(props.help.name, props);
})

})

//bot Aktivität und display

bot.on("ready", async () => {
  console.log(`${bot.user.username} is well and kicking it!`);
bot.user.setActivity("over you", {type: "WATCHING"});

});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);


//Server display status undson shit

  if(cmd === `${prefix}server`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#f4425f")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }


//info tab for the bot

  if(cmd === `${prefix}info`){

    let bicon = bot.user.displayAvatarURL;

    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#f4425f")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Version", botconfig.version)
    .addField("Created On", botconfig.created)
    .addField("Created By", botconfig.creator);

    return message.channel.send(botembed);
  }

  //report user (hab ne eigene Command .js file)

  //if(cmd === `${prefix}report`){

    //let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    //if(!rUser) return message.channel.send("That didn't work.");
    //let reason = args.join(" ").slice(22);

    //let reportEmbed = new Discord.RichEmbed()
    //.setDescription("Reports")
    //.setColor("#f4425f")
    //.addField("Reported User", `${rUser} with ID ${rUser.id}`)
    //.addField("Reported By", `${message.author} with ID ${message.author.id}`)
    //.addField("Channel", message.channel)
    //.addField("Time", message.createdAt)
    //.addField("Reason", reason);

    //let reportschannel = message.guild.channels.find(`name`,`reports`);
    //if(!reportschannel) return message.channel.send("Couldn't find reports channel.");

    //message.delete().catch(O_o=>{});
    //reportschannel.send(reportEmbed);

    //return;
  //}


//simple speech commands

  if(cmd ===`${prefix}drink`){
    return message.channel.send("Cheers!")
  }

  if(cmd ===`${prefix}howareyou`){
    return message.channel.send(`I'm fine, how about you?`)
  }

  if(cmd ===`${prefix}fine`){
    return message.channel.send(`Splendid!`)
  }

  if(cmd ===`${prefix}no`){
    return message.channel.send(`May I ask, why "no"?`)
  }

  if(cmd ===`${prefix}bye`){
    return message.channel.send(`Until we meet again!`)
  }

  if(cmd ===`${prefix}hello`){
    return message.channel.send(`I'm pleased to meet you, Sir!`)
  }

  if(cmd ===`${prefix}daddybelly`){
    return message.channel.send(`https://i.imgur.com/JIQD6Dp.jpg`)
    let otherembed = new Discord.RichEmbed();

  }

  if(cmd ===`${prefix}tara`){
    return message.channel.send(`https://imgur.com/hMfCqv2`)
    let otherembed = new Discord.RichEmbed();
  }

  if(cmd ===`${prefix}clock`){
    return message.channel.send(`I suppose one can look at the clock by themselves, Sir.`)
  }
// Vorlage message.channel.send(`Congrats to <@${rMember.id}>
});

bot.login(botconfig.token);
