const config = require('../../config.json');
const { Client, Collection,ActivityType, discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message } = require("discord.js");
const ms = require("ms")
const cooldown = new Collection()
const { Database } = require("st.db")
const setting = new Database("/database/settingsdata/setting")

module.exports = {
	name: Events.MessageCreate,
	execute: async(message) => {
        let client = message.client
        const transfer_room = setting.get(`transfer_room_${message.guild.id}`)
        const probot = setting.get(`probot_${message.guild.id}`)
        if(!probot && !transfer_room) return;
        if(message.channel.id == transfer_room) {
            if(message.author.id == client.user.id) return;
            if(message.author.id == probot) {
                if(message.content.includes("has transferred")) {
                    let line = setting.get(`line_${message.guild.id}`) ?? "https://cdn.discordapp.com/attachments/1139577442156150907/1198959664432427008/line.png?ex=660aa133&is=65f82c33&hm=1e224a538883fe1c2e0f631a32c81dd5bec9b7c6d1e1ad0d905d0fdec8bb835c&"
                    if(!line) line = `https://cdn.discordapp.com/attachments/1139577442156150907/1198959664432427008/line.png?ex=660aa133&is=65f82c33&hm=1e224a538883fe1c2e0f631a32c81dd5bec9b7c6d1e1ad0d905d0fdec8bb835c&`
                    message.channel.send({files:[
                        {
                            name:`line.png`,attachment:line
                        }
                    ]})
                }
                else{
                    setTimeout(() => {
                        try {
                            message.delete().catch(async() => {return;})
                        } catch (error) {
                            return
                        }
                    }, 15000);
                }
            }
        }
  
  }};
