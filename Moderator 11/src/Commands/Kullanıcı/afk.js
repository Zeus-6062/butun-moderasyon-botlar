const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")
const afk = require("../../Schemas/afk");
module.exports = {
    conf: {
      aliases: [],
      name: "afk",
      help: "afk"
    },
  
run: async (client, message, args, embed, prefix) => {
const reason = args.join(" ") || "Belirtilmedi!";
let yasak = /h?t?t?p?s?:?\/?\/?discord.?gg\/?[a-zA-Z0-9]+/
if (yasak.test(message.content) == true) return
if (message.content.includes("@here") || message.content.includes("@everyone")) return
message.member.setNickname("[AFK] " + message.member.displayName)
await afk.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $set: { reason, date: Date.now() } }, { upsert: true });
message.react(emoji.TikID)
message.channel.send("Başarıyla AFK moduna geçtin.")
}
  };
  