const { Client, Collection,ActivityType, discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message } = require("discord.js");
const { Database } = require("st.db")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")
const usersdata = new Database(`/database/usersdata/usersdata`);

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		setInterval(() => {
            let subscriptions1 = tier1subscriptions.get(`tier1_subs`)
            if(!subscriptions1) return;
            if(subscriptions1.length > 0) {
                subscriptions1.forEach(async(subscription) => {
            let {ownerid , guildid , timeleft} = subscription;
            let theguild = client.guilds.cache.find(gu => gu.id == guildid)
            if(timeleft >= 0) {
                timeleft = timeleft - 1;
            subscription.timeleft = timeleft
            await tier1subscriptions.set(`tier1_subs` , subscriptions1)
            if(timeleft == 259200) {
                let threeDays = new EmbedBuilder()
                .setColor(`DarkGold`)
                .setTitle(`**اقترب انتهاء الاشتراك**`)
                .setDescription(`**اقترب انتهاء اشتراك بوت ميكر الخاص بك وتبقى 3 ايام يمكنك التجديد قبل الانتهاء لعدم فقد البيانات الخاصة بك**`)
                .setTimestamp()
                await client.users.fetch(ownerid)
                let theowner = client.users.cache.find(mem => mem.id == ownerid)
                theowner.send({embeds:[threeDays]})
                await tier1subscriptions.set(`tier1_subs` , subscriptions1)
            }
            if(timeleft == 0) {
                const abcd =  await subscriptions1.filter(sub => sub.guildid != guildid)
                await tier1subscriptions.set(`tier1_subs` , abcd)
                let endedEmbed = new EmbedBuilder()
                .setColor(`Red`)
                .setTitle(`**❌انتهي وقت الاشتراك❌**`)
                .setTimestamp()
                .setDescription(`**انتهى اشتراك بوت الميكر الخاص بك لسيرفر : \`${theguild.name}\`**`)
                await client.users.fetch(ownerid)
                let theowner = client.users.cache.find(mem => mem.id == ownerid)
                await theowner.send({embeds:[endedEmbed]})
                await theguild.leave();
                await usersdata.delete(`sub_${ownerid}`)
            }
    
            }
        })
        
            }
        }, 1000 );
	},
};