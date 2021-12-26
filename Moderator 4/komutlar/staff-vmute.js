
const { MessageEmbed, Message } = require("discord.js");
const ayar = require("../ayarlar.json");
const db = require("quick.db")
const moment = require("moment");
const ms = require("ms");
exports.run = async(client, message, args) => {

    if (!message.member.roles.cache.has(ayar.muteH) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.carpi)

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member)
    let reason = args.splice(2).join(" ") || "Sebep belirtilmedi"

    if (!user) return message.channel.send(new MessageEmbed() .setDescription(`${message.author}, Eksik arguman kullandınız, \`.vmute @etiket/ID 1m Küfür\``)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))

    if (!args[1]) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Eksik arguman kullandınız, \`.vmute @etiket/ID 1m Küfür\``)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    let sure = args[1]
        .replace("s", " Saniye")
        .replace("m", " Dakika")
        .replace("h", " Saat")
        .replace("d", " Gün")


    if (user.id === client.user.id) return message.reply(`Beni susturamazsın.`)
    if (user.id === message.author.id) return message.reply(`D-dur, kendini muteleme.? n-neden??`)
    if (user.roles.highest.position >= message.member.roles.highest.position) return message.reply(`:x:`)

let cezaID = db.get(`cezaid.${message.guild.id}`) + 1

    user.voice.setMute(true)
    message.channel.send(new MessageEmbed()
    .setDescription(`
    ${user} (\`${user.id}\`) üyesi ses odalarında cezalandırıldı.
    
        • Yetkili: <@${message.author.id}>
        • Susturma Tarihi: \`${new Date().toTurkishFormatDate()}\`
        • Susturma Süresi: \`${sure}\`
    
        • Susturma Sebebi: \`${reason}\`
        • Ceza ID: \`#${cezaID}\``))

let kdb = new db.table("ceza")

    db.add(`cezaid.${message.guild.id}`, +1)
    db.add(`VmAtma.${message.author.id}`, 1)
    db.add(`cezapuan.${user.id}`, 8)
    db.add(`VmAlma.${user.id}`, 1)
    kdb.push(`sicil.${user.id}`, {
        userID: user.id,
        adminID: message.author.id, 
        Tip: "VMUTE", 
        start: new Date(), 
        cezaID: cezaID })

        let sonceza = kdb.fetch(`sonceza.${user.id}`)

        if(sonceza) return kdb.delete(`sonceza.${user.id}`)
    
        if(!sonceza) {
    
    setTimeout(async() => {
    
          await kdb.push(`sonceza.${user.id}`, {
          userID: user.id,
          adminName: message.member.displayName, 
          Tip: "VMUTE", 
          start: new Date(),
          puan: "10",
          reason: sebep,
          cezaID: cezaID })
          }, 1500)  
        }

        db.add(`YetkiliPuan.${message.author.id}`, 4)
        let cezapuan = db.fetch(`cezapuan.${user.id}`)
        client.channels.cache.get("848995124041220137").send(`**${user}** aldığı \`#${cezaID+1}\` numaralı ceza ile **${cezapuan}** ceza puanına ulaştı. (\`8\`)`)
        

    client.channels.cache.get(ayar.muteLog).send(new MessageEmbed()
    .setDescription(`
${user} (\`${user.id}\`) üyesi ses odalarında cezalandırıldı.

    • Yetkili: <@${message.author.id}>
    • Susturma Tarihi: \`${new Date().toTurkishFormatDate()}\`
    • Susturma Süresi: \`${sure}\`

    • Susturma Sebebi: \`${reason}\`
    • Ceza ID: \`#${cezaID+1}\``))

    setTimeout(async() => {
user.voice.setMute(false)
message.channel.send(new MessageEmbed()
.setColor("GREEN")
.setAuthor(`${message.member.user.username}`, message.member.user.displayAvatarURL({ dynamic: true }))
.setDescription(`
${user} (\`${user.id}\`) üyesinin kullanıcının ses odalarındaki cezası kalktı.       

• Yetkili: <@${message.author.id}>
• Susturulma Tarihi: ${new Date().toTurkishFormatDate()}
• Susturma Süresi: \`${sure}\`

• Sebep: \`${reason}\`
• Ceza ID: \`#${cezaID}\`
`))
}, ms(args[1]))

};
exports.conf = {
    enabled: true,
    guildOnly:true,
    aliases: ["voicemute"],
    permLevel: 0
};

exports.help = {
    name:'vmute',
    description:"Kullanıcıyı sesli odalarda susturur."
}
