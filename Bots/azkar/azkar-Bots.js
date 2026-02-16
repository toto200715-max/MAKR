
const { Client, Collection,ChannelType ,SlashCommandBuilder, GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder , ButtonStyle , Message, Embed,PermissionsBitField } = require("discord.js")
const { Database } = require("st.db")
const azkarDB = new Database("/Json-db/Bots/azkarDB.json")
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")

let moment = require('moment');
const ms = require("ms")
const buyCooldown = new Collection()
let azkar = tokens.get('azkar')
if(!azkar) return;

const path = require('path');
const { readdirSync } = require("fs");
const client = require("../../index.js")
let theowner;
azkar.forEach(async(data) => {
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v10');
  const { prefix , token , clientId , owner } = data;
  theowner = owner
  const client23 = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember,]});
  client23.commands = new Collection();
  client23.setMaxListeners(1000)
  require(`./handlers/events.js`)(client23);
  client23.events = new Collection();
  require(`../../events/requireBots/azkar-commands.js`)(client23);
  const rest = new REST({ version: '10' }).setToken(token);
  client23.on("ready" , async() => {

      try {
        await rest.put(
          Routes.applicationCommands(client23.user.id),
          { body: azkarSlashCommands },
          );
          
        } catch (error) {
          console.error(error)
        }

    });
    require(`./handlers/events.js`)(client23)
  const folderPath = path.join(__dirname, 'slashcommand23');
  client23.azkarSlashCommands = new Collection();
  const azkarSlashCommands = [];
  const ascii = require("ascii-table");
  const table = new ascii("azkar commands").setJustify();
  for (let folder of readdirSync(folderPath).filter(
    (folder) => !folder.includes(".")
    )) {
      for (let file of readdirSync(`${folderPath}/` + folder).filter((f) =>
      f.endsWith(".js")
      )) {
        let command = require(`${folderPath}/${folder}/${file}`);
        if (command) {
          azkarSlashCommands.push(command.data.toJSON());
          client23.azkarSlashCommands.set(command.data.name, command);
          if (command.data.name) {
            table.addRow(`/${command.data.name}`, "🟢 Working");
          } else {
            table.addRow(`/${command.data.name}`, "🔴 Not Working");
          }
        }
  }
}

let commandsDir2 = path.join(__dirname);
client23.commands = new Collection()
const commands = [];
const table2 = new ascii('Prefix Commands').setJustify();
for (let folder of readdirSync(commandsDir2+`/commands23`).filter(f => f.endsWith(`.js`))) {
	  let command = require(`${commandsDir2}/commands23/${folder}`);
	  if(command) {
		commands.push(command);
  client23.commands.set(command.name, command);
		  if(command.name) {
			  table2.addRow(`${prefix}${command.name}` , '🟢 Working')
		  }
		  if(!command.name) {
			  table2.addRow(`${prefix}${command.name}` , '🔴 Not Working')
		  }
	  }
}


require(`../../events/requireBots/azkar-commands.js`)(client23)
require("./handlers/events.js")(client23)

	for (let file of readdirSync('./events/').filter(f => f.endsWith('.js'))) {
		const event = require(`./events/${file}`);
	if (event.once) {
		client23.once(event.name, (...args) => event.execute(...args));
	} else {
		client23.on(event.name, (...args) => event.execute(...args));
	}
	}

client23.on("messageCreate" , async(message) => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  if(!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g); 
  const cmd = args.shift().toLowerCase();
  if(cmd.length == 0 ) return;
    if(!client23.commands.has(cmd)) return;
  let command = client23.commands.get(cmd)
  if(!command) command = client23.commands.get(client23.commandaliases.get(cmd));

  if(command) {
    if(command.cooldown) {
        
      if(cooldown.has(`${command.name}${message.author.id}`)) return message.reply({ embeds:[{description:`**عليك الانتظار\`${ms(cooldown.get(`${command.name}${message.author.id}`) - Date.now(), {long : true}).replace("minutes", `دقيقة`).replace("seconds", `ثانية`).replace("second", `ثانية`).replace("ms", `ملي ثانية`)}\` لكي تتمكن من استخدام الامر مجددا.**`}]}).then(msg => setTimeout(() => msg.delete(), cooldown.get(`${command.name}${message.author.id}`) - Date.now()))
      command.run(client, message, args)
      cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
      setTimeout(() => {
        cooldown.delete(`${command.name}${message.author.id}`)
      }, command.cooldown);
  } else {
    command.run(client, message, args)
  }
}});



  client23.on("interactionCreate" , async(interaction) => {
    if (interaction.isChatInputCommand()) {
      
	    if(interaction.user.bot) return;

      
      const command = client23.azkarSlashCommands.get(interaction.commandName);
	    
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

  
  client23.on("ready" , async() => {
    setInterval(() => {
      client23.guilds.cache.forEach(async(guild) => {
        let theAzkarRoom = await azkarDB.get(`azkar_room_${guild.id}`)
        if(!theAzkarRoom) return;
        let theRoom = await guild.channels.cache.find(ch => ch.id == theAzkarRoom)
        let {azkar} = require(`./azkarData/azkar.json`)
        let randomNum = Math.floor(Math.random() * azkar.length)
        let randomZekr = azkar[randomNum]
        let embed1 = new EmbedBuilder()
        .setTitle(`**عطروا افواهكم بذكر الله**`)
        .setColor(`Aqua`)
        .setTimestamp()
        .setFooter({text:`الأذكــار`})
        .setThumbnail(`https://cdn.discordapp.com/attachments/1199738679434948679/1217330321821794364/413660444a08ef90.png?ex=6603a235&is=65f12d35&hm=8eb1b7729e68d72ea4704a7816c437ac9a233f628dedfd51b1ed991601c47c95&`)
        .setDescription(`**\`\`\`${randomZekr}\`\`\`**`)
        await theRoom.send({embeds:[embed1]}).catch(async() => {return;})
        //-
        let thePrayersRoom = await azkarDB.get(`prayers_room_${guild.id}`)
        if(!thePrayersRoom) return;
        let theRoom2 = await guild.channels.cache.find(ch => ch.id == thePrayersRoom)
        let {prayers} = require(`./azkarData/prayers.json`)
        let randomNum2 = Math.floor(Math.random() * prayers.length)
        let randomPrayer = azkar[randomNum2]
        let embed2 = new EmbedBuilder()
        .setTitle(`**اَلدُّعَاءُ في الإسلام هي عبادة**`)
        .setColor(`Aqua`)
        .setTimestamp()
        .setFooter({text:`اَلأدُّعَــيــة`})
        .setThumbnail(`https://cdn.discordapp.com/attachments/1199738679434948679/1217333005161463818/572c358efbc6e643.png?ex=6603a4b5&is=65f12fb5&hm=c11e798d22c9d471f0d7999de21e4af2efb7cbc0e5232d590c6094fd1e1d01c5&`)
        .setDescription(`**\`\`\`${randomPrayer}\`\`\`**`)
        await theRoom.send({embeds:[embed2]}).catch(async() => {return;})
        //-
        let theVersesRoom = await azkarDB.get(`verse_${guild.id}`)
        if(!theVersesRoom) return;
        let theRoom3 = await guild.channels.cache.find(ch => ch.id == theVersesRoom)
        let {verses} = require(`./azkarData/verses.json`)
        let randomNum3 = Math.floor(Math.random() * verses.length)
        let randomVerse = verses[randomNum3]
        let embed3 = new EmbedBuilder()
        .setTitle(`**أبتدئ قراءة القرآن باسم الله مستعينا به**`)
        .setColor(`Aqua`)
        .setTimestamp()
        .setFooter({text:`الأيـــات`})
        .setThumbnail(`https://cdn.discordapp.com/attachments/1199738679434948679/1217339538372821002/9840c96d8ba4bfdf.png?ex=6603aacb&is=65f135cb&hm=ae11888e5cc8d1e36c9c9158f20ae50edaa1d344bbaa601a3ee553d5d635678d&`)
        .setDescription(`**\`\`\`${randomVerse}\`\`\`**`)
        await theRoom3.send({embeds:[embed3]}).catch(async() => {return;})
        //-
        let theInfoRoom = await azkarDB.get(`verse_${guild.id}`)
        if(!theInfoRoom) return;
        let theRoom4 = await guild.channels.cache.find(ch => ch.id == theInfoRoom)
        let {information} = require(`./azkarData/information.json`)
        let randomNum4 = Math.floor(Math.random() * information.length)
        let randomInfo = information[randomNum4]
        let embed4 = new EmbedBuilder()
        .setTitle(`**زود ثقافتك بمعرفة دينك**`)
        .setColor(`Aqua`)
        .setTimestamp()
        .setFooter({text:`الـمـعـلومـات الـديـنـيـة`})
        .setThumbnail(`https://cdn.discordapp.com/attachments/1199738679434948679/1217344642178088990/info.png?ex=6603af8b&is=65f13a8b&hm=75c999665998fcabdd8cd8b1e2025fc3850649e4dedc4d6e02d6ca41136723bb&`)
        .setDescription(`**\`\`\`${randomInfo}\`\`\`**`)
        await theRoom3.send({embeds:[embed4]}).catch(async() => {return;})
      })
    },  1000 * 60 * 60);
  })


   client23.login(token)
   .catch(async(err) => {
    const filtered = azkar.filter(bo => bo != data)
			await tokens.set(`azkar` , filtered)
      console.log(`${clientId} Not working and removed `)
   });


})
