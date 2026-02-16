
  const { Client, Collection, discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message } = require("discord.js");
const { Database } = require("st.db")
const creditDB = new Database("/Json-db/Bots/creditDB.json")
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")
const Captchas = [
 {
  captcha:`https://cdn.discordapp.com/attachments/1150814807839228036/1222429070583922749/captcha.png?ex=66162eca&is=6603b9ca&hm=6ce3a49747c714088534e78c71eb57b3314313824fc4130302d05405868d6204&`,
  number:13970
 },
 {
  captcha:`https://cdn.discordapp.com/attachments/1150814807839228036/1222429178721210368/captcha.png?ex=66162ee3&is=6603b9e3&hm=90920e44b579adde70dff5353c8cb12e41366d14b542f4bae6d2ec8a3f1d21e1&`,
  number:45467
 },
 {
  captcha:`https://cdn.discordapp.com/attachments/1150814807839228036/1222429290289692732/captcha.png?ex=66162efe&is=6603b9fe&hm=c4c74e36285818436df760e98e2e87dfeab002933cd22f7f9a3a42b08965aa71&`,
  number:42349
 },
 {
  captcha:`https://cdn.discordapp.com/attachments/1150814807839228036/1222429380303917118/captcha.png?ex=66162f13&is=6603ba13&hm=9cd1dd30f7c28937f50a496bce9229ec900b04c8496e5f4cfea5dcc6453d036a&`,
  number:76012
 }
]
function getCaptcha() {
  const randomCaptcha = Math.floor(Math.random() * Captchas.length);
  const randomCaptcha2 = Captchas[randomCaptcha];
  const captcha = randomCaptcha2.captcha;
  const number = randomCaptcha2.number;
  return { captcha, number};
}
let credit = tokens.get('credit')
if(!credit) return;

const path = require('path');
const { readdirSync } = require("fs");
let theowner;
credit.forEach(async(data) => {
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v10');
  const { prefix , token , clientId , owner } = data;
  theowner = owner
  const client16 = new Client({intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember,]});
  client16.commands = new Collection();
  client16.setMaxListeners(1000)

  require(`./handlers/events`)(client16);
  client16.events = new Collection();
  require(`../../events/requireBots/credit-commands`)(client16);
  const rest = new REST({ version: '10' }).setToken(token);
  client16.on("ready" , async() => {

      try {
        await rest.put(
          Routes.applicationCommands(client16.user.id),
          { body: creditSlashCommands },
          );
          
        } catch (error) {
          console.error(error)
        }

    });
    require(`./handlers/events`)(client16)

  const folderPath = path.join(__dirname, 'slashcommand16');
  client16.creditSlashCommands = new Collection();
  const creditSlashCommands = [];
  const ascii = require("ascii-table");
  const table = new ascii("credit commands").setJustify();
  for (let folder of readdirSync(folderPath).filter(
    (folder) => !folder.includes(".")
    )) {
      for (let file of readdirSync(`${folderPath}/` + folder).filter((f) =>
      f.endsWith(".js")
      )) {
        let command = require(`${folderPath}/${folder}/${file}`);
        if (command) {
          creditSlashCommands.push(command.data.toJSON());
          client16.creditSlashCommands.set(command.data.name, command);
          if (command.data.name) {
            table.addRow(`/${command.data.name}`, "🟢 Working");
          } else {
            table.addRow(`/${command.data.name}`, "🔴 Not Working");
          }
        }
  }
}



const folderPath2 = path.join(__dirname, 'commands16');

for(let foldeer of readdirSync(folderPath2).filter((folder) => !folder.includes("."))) {
  for(let fiee of(readdirSync(`${folderPath2}/${foldeer}`).filter((fi) => fi.endsWith(".js")))) {
    const commander = require(`${folderPath2}/${foldeer}/${fiee}`)
  }
}

require(`../../events/requireBots/credit-commands`)(client16)
require("./handlers/events")(client16)

	for (let file of readdirSync('./events/').filter(f => f.endsWith('.js'))) {
		const event = require(`./events/${file}`);
	if (event.once) {
		client16.once(event.name, (...args) => event.execute(...args));
	} else {
		client16.on(event.name, (...args) => event.execute(...args));
	}
	}




  client16.on("interactionCreate" , async(interaction) => {
    if (interaction.isChatInputCommand()) {
      
	    if(interaction.user.bot) return;

      
      const command = client16.creditSlashCommands.get(interaction.commandName);
	    
      if (!command) {
        return;
      }
      if (command.ownersOnly === true) {
        if (owner != interaction.user.id) {
          return interaction.reply({content: `❗ ***لا تستطيع استخدام هذا الامر***`, ephemeral: true});
        }
      }
      try {

        await command.execute(interaction);
      } catch (error) {
			return
		}
    }
  } )

client16.on("messageCreate" , async(message) => {
  if(message.author.bot) return;
  if(message.content.startsWith(`${prefix}credit`) || message.content.startsWith(`${prefix}credits`) || message.content.startsWith(`c`)) {
    let userCredits = creditDB.get(`credits_${message.author.id}_${message.guild.id}`)
    if(!userCredits) {
        await creditDB.set(`credits_${message.author.id}_${message.guild.id}` , 0)
    }
    userCredits = creditDB.get(`credits_${message.author.id}_${message.guild.id}`)
    let userId = message.content.split(" ")[1]
    if(!userId) {
      return message.reply({content:`**:bank: |  ${message.author.username}, your account balance is \`$${userCredits}\`.**`})
    }
    let user = message.mentions.members.first() ?? await client16.users.fetch(userId)
    let amount = message.content.split(" ")[2]
    if(!amount) {
      let user2Credits = creditDB.get(`credits_${user.id ?? user.user.id}_${message.guild.id}`)
    if(!user2Credits) {
        await creditDB.set(`credits_${user.id ?? user.user.id}_${message.guild.id}` , 0)
    }
    user2Credits = creditDB.get(`credits_${user.id ?? user.user.id}_${message.guild.id}`)
      return message.reply({content:`**${user.username ?? user.user.username} :credit_card: balance is \`$${user2Credits}\`.**`})
    }
    let user2Credits = creditDB.get(`credits_${user.id ?? user.user.id}_${message.guild.id}`)
    if(!user2Credits) {
        await creditDB.set(`credits_${user.id ?? user.user.id}_${message.guild.id}` , 0)
    }
    user2Credits = creditDB.get(`credits_${user.id ?? user.user.id}_${message.guild.id}`)
    if(amount > userCredits) return message.reply({content:`**:thinking: | r9_9, Your balance is not enough for that!**`})
    const theTax = Math.floor(parseInt(amount) * (5 / 100))
    const theFinal = parseInt(amount) - parseInt(theTax)
    const theFinalNum = theFinal
    const randomCaptcha = getCaptcha();
    let {captcha , number} = randomCaptcha;
    let messageReply = await message.reply({content:`** ${message.author.username}, Transfer Fees: \`${theTax}\`, Amount :\`$${theFinalNum}\`**\ntype these numbers to confirm :` , files:[{name:`captcha.png` , attachment:`${captcha}`}]})
   setTimeout(() => {
    try {
      messageReply.delete().catch(async() => {return;});
    } catch  {
      return;
    }
   }, 15 * 1000);
    const filter = ((m => m.author.id == message.author.id))
    const messageCollect = message.channel.createMessageCollector({
      filter:filter,
      time:15 * 1000,
      max:1
    })
    messageCollect.on("collect" , async(msg) => {
      try {
      if(msg.content == number) {
        let newUser1 = parseInt(userCredits) - parseInt(amount)
        let newUser2 = parseInt(userCredits) + parseInt(theFinalNum)
        await creditDB.set(`credits_${user.id ?? user.user.id}_${message.guild.id}` , newUser2)
        await creditDB.set(`credits_${message.author.id}_${message.guild.id}` , newUser1)
        await msg.reply({content:`**:moneybag: | ${message.author.username}, has transferred \`$${theFinalNum}\` to ${user}**`})
        await messageReply.delete();
        return msg.delete();  
      }else {
        await messageReply.delete().catch(async() => {return;});
       return msg.delete().catch(async() => {return;});
      }
    } catch {
        return;
      }
    })
  }
  })



   client16.login(token)
   .catch(async(err) => {
    const filtered = credit.filter(bo => bo != data)
			await tokens.set(`credit` , filtered)
      console.log(`${clientId} Not working and removed `)
   });


})
