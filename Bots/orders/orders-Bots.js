
  const { Client, Collection, discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message } = require("discord.js");
const { Database } = require("st.db")
const ordersDB = new Database("/Json-db/Bots/ordersDB.json")
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")

let orders = tokens.get('orders')
if(!orders) return;

const path = require('path');
const { readdirSync } = require("fs");
let theowner;
orders.forEach(async(data) => {
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v10');
  const { prefix , token , clientId , owner } = data;
  theowner = owner
  const client21 =new Client({intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember,]});
  client21.commands = new Collection();
  client21.setMaxListeners(1000)

  require(`./handlers/events`)(client21);
  client21.events = new Collection();
  require(`../../events/requireBots/orders-commands.js`)(client21);
  const rest = new REST({ version: '10' }).setToken(token);
  client21.on("ready" , async() => {

      try {
        await rest.put(
          Routes.applicationCommands(client21.user.id),
          { body: ordersSlashCommands },
          );
          
        } catch (error) {
          console.error(error)
        }

    });
    require(`../orders/handlers/events`)(client21)
    require(`../orders/handlers/orders-events`)(client21)
  const folderPath = path.join(__dirname, 'slashcommand21');
  client21.ordersSlashCommands = new Collection();
  const ordersSlashCommands = [];
  const ascii = require("ascii-table");
  const table = new ascii("orders commands").setJustify();
  for (let folder of readdirSync(folderPath).filter(
    (folder) => !folder.includes(".")
    )) {
      for (let file of readdirSync(`${folderPath}/` + folder).filter((f) =>
      f.endsWith(".js")
      )) {
        let command = require(`${folderPath}/${folder}/${file}`);
        if (command) {
          ordersSlashCommands.push(command.data.toJSON());
          client21.ordersSlashCommands.set(command.data.name, command);
          if (command.data.name) {
            table.addRow(`/${command.data.name}`, "🟢 Working");
          } else {
            table.addRow(`/${command.data.name}`, "🔴 Not Working");
          }
        }
  }
}



const folderPath2 = path.join(__dirname, 'commands21');

for(let foldeer of readdirSync(folderPath2).filter((folder) => !folder.includes("."))) {
  for(let fiee of(readdirSync(`${folderPath2}/${foldeer}`).filter((fi) => fi.endsWith(".js")))) {
    const commander = require(`${folderPath2}/${foldeer}/${fiee}`)
  }
}

require(`../../events/requireBots/orders-commands.js`)(client21)
require("./handlers/events")(client21)

	for (let file of readdirSync('./events/').filter(f => f.endsWith('.js'))) {
		const event = require(`./events/${file}`);
	if (event.once) {
		client21.once(event.name, (...args) => event.execute(...args));
	} else {
		client21.on(event.name, (...args) => event.execute(...args));
	}
	}

client21.on('ready' , async() => {
  setInterval(async() => {
    let BroadcastTokenss = tokens.get(`orders`)
    let thiss = BroadcastTokenss.find(br => br.token == token)
    if(thiss) {
      if(thiss.timeleft <= 0) {
        await client21.destroy();
        console.log(`${clientId} Ended`)
      }
    }
  }, 1000);
})




  client21.on("interactionCreate" , async(interaction) => {
    if (interaction.isChatInputCommand()) {
      
	    if(interaction.user.bot) return;

      
      const command = client21.ordersSlashCommands.get(interaction.commandName);
	    
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



   client21.login(token)
   .catch(async(err) => {
    const filtered = orders.filter(bo => bo != data)
			await tokens.set(`orders` , filtered)
      console.log(`${clientId} Not working and removed `)
   });















































})
