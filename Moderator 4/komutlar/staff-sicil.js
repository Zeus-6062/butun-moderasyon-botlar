const { MessageEmbed } = require("discord.js");
const ayar = require("../ayarlar.json");
const db = require("quick.db");
const kdb = new db.table("ceza");
exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(ayar.jailH) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.carpi)
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member)
// {code: "js", split: true}
    let puan = await kdb.fetch(`cezaid.${user.id}`) || "0"
    let x = await kdb.fetch(`sicil.${user.id}`)
    let sonceza = await kdb.fetch(`sonceza.${user.id}`)
    if (!x && !sonceza) return message.channel.send(embed.setDescription(`
${user} Kullanıcısının sicil geçmişi temiz.
`)).then(m => m.delete({ timeout: 7000 }))
    let sicil = x.map((data, index) => `\`#${data.cezaID || "Bulunamadı"}\` **[${data.Tip|| "Bulunamadı"}]** <@${data.adminID|| "bulunamadı"}> tarafından \`${new Date(data.start).toTurkishFormatDate() || "belirtilmemiş"}\` tarihinde cezalandırıldı.`)
    let sonc = sonceza.map((data, index) => `ID => #${data.cezaID || "Bulunamadı"}\nTip => ${data.Tip || "Bulunamadı"}\nYetkili => ${data.adminName || "bulunamadı"}\nPuan => ${data.puan || "0"}\nSebep => ${data.reason || "Bulunamadı"}\nCezalandırma Tarihi => ${new Date(data.start).toTurkishFormatDate()}`)
    const sembed = embed.setDescription(`
**Son Ceza İşlemi;**
\`\`\`${sonc}\`\`\`

**Kullanıcının daha önceden aldığı cezalar;**
${sicil.join("\n") || "Bu kullanıcının sicili temiz."}
`)
    message.channel.send(sembed).then(m => m.delete({ timeout: 15000 }) && message.delete({ timeout: 10000 }))

};
exports.conf = {
    aliases: []
};

exports.help = {
    name:'sicil',
    description:'Kullanıcının ceza geçmişini gösterir.'
}
