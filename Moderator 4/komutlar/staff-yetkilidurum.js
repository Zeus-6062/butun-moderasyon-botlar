const { MessageEmbed, Client } = require('discord.js');
const ayarlar = require('../ayarlar.json');
const DataBase = require('quick.db');
const moment = require('moment');
require('moment-duration-format')

exports.run = async(client, message, args) => {

if(!message.member.hasPermission(ayarlar.kayıtcı)) return message.react(ayarlar.carpi)


let toplamkayıt = await DataBase.fetch(`teyit.${message.author.id}.toplam`) || 0
let kızkayıt = await DataBase.fetch(`teyit.${message.author.id}.kız`) || 0
let erkekkayıt = await DataBase.fetch(`teyit.${message.author.id}.erkek`) || 0

let CmAtma = await DataBase.fetch(`CmAtma.${message.author.id}`) || 0
let VmAtma = await DataBase.fetch(`VmAtma.${message.author.id}`) || 0
let BanAtma = await DataBase.fetch(`banAtma.${message.author.id}`) || 0
let kickAtma = await DataBase.fetch(`kickAtma.${message.author.id}`) || 0
let jailAtma = await DataBase.fetch(`jailAtma.${message.author.id}`) || 0

let yetkilipuan = await DataBase.fetch(`YetkiliPuan.${message.author.id}`) || 0

let minPosition = message.guild.roles.cache.get(ayarlar.kayıtcı);
let a = await DataBase.fetch(`davetsayi.${message.author.id}.${message.guild.id}`) || 0
let fakea = await DataBase.fetch(`fake.${message.author.id}_${message.guild.id}`) || 0
let daily = await DataBase.fetch(`günlük.${message.author.id}.${message.guild.id}`) || 0
let ayrılan = await DataBase.fetch(`ayrılan.${message.author.id}.${message.guild.id}`) || 0
let bonus = await DataBase.fetch(`bonusinv.${message.author.id}.${message.guild.id}`) || 0

let davetsorumlusu = `Yetkilendirilmedi ${ayarlar.carpi}`
if(a > 200) davetsorumlusu = `Yektilendirildi ${ayarlar.tik}`


let kayıtsorumlusu = `Yetkilendirilmedi ${ayarlar.carpi}`
if(toplamkayıt > "200") kayıtsorumlusu = `Yetkilendirildi ${ayarlar.tik}`

let chatsorumlusu = `Yetkilendirilmedi ${ayarlar.carpi}`
if(CmAtma+jailAtma > "120") chatsorumlusu = `Yetkilendirildi ${ayarlar.tik}`

let sessorumlusu = `Yetkilendirilmedi ${ayarlar.carpi}`
if(VmAtma > "120") sessorumlusu = `Yetkilendirildi ${ayarlar.tik}`


const embed = new MessageEmbed()
.setColor(message.member.displayColor)
.setThumbnail(message.author.avatarURL({ dynamic: true }))
.setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
.setTimestamp()
.setDescription(`
**${ayarlar.stars} Yetkili Durumu;**

• Yetkili: (<@${message.author.id}> - \`${message.author.id}\`) (${message.member.roles.highest})
• Hesap Kurulum Tarihi: \`${moment(message.member.createdAt).format('D MMMM YYYY')}\`
• Sunucuya Katılma Tarihi: \`${moment(message.member.joinedAt).format('D MMMM YYYY')}\`

<:cubuk:848997730415411220> Toplam Kayıtları: **Toplam ${toplamkayıt}** (\`${erkekkayıt} erkek, ${kızkayıt} kız\`)
<:cubuk:848997730415411220> Toplam Ceza İşlemleri: **Toplam ${CmAtma+VmAtma+BanAtma+kickAtma+jailAtma} Ceza İşlemi**;
<:cubuk:848997730415411220> (\`ChatMute: ${CmAtma} VoiceMute: ${VmAtma} Ban: ${BanAtma} Kick: ${kickAtma} Jail: ${jailAtma}\`)

<:dot:848997601499676762> Toplam Davetleri: **Toplam ${a} davet** (\`${ayrılan} ayrılan, ${fakea} fake, ${bonus} bonus\`)
<:dot:848997601499676762> Yetkili Puanı: **${yetkilipuan} ${ayarlar.mavitac}**

<:dot:848997601499676762> Yetkileri;
${message.member.roles.cache.filter(s => s.position > message.guild.roles.cache.get(ayarlar.kayıtcı).position).map(r => `${r}`)}

${ayarlar.hyp} \`>\` Kayıt Sorumlusu Durumu: **${kayıtsorumlusu}**
${ayarlar.hyp} \`>\` Chat Sorumlusu Durumu: **${chatsorumlusu}**
${ayarlar.hyp} \`>\` Ses Sorumlusu Durumu: **${sessorumlusu}**
${ayarlar.hyp} \`>\` Invite Sorumlusu Durumu: **${davetsorumlusu}**
`)
message.channel.send(embed)

}

exports.conf = {
    aliases:["yetkili","yetkili-durum"],
    cooldown: 10000
};

exports.help = {
    name:'yetkilidurum'
}