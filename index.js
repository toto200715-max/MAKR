const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent
  ],
  shards: "auto",
  partials: [Partials.Message, Partials.Channel, Partials.GuildMember]
});

const { readdirSync } = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const mongoose = require("mongoose");
const { token, database } = require("./config.json");
const ascii = require("ascii-table");

client.login(token).catch(() => console.log("Token not working"));

client.slashcommands = new Collection();
client.commandaliases = new Collection();
client.setMaxListeners(1000);

const rest = new REST({ version: "10" }).setToken(token);
const slashcommands = [];

module.exports = client;

/* ================= READY ================= */

client.on("ready", async () => {
  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: slashcommands }
    );
  } catch (error) {
    console.error(error);
  }

  await mongoose.connect(database)
    .then(() => console.log("🟢 Database Connected"))
    .catch(() => console.log("🔴 Database Failed"));

  console.log("Bot Ready");
});

/* ================= OWNER COMMANDS ================= */

const table = new ascii("Owner Commands").setJustify();

for (let folder of readdirSync("./ownerOnly/").filter(f => !f.includes("."))) {
  for (let file of readdirSync("./ownerOnly/" + folder).filter(f => f.endsWith(".js"))) {

    let command = require(`./ownerOnly/${folder}/${file}`);
    if (!command) continue;

    slashcommands.push(command.data.toJSON());
    client.slashcommands.set(command.data.name, command);

    table.addRow(`/${command.data.name}`, "Working");
  }
}

console.log(table.toString());

/* ================= EVENTS ================= */

function loadHandler(path) {
  for (let folder of readdirSync(path).filter(f => !f.includes("."))) {
    for (let file of readdirSync(`${path}/${folder}`).filter(f => f.endsWith(".js"))) {

      const event = require(`${path}/${folder}/${file}`);

      if (!event.name || !event.execute) continue;

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    }
  }
}

/* تحميل جميع الأنظمة */

loadHandler("./events");
loadHandler("./buttons");
loadHandler("./premiumBots");
loadHandler("./ultimateBots");
loadHandler("./Bots");

/* ================= DATABASE FILES ================= */

for (let file of readdirSync("./database/").filter(f => f.endsWith(".js"))) {
  require(`./database/${file}`);
}

/* ================= ERRORS ================= */

process.on("uncaughtException", (err) => {
  console.log(err);
});

process.on("unhandledRejection", (reason) => {
  console.log(reason);
});

process.on("uncaughtExceptionMonitor", (reason) => {
  console.log(reason);
});
