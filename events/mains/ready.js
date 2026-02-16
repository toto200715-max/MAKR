const { Client, Collection,ActivityType, discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message } = require("discord.js");
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		client.user.setStatus('online')
		console.log(`Ready! Logged in as ${client.user.tag} , My ID : ${client.user.id}`);
		let activities = [ `I'm Bot Maker !`, `Using / Commands` ], i = 0;  
    setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`, type: ActivityType.Listening }), 5000);
	},
};