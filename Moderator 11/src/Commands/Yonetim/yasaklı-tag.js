const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")
const bTag = require("../../Schemas/banned-tag")

const moment = require("moment");
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["yasaklı-tag","banned-tag"],
    name: "ytag",
    help: "ytag <ekle / kaldır / liste>"
  },

  run: async (client, message, args, embed) => {
    if(![conf.UstStaff].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
    //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.UstStaff).name}\` yetkisine sahip olman lazım`))
 
    let x = args[0];
    if(!x) return message.channel.send(embed.setDescription(`Hatalı , işlem belirtmelisiniz. Doğru Kullanım \`${ayar.prefix}ytag <ekle / kaldır / liste>\` `)).catch(e => { })
    
    const bannedtag = await bTag.find({guildID: message.guild.id})

    if(x == "ekle") {
        let tag = args[1];
        let reason = args.slice(2).join(" ") 
        if(!tag || !reason) return message.send(embed.setDescription(`Hatalı , işlem belirtmelisiniz. Doğru Kullanım \`${ayar.prefix}ytag ekle <Tag / Sebep>\``))

        let xyz = new bTag({ guildID: message.guild.id, adminID: message.member.id, Tag: tag, Reason: reason, Roles: conf.BannedTag, Date: Date.now() })
        xyz.save().then(x => {
            let users = message.guild.members.cache.filter(x => {
                return x.user.username.includes(args[1])
            })
    
            message.channel.send(embed.setDescription(`
    ${tag} tagı \`${reason}\` sebebiyle başarıyla \`Yasaklı-Tag\` oldu.
    İsminde \`${tag}\` tagını bulunduran \`${users.size}\` kişi var.
    `))
    
            message.guild.members.cache.forEach(x => {
                if (x.user.username.includes(tag)) {
                    x.setRoles([conf.BannedTag])
                }
            })
        })
        
    }

    if(x == "liste") {
        let btagp = bannedtag.length > 0 ? bannedtag.map((x) => `
        Yasaklı Tag: \`${x.Tag}\`
        Yasklanma Sebebi: \`${x.Reason}\`
        Yasklanma Tarihi: \`${moment(x.Date).locale('tr').format('LLL')}\`
        Tagdaki Toplam Kişi: \`${message.guild.members.cache.filter(m => m.user.username.includes(x.Tag)).size}\`
            `).join("\n**────────────**\n") : `Sunucuda belirlenen herhangi bir yasaklı tag yok.`;
                message.channel.send(embed.setAuthor(`${message.guild.name}`, message.author.avatarURL({ dynamic: true })).setDescription(`${btagp}`))
    }

    if(x == "kaldır") {
        let tag = args[1]
        if (!tag) return message.channel.send(embed.setDescription(`Geçerli bir tag belirtmelisin.`))

        await bannedtag.deleteOne({Tag:tag})
            let users = message.guild.members.cache.filter(x => {
                return x.user.username.includes(args[1])
            })
    
            message.channel.send(embed.setDescription(`
    ${tag} tagı artık \`Yasaklı-Tag\` değil. 
    İsminde \`${tag}\` tagını bulunduran \`${users.size}\` kişi var. Onlar da kayıtsıza atıldı.
    `))
    
            message.guild.members.cache.forEach(x => {
                if (x.user.username.includes(tag)) {
                    x.setRoles([conf.Register.UnregRole])
                }
            })
    }

}}