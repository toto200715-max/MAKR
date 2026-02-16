const { SlashCommandBuilder,SelectMenuBuilder,StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle, Embed } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/database/data")
const setting = new Database("/database/settingsdata/setting")
const prices = new Database("/database/settingsdata/prices.json")
const statuses = new Database("/database/settingsdata/statuses")

module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('send-buy-bot-panel')
    .setDescription(`ارسال بانل شراء البوتات`),
async execute(interaction) {
    await interaction.deferReply({ephemeral:false})
    let price1 = await setting.get(`balance_price_${interaction.guild.id}`) ?? 5000;
    let recipient = await setting.get(`recipient_${interaction.guild.id}`)
    let transferroom = await setting.get(`transfer_room_${interaction.guild.id}`)
    let logroom =  await setting.get(`log_room_${interaction.guild.id}`)
    let probot = await setting.get(`probot_${interaction.guild.id}`)
    let clientrole = await setting.get(`client_role_${interaction.guild.id}`)
    let panelroom = await setting.get(`panel_room_${interaction.guild.id}`)
    let buybotroom = await setting.get(`buy_bot_room${interaction.guild.id}`)
    if(!price1 || !recipient || !transferroom || !logroom || !probot || !clientrole || !buybotroom) return interaction.editReply({content:`**لم يتم تحديد الاعدادات**`})
    let theroom = interaction.guild.channels.cache.find(ch => ch.id == buybotroom)
    let embed = new EmbedBuilder()
    .setTitle(`**بانل شراء بوت**`)
    .setDescription(`**يمكنك شراء بوت عن طريق الضغط على البوت من القائمة**`)
    .setTimestamp()
    .setThumbnail(interaction.guild.iconURL({dynamic:true}))
    const theBots = [
        {
            name:`التقديم` , defaultPrice:15,tradeName:`apply`
        },
        {
            name:`الاذكار`,defaultPrice:1,tradeName:`azkar`
        },
        {
            name:`القرأن`,defaultPrice:1,tradeName:`quran`
        },
        {
            name:`الخط التلقائي` , defaultPrice:15,tradeName:`autoline`
        },
        {
            name:`البلاك ليست` , defaultPrice:15,tradeName:`blacklist`
        },
        {
            name:`الطلبات`,defaultPrice:20,tradeName:`orders`
        },
        {
			name:`رومات الشوب`,defaultPrice:20,tradeName:`shopRooms`
		},
        {
            name:`التحكم في البرودكاست` , defaultPrice:40,tradeName:`bc`
        },
		{
			name:`البرودكاست العادي` , defaultPrice:20,tradeName:`Broadcast2`
		},
        {
          name:`الرومات الخاصة` , defaultPrice:20,tradeName:`privateRooms`  
        },
        {
            name:`الكريدت الوهمي` , defaultPrice:15,tradeName:`credit`
        },
        {
            name:`الاراء` , defaultPrice:15,tradeName:`feedback`
        },
        {
            name:`الجيف اواي` , defaultPrice:15,tradeName:`giveaway`
        },
        {
            name:`اللوج` , defaultPrice:15,tradeName:`logs`
        },
        {
            name:`الناديكو` , defaultPrice:15,tradeName:`nadeko`
        },
        {
            name:`البروبوت بريميوم الوهمي` , defaultPrice:15,tradeName:`probot`
        },
		{
			name:`الحماية` , defaultPrice:20 , tradeName:`protect`
		},
        {
			name:`شراء الرتب` , defaultPrice:25 , tradeName:`roles`
		},
        {
            name:`النصابين` , defaultPrice:15,tradeName:`scam`
        },
        {
            name:`الاقتراحات` , defaultPrice:15,tradeName:`suggestions`
        },
		{
			name:`السيستم` , defaultPrice:35 , tradeName:`system`
		},
        {
            name:`الضريبة` , defaultPrice:15,tradeName:`tax`
        },
        {
            name:`التكت` , defaultPrice:40,tradeName:`ticket`
        },
		{
			name:`الشوب` , defaultPrice:40,tradeName:`shop`
		}
    ]
    theBots.forEach(async(theBot) => {
        let theBotStats = statuses.get(theBot.tradeName) ?? true
        embed.addFields(
            {
                name:`**بوتات ${theBot.name} **` , value:`**السعر في السيرفر : \`${prices.get(theBot.tradeName+`_price_`+interaction.guild.id) ?? theBot.defaultPrice}\` عملة** <:botorange:1200107169681514506>` , inline:false
            }
        )
    })
    const select = new StringSelectMenuBuilder()
    .setCustomId('select_bot')
    .setPlaceholder('قم بأختيار البوت من القائمة')
    .addOptions(
        new StringSelectMenuOptionBuilder()
        .setEmoji(`<:botorange:1200107169681514506>`)    
        .setLabel('Apply')
            .setDescription('شراء بوت تقديمات')
            .setValue('BuyApply'),
            new StringSelectMenuOptionBuilder()
        .setEmoji(`<:botorange:1200107169681514506>`)    
        .setLabel('Azkar')
            .setDescription('شراء بوت اذكار')
            .setValue('BuyAzkar'),
            new StringSelectMenuOptionBuilder()
        .setEmoji(`<:botorange:1200107169681514506>`)    
        .setLabel('Quran')
            .setDescription('شراء بوت قرأن')
            .setValue('BuyQuran'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('AutoLine')
            .setDescription('شراء بوت خط تلقائي')
            .setValue('BuyAutoline'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('Blacklist')
            .setDescription('شراء بوت بلاك ليست')
            .setValue('BuyBlacklist'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('Broadcast')
            .setDescription('شراء بوت برودكاست')
            .setValue('BuyBroadcast'),
            new StringSelectMenuOptionBuilder()
        .setLabel('Orders')
        .setDescription('شراء بوت طلبات')
        .setEmoji(`<:botorange:1200107169681514506>`)    
        .setValue('BuyOrders'), 
        new StringSelectMenuOptionBuilder()

        .setLabel('Private Rooms')
        .setDescription('شراء بوت رومات خاصة')
        .setEmoji(`<:botorange:1200107169681514506>`)    
        .setValue('BuyPrivateRooms'),   
        new StringSelectMenuOptionBuilder()
        .setEmoji(`<:botorange:1200107169681514506>`)    
        .setLabel('Normal Broadcast')
            .setDescription('شراء بوت برودكاست عادي')
            .setValue('BuyNormalBroadcast'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('Credit')
            .setDescription('شراء بوت كريدت وهمي')
            .setValue('BuyCredit'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('Feedback')
            .setDescription('شراء بوت اراء')
            .setValue('BuyFeedback'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('Giveaway')
            .setDescription('شراء بوت جيف اواي')
            .setValue('BuyGiveaway'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('Logs')
            .setDescription('شراء بوت لوج')
            .setValue('BuyLogs'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('Nadeko')
            .setDescription('شراء بوت ناديكو')
            .setValue('BuyNadeko'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('Probot')
            .setDescription('شراء بوت  بروبوت بريميوم وهمي')
            .setValue('BuyProbot'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('Protect')
            .setDescription('شراء بوت حماية')
            .setValue('BuyProtect'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('Buy Roles')
            .setDescription('شراء بوت شراء رتب')
            .setValue('BuyRoles'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('Scammers')
            .setDescription('شراء بوت نصابين')
            .setValue('BuyScammers'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('Suggestions')
            .setDescription('شراء بوت اقتراحات')
            .setValue('BuySuggestions'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('System')
            .setDescription('شراء بوت سيستم')
            .setValue('BuySystem'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('Shop')
            .setDescription('شراء بوت شوب')
            .setValue('BuyShop'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Shop Rooms')
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setDescription('شراء بوت رومات شوب')
            .setValue('BuyShopRooms'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('Tax')
            .setDescription('شراء بوت ضريبة')
            .setValue('BuyTax'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('Ticket')
            .setDescription('شراء بوت تكت')
            .setValue('BuyTicket'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:7330warning:1200114749069864981>`)
            .setLabel('Reset')
            .setDescription('عمل اعادة تعيين للاختيار')
            .setValue('Reset_Selected'),
    );
    const row = new ActionRowBuilder()
    .addComponents(select);
    theroom.send({embeds:[embed] , components:[row]})
    if(setting.has(`subscribe_room_${interaction.guild.id}`)) {
        let subscriberoo = setting.get(`subscribe_room_${interaction.guild.id}`)
        let subscriberoom = interaction.guild.channels.cache.find(ch => ch.id == subscriberoo)
        let embed2 = new EmbedBuilder()
    .setTitle(`**بانل اشتراك في بوت الميكر**`)
    .setDescription(`**يمكنك الاشتراك في بوت الميكر عن طريق القائمة**`)
    .setTimestamp()
    .setThumbnail(interaction.guild.iconURL({dynamic:true}))
    const theBots = [
        {
            name:`البرايم` , defaultPrice:150,tradeName:`bot_maker`
        },
        {
            name:`البريميوم` , defaultPrice:275,tradeName:`bot_maker_premium`
        },
        {
            name:`الالتيميت` , defaultPrice:450,tradeName:`bot_maker_ultimate`
        }
    ]
    theBots.forEach(async(theBot) => {
        let theBotStats = statuses.get(theBot.tradeName) ?? true
        embed2.addFields(
            {
                name:`**بوتات ${theBot.name} **` , value:`**السعر في السيرفر : \`${prices.get(theBot.tradeName+`_price_`+interaction.guild.id) ?? theBot.defaultPrice}\` عملة** <:botorange:1200107169681514506>` , inline:false
            }
        )
    })
    embed2.addFields(
    {
        name:`**البرايم**`,value:`**تبيع فقط البوتات العادية في سيرفرك**`,inline:false
    },
    {
        name:`**البريميوم**`,value:`**تبيع فقط البوتات العادية في سيرفرك مع اسم وصورة خاص ببوتك**`,inline:false
    },
    {
        name:`**الالتيميت**`,value:`**تبيع البوتات العادية في سيرفرك مع الاشتراكات البرايم والبريميوم وبيع الابتايم في سيرفرك مع اسم وصورة خاص ببوتك**`,inline:false
    },
    {
        name:`**اضافة التيميت بلس 🏆**`,value:`**تبيع البوتات العادية في سيرفرك مع الاشتراكات البرايم والبريميوم والالتيميت , وسعرها 1 مليون لكل 10 ايام ويمكنك شرائها من السيرفر الرسمي فقط**`,inline:false
    },
    )
        const select2 = new StringSelectMenuBuilder()
        .setCustomId('select_bot')
        .setPlaceholder('الاشتراك في بوت الميكر')
        .addOptions(
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('Prime')
            .setDescription('الاشتراك في بوت الميكر برايم')
            .setValue('Bot_Maker_Subscribe'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('Premium')
            .setDescription('الاشتراك في بوت الميكر بريميوم')
            .setValue('Bot_Maker_Premium_Subscribe'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:botorange:1200107169681514506>`)
            .setLabel('Ultimate')
            .setDescription('الاشتراك في بوت الميكر التيميت')
            .setValue('Bot_Maker_Ultimate_Subscribe'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:7330warning:1200114749069864981>`)
            .setLabel('Reset')
            .setDescription('عمل اعادة تعيين للاختيار')
            .setValue('Reset_Selected'),);
            const row2 = new ActionRowBuilder().addComponents(select2)
        subscriberoom.send({embeds:[embed2],components:[row2]})
    }
    return interaction.editReply({content:`**تم ارسال الرسالة بنجاح**`})
}
}