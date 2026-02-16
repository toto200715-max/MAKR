const { Client, Collection,ActivityType, discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message } = require("discord.js");
let {mainguild} = require('../../config.json')
const ms = require("ms")
const cooldown = new Collection()
const { Database } = require("st.db")
const setting = new Database("/database/settingsdata/setting")

module.exports = {
	name: Events.MessageCreate,
	execute: async(message) => {
        if(message.guild.id == mainguild) {
            
            if(message.content.includes('type these numbers to confirm')) {
                
            const probot = setting.get(`probot_${message.guild.id}`)
            if(!probot) return;
            if(message.author.id == probot) {
                const transfer_room = setting.get(`transfer_room_${message.guild.id}`)
                if(!transfer_room) return;
                if(message.channel.id == transfer_room) return;
                if(message.channel.id == "1160236978390974607") return; 
                    await message.delete();
                    const theLastMessage = message.channel.messages.cache.last();
                    return theLastMessage.reply({content:`**جميع التحويلات تكون في روم <#${transfer_room}> فقط**`})
                }
            }
        }
        
  }};
