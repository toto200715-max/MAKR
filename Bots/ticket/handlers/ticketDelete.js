const { SlashCommandBuilder,Events , ActivityType,ModalBuilder,TextInputStyle, EmbedBuilder , PermissionsBitField,ButtonStyle, TextInputBuilder, ActionRowBuilder,ButtonBuilder,MessageComponentCollector, Embed } = require("discord.js");
const settings = require("../../../database/settings")
const managers = require("../../../database/managers")
const { Database } = require("st.db")
const ticketsManager = new Database("/Json-db/Bots/ticketDB.json")
const discordTranscripts = require('discord-html-transcripts');
module.exports = (client7) => {
  client7.on(Events.InteractionCreate , async(interaction) =>{
    if(interaction.isButton()) {
      let guilddata = await settings.findOne({guildid:interaction.guild.id})
      let panelsRoom = guilddata.panelsRoom;
      let transcripts = guilddata.transcripts;
      let paneltext = guilddata.paneltext;
       if(!guilddata || !panelsRoom || !transcripts || !paneltext) return interaction.editReply({content:`**لم يتم تحديد الاعدادات**`})
      if(interaction.customId == "delete_ticket") {
            let deleteembed = new EmbedBuilder()
            .setTitle(`**سيتم حذف التكت بعد 5 ثواني**`)
            await interaction.reply({embeds:[deleteembed]})
            if(transcripts) {
            interaction.channel.messages.fetch().then(async(messages) => {
              await interaction.channel.messages.fetch()
              const channel = interaction.channel;
              const attachment = await discordTranscripts.createTranscript(channel , {poweredBy:false,footerText:`Ticket Bot By Bahama Ultimate`});
                const embed = new EmbedBuilder()
                .setTitle(`**Transcripts For : ${interaction.channel.name}**`)
                const thechannel = interaction.guild.channels.cache.find(ch => ch.id == transcripts)
                try {
                  thechannel.send({embeds:[embed] , files:[attachment]})
                } catch (error) {
                  setTimeout(() => {
                    return interaction.channel.delete();
                }, 5000);
                }
            })
            setTimeout(() => {
                return interaction.channel.delete();
            }, 5000);
        }
      }
    }
  }
  )}