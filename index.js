const { Client, Collection, discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message } = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember,]});
const { readdirSync } = require("fs")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const mongodb = require('mongoose');
const { token , prefix , owner , mainguild , database} = require(`./config.json`)
const ascii = require('ascii-table');
client.login(process.env.TOKEN).catch(err => console.log('Token are not working'));
client.commandaliases = new Collection()
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
client.setMaxListeners(1000)
module.exports = client;
client.on("ready", async () => {
	try {
		await rest.put(
			Routes.applicationCommands(client.user.id),
			{ body: slashcommands },
		);
	} catch (error) {
		console.error(error);
	}
	await mongodb.connect(database , {
	}).then(async()=> {
		console.log('🟢 Connected To Database Successfully 🟢')
	}).catch(()=> {
		console.log(`🔴 Failed Connect To Database 🔴`)
	});
    console.log(`Done set everything`);
	
})
client.slashcommands = new Collection()
const slashcommands = [];
const table = new ascii('Owner Commands').setJustify();
for (let folder of readdirSync('./ownerOnly/').filter(folder => !folder.includes('.'))) {
  for (let file of readdirSync('./ownerOnly/' + folder).filter(f => f.endsWith('.js'))) {
	  let command = require(`./ownerOnly/${folder}/${file}`);
	  if(command) {
		  slashcommands.push(command.data.toJSON());
  client.slashcommands.set(command.data.name, command);
		  if(command.data.name) {
			  table.addRow(`/${command.data.name}` , '🟢 Working')
		  }
		  if(!command.data.name) {
			  table.addRow(`/${command.data.name}` , '🔴 Not Working')
		  }
	  }
  }
}
console.log(table.toString())
for (let folder of readdirSync('./events/').filter(folder => !folder.includes('.'))) {
	for (let file of readdirSync('./events/' + folder).filter(f => f.endsWith('.js'))) {
		const event = require(`./events/${folder}/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
	}
  }
  for (let folder of readdirSync('./buttons/').filter(folder => !folder.includes('.'))) {
	for (let file of readdirSync('./buttons/' + folder).filter(f => f.endsWith('.js'))) {
		const event = require(`./buttons/${folder}/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
	}
  }
  //
  for(let file of readdirSync('./database/').filter(file => file.endsWith('.js'))) {
	const reuirenation = require(`./database/${file}`)
  }
  for (let folder of readdirSync('./premiumBots/').filter(folder => !folder.includes('.'))) {
	for (let file of readdirSync('./premiumBots/' + folder).filter(f => f.endsWith('.js'))) {
		const event = require(`./premiumBots/${folder}/${file}`);
	}
  }
  for (let folder of readdirSync('./premiumBots/').filter(folder => folder.endsWith('.js'))) {
		const event = require(`./premiumBots/${file}`);
	}
	for (let folder of readdirSync('./ultimateBots/').filter(folder => !folder.includes('.'))) {
		for (let file of readdirSync('./ultimateBots/' + folder).filter(f => f.endsWith('.js'))) {
			const event = require(`./ultimateBots/${folder}/${file}`);
		}
	  }
	  for (let folder of readdirSync('./ultimateBots/').filter(folder => folder.endsWith('.js'))) {
			const event = require(`./ultimateBots/${file}`);
		}
for (let folder of readdirSync('./Bots/').filter(folder => !folder.includes('.'))) {
	for (let file of readdirSync('./Bots/' + folder).filter(f => f.endsWith('.js'))) {
		const event = require(`./Bots/${folder}/${file}`);
	}
  }
process.on('uncaughtException', (err) => {
  console.log(err)
});
process.on('unhandledRejection', (reason, promise) => {
 console.log(reason)
});
 process.on("uncaughtExceptionMonitor", (reason) => { 
	console.log(reason)
});