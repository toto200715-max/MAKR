const { SlashCommandBuilder,Events , ActivityType,ModalBuilder,TextInputStyle, EmbedBuilder , PermissionsBitField,ButtonStyle, TextInputBuilder, ActionRowBuilder,ButtonBuilder,MessageComponentCollector, Embed } = require("discord.js");
const { Database } = require("st.db")
const settings = require("../../../database/settings")
const managers = require("../../../database/managers")
const panels = require("../../../database/panels")
let ticketDB = new Database("/Json-db/Bots/ticketDB")
const ticketsManager = new Database("/Json-db/Bots/ticketDB.json")
module.exports = (client7) => {
    client7.on(Events.InteractionCreate , async(interaction) =>{
    if(interaction.isModalSubmit()) {
        let guilddata = await settings.findOne({guildid:interaction.guild.id})
        let panelsRoom = guilddata.panelsRoom;
        let transcripts = guilddata.transcripts;
        let paneltext = guilddata.paneltext;
        if(!guilddata || !panelsRoom || !transcripts || !paneltext) return interaction.reply({content:`**لم يتم تحديد الاعدادات**` , ephemeral:true})
        await interaction.deferReply({ephemeral:true})
            let panelFind = await panels.find({guildid:interaction.guild.id , panelId:interaction.customId})
        if(!panelFind) return interaction.reply({content:`**لم استطيع العثور على البانل**` , ephemeral:true})
        let {panelCategory , panelRole , panelWelcome ,panelName , panelDescription , panelNumber , panelId} = panelFind[0];
        let thereason = interaction.fields.getTextInputValue(`reason`)
            let theticket = await interaction.guild.channels.create({
                name:`ticket-${panelNumber}`,
                parent:`${panelCategory}`,
                permissionOverwrites:[
                    {
                        id:interaction.guild.id,
                        deny:[PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id:interaction.user.id,
                        allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id:panelRole,
                        allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                    }
                ]
            })
            await interaction.editReply({content:`${theticket}`})
            let openembed = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setTitle(`${panelWelcome}`)
        .setDescription(`**سبب فتح التكت : \` ${thereason} \`**`)
        const claimticket = new ButtonBuilder()
        .setCustomId(`claim_ticket`)
        .setLabel(`Claim Ticket`)
        .setStyle(ButtonStyle.Secondary)
        const deleteticket = new ButtonBuilder()
        .setCustomId(`delete_ticket`)
        .setLabel(`Delete Ticket`)
        .setStyle(ButtonStyle.Danger)
        const comeButton = new ButtonBuilder()
        .setCustomId(`come_button`)
        .setLabel(`استدعاء صاحب التكت`)
        .setStyle(ButtonStyle.Secondary)
        const row = new ActionRowBuilder()
        .addComponents(claimticket , deleteticket , comeButton);
        await theticket.send({components:[row] , embeds:[openembed] , content:`**${interaction.user} , <@&${panelRole}>**`})
        panelFind[0].panelNumber = parseInt(panelNumber) + 1
        panelFind[0].save();
        await ticketsManager.set(`${theticket.id}` , {
            opener:interaction.user.id,channelid:interaction.user.id,channelname:theticket.name,panelId:panelId
        })
        return;
        }
      
  }
    )};