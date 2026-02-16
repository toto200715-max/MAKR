const { SlashCommandBuilder,SelectMenuBuilder,StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle, Embed } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/Json-db/Bots/ordersDB.json")
module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('setup-orders')
    .setDescription('تسطيب نظام الطلبات')
    .addChannelOption(Option => Option
        .setName(`orderroom`)
        .setDescription(`روم الطلب`)
        .setRequired(false))
    .addChannelOption(Option => Option
        .setName(`productsroom`)
        .setDescription(`روم طلبات المنتجات`)
        .setRequired(false))
    .addChannelOption(Option => Option
        .setName(`currencyroom`)
        .setDescription(`روم طلبات العملات`)
        .setRequired(false))
    .addChannelOption(Option => Option
        .setName(`servicesroom`)
        .setDescription(`روم طلبات العملات`)
        .setRequired(false))
        .addChannelOption(Option => Option
            .setName(`designsroom`)
        .setDescription(`روم طلبات التصاميم`)
        .setRequired(false))
        .addRoleOption(Option => Option
            .setName(`productsrole`)
            .setDescription(`رول منشن المنتجات`)
            .setRequired(false))
            .addRoleOption(Option => Option
                .setName(`currencyrole`)
                .setDescription(`رول منشن العملات`)
                .setRequired(false))
                .addRoleOption(Option => Option
                    .setName(`servicesrole`)
                    .setDescription(`رول منشن الخدمات`)
                    .setRequired(false))
                    .addRoleOption(Option => Option
                        .setName(`designsrole`)
                        .setDescription(`رول منشن التصاميم`)
                        .setRequired(false))
                        .addRoleOption(Option => Option
                            .setName(`adminsrole`)
                            .setDescription(`رول ادارة الطلبات`)
                            .setRequired(false))
                        .addAttachmentOption(Option => Option
                            .setName(`line`)
                            .setDescription(`الخط`)
                            .setRequired(false))
    ,
async execute(interaction) {
    await interaction.deferReply({ephemeral:false})
    let orderroom = interaction.options.getChannel(`orderroom`)
    let productsroom = interaction.options.getChannel(`productsroom`)
    let currencyroom = interaction.options.getChannel(`currencyroom`)
    let servicesroom = interaction.options.getChannel(`servicesroom`)
    let designsroom = interaction.options.getChannel(`designsroom`)

    let productsrole = interaction.options.getRole(`productsrole`)
    let currencyrole = interaction.options.getRole(`currencyrole`)
    let servicesrole = interaction.options.getRole(`servicesrole`)
    let designsrole = interaction.options.getRole(`designsrole`)
    let adminsrole = interaction.options.getRole(`adminsrole`)

    let line = interaction.options.getAttachment(`line`)
    if(orderroom) {
        let embed1 = new EmbedBuilder()
        .setDescription(`**لطلب منتجات مثل :
        حسابات ، نيترو ، فيزا ، العاب ، طرق.. إلخ ، الرجاء الضغط على 🎮 
        
         لطلب عملات مثل :
        كريدت ، فليكسي ، بايبال ، آسيا سيل ، ريزر قولد.. إلخ ، الرجاء الضغط على 💵 
        
         لطلب خدمات مثل :
        مشاهدات ، لايكات ، متابعين ، ريبات بروبوت ، تفعيل نيترو ، شخص يشتري لك من موقع... إلخ ، الرجاء الضغط على 📝 
        
         لطلب تصاميم مثل :
        صور سيرفر ، افتار ، بنر ، لوقو قناة... إلخ ، الرجاء الضغط على  🖌️
        **`)
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setFooter({text:`Orders System`, iconURL:interaction.guild.iconURL({dynamic:true})})
        const selectOrder = new StringSelectMenuBuilder()
        .setCustomId('select_bot')
        .setPlaceholder('لطلب شيء معين')
        .addOptions(
            new StringSelectMenuOptionBuilder()
            .setLabel('منتجات 🎮')
            .setDescription('لطلب منتج')
            .setValue('orderProduct'),
            new StringSelectMenuOptionBuilder()
            .setLabel('عملات 💵')
            .setDescription('لطلب عملات')
            .setValue('orderCurrency'),
            new StringSelectMenuOptionBuilder()
            .setLabel('خدمات 📝')
            .setDescription('لطلب خدمات')
            .setValue('orderServices'),
            new StringSelectMenuOptionBuilder()
            .setLabel('تصاميم 🖌️')
            .setDescription('لطلب تصاميم')
            .setValue('orderDesigns'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Reset')
            .setDescription('عمل اعادة تعيين للاختيار')
            .setValue('Reset_Selected_order'),);
            const row2 = new ActionRowBuilder().addComponents(selectOrder)
            await orderroom.send({embeds:[embed1] , components:[row2]})
    }
    if(productsroom) {
        await db.set(`products_room_${interaction.guild.id}` , productsroom.id)
    }
    if(productsrole) {
        await db.set(`products_role_${interaction.guild.id}` , productsrole.id)
    }
    if(currencyroom) {
        await db.set(`currency_room_${interaction.guild.id}` , currencyroom.id)
    }
    if(currencyrole) {
        await db.set(`currency_role_${interaction.guild.id}` , currencyrole.id)
    }
    if(servicesroom) {
        await db.set(`services_room_${interaction.guild.id}` , servicesroom.id)
    }
    if(servicesrole) {
        await db.set(`services_role_${interaction.guild.id}` , servicesrole.id)
    }
    if(designsroom) {
        await db.set(`designs_room_${interaction.guild.id}` , designsroom.id)
    }
    if(designsrole) {
        await db.set(`designs_role_${interaction.guild.id}` , designsrole.id)
    }
    if(adminsrole) {
        await db.set(`admins_role_${interaction.guild.id}` , adminsrole.id)
    }
    if(line) {
        await db.set(`line_${interaction.guild.id}` , line.url)
    }
    return interaction.editReply({content:`**تم تحديد الاعدادات المحددة بنجاح**`})
}
}