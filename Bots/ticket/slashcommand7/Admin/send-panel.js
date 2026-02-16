const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle,StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const { Database } = require("st.db")
const settings = require("../../../../database/settings")
const managers = require("../../../../database/managers")
const panels = require("../../../../database/panels")
let ticketDB = new Database("/Json-db/Bots/ticketDB")
module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('send-panel')
    .setDescription('ارسال بانل التكت'), // or false
async execute(interaction) {
    let reply = await interaction.deferReply({ephemeral:true})
   let guilddata = await settings.findOne({guildid:interaction.guild.id})
   let panelsRoom = guilddata.panelsRoom;
   let transcripts = guilddata.transcripts;
   let paneltext = guilddata.paneltext;
    if(!guilddata || !panelsRoom || !transcripts || !paneltext) return interaction.editReply({content:`**لم يتم تحديد الاعدادات**`})
    let panelroom = await interaction.guild.channels.cache.find(i => i.id == panelsRoom)
    if (!panelroom) return interaction.editReply({content:`**لا استطيع العثور على روم البانل**`})
    let panelsFind = await panels.find({guildid:interaction.guild.id})
if(!panelsFind) return interaction.editReply({content:`**لم يتم وضع اي بانل في النظام**`})
if(panelsFind.length <= 0) return interaction.editReply({content:`**لم يتم وضع اي بانل في النظام**`})
    const select = new StringSelectMenuBuilder()
    .setCustomId('tickt_select')
    .setPlaceholder('Select Problem Type !')
        panelsFind.forEach(async(panel) => {
            const {panelName , panelDescription , panelId} = panel;
            select.addOptions(
                new StringSelectMenuOptionBuilder()
                .setLabel(`${panelName}`)
                .setDescription(`${panelDescription}`)
                .setValue(`${panelId}`),
            )
        })
        let embed1 = new EmbedBuilder()
        .setTitle(`**بانل فتح تــكـــت**`)
        .setDescription(`${paneltext}`)
        .setTimestamp()
        .setThumbnail(interaction.guild.iconURL({dynamic:true}))
    const row = new ActionRowBuilder()
    .addComponents(select);
    await panelroom.send({embeds:[embed1],components:[row]})
    return interaction.editReply({content:`**تم ارسال البانل بنجاح**`}) 
}
}