const { SlashCommandBuilder,Collection, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle } = require("discord.js");
const { Database } = require("st.db");
const freeCooldown = new Collection();
const usersdata = new Database(`/database/usersdata/usersdata`)
let {mainguild} = require(`../../config.json`)
module.exports ={
    ownersOnly:false,
    data: new SlashCommandBuilder()
    .setName('free-coins')
    .setDescription(`الحصول على كوينز مجانية`)
,
    async execute(interaction, client) {
        try{
            await interaction.deferReply({ephemeral:false})
            if(interaction.guild.id != mainguild) {
                const invitebot = new ButtonBuilder()
                .setLabel('السيرفر الرسمي')
                .setURL(`https://discord.gg/d9QT4khrEm`)
                .setStyle(ButtonStyle.Link);
                const row2 = new ActionRowBuilder().addComponents(invitebot);
                return interaction.editReply({content:`**توجه الى السيرفر الرسمي**` , components:[row2]})
            }
            if(freeCooldown.has(`${interaction.user.id}`)) return interaction.editReply({content:`**يمكنك استخدام الامر مرة كل 12 ساعة فقط**`})
        
        let userbalance = usersdata.get(`balance_${interaction.user.id}_${interaction.guild.id}`) ?? 0;
        let userbots = usersdata.get(`bots_${interaction.user.id}_${interaction.guild.id}`) ?? 0;
        let usersub = usersdata.get(`sub_${interaction.user.id}`)
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }
          
          const randomNum = getRandomInt(1, 5);
        if(!usersdata.has(`balance_${interaction.user.id}_${interaction.guild.id}`)) {
            await usersdata.set(`balance_${interaction.user.id}_${interaction.guild.id}` , randomNum)
            let embed1 = new EmbedBuilder()
            .setTitle(`**تم الحصول على هدية مجانية قدرها ${randomNum}**`)
            .setDescription(`**رصيدك الحالي هو : \`${randomNum}\`**`)
            .setTimestamp()
            freeCooldown.set(`${interaction.user.id}`);
            setTimeout(() => {
				freeCooldown.delete(`${interaction.user.id}`);
			  }, 1000 * 60 * 60 * 12);
            return interaction.editReply({embeds:[embed1]})
        }else {
            let newUserBalance = parseInt(userbalance) + parseInt(randomNum)
            await usersdata.set(`balance_${interaction.user.id}_${interaction.guild.id}` , newUserBalance)
            let embed1 = new EmbedBuilder()
            .setTitle(`**تم الحصول على هدية مجانية قدرها ${randomNum}**`)
            .setDescription(`**رصيدك الحالي هو : \`${newUserBalance}\`**`)
            .setTimestamp()
            freeCooldown.set(`${interaction.user.id}`);
            setTimeout(() => {
				freeCooldown.delete(`${interaction.user.id}`);
			  }, 1000 * 60 * 60 * 12);
            return interaction.editReply({embeds:[embed1]})
        }
    }
catch (error){
    console.error(error)
            return interaction.editReply({content:`**حدث خطأ حاول مرة اخرى**`})
}
    }
}