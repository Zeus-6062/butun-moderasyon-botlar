const { MessageEmbed, Client } = require('discord.js');
const ayarlar = require('../ayarlar.json');
const DataBase = require('quick.db');
const moment = require('moment');
const { createCipher } = require('crypto');
require('moment-duration-format')
exports.run = async(client, message, args) => {

    let a = await DataBase.fetch(`davetsayi.${message.author.id}.${message.guild.id}`) || 0
    let fakea = await DataBase.fetch(`fake.${message.author.id}_${message.guild.id}`) || 0
    let daily = await DataBase.fetch(`günlük.${message.author.id}.${message.guild.id}`) || 0

    //------------\\

    let CmAtma = await DataBase.fetch(`CmAtma.${message.author.id}`) || 0
    let VmAtma = await DataBase.fetch(`VmAtma.${message.author.id}`) || 0
    let BanAtma = await DataBase.fetch(`banAtma.${message.author.id}`) || 0
    let kickAtma = await DataBase.fetch(`kickAtma.${message.author.id}`) || 0
    let jailAtma = await DataBase.fetch(`jailAtma.${message.author.id}`) || 0
    
    let jailAlma = await DataBase.fetch(`jailAlma.${message.author.id}`) || 0
    let CmAlma = await DataBase.fetch(`CmAlma.${message.author.id}`) || 0
    let VmAlma = await DataBase.fetch(`VmAlma.${message.author.id}`) || 0
    let BanAlma = await DataBase.fetch(`banAlma.${message.author.id}`) || 0
    let kickAlma = await DataBase.fetch(`kickAlma.${message.author.id}`) || 0

    //------------\\

let cezapuan = DataBase.fetch(`cezapuan.${message.author.id}`)

   let toplamkayıt = await DataBase.fetch(`teyit.${message.author.id}.toplam`) || 0
   let kızkayıt = await DataBase.fetch(`teyit.${message.author.id}.kız`) || 0
   let erkekkayıt = await DataBase.fetch(`teyit.${message.author.id}.erkek`) || 0

    //------------\\

    const user = client.users.cache.get(message.author.id);

    let member = message.guild.member(user)

    const kurulus = user.createdAt.getTime(); 
    let giris = member.joinedAt.getTime();
    
moment.locale("tr")


message.react(ayarlar.tik)

message.channel.send(new MessageEmbed()
.setDescription(`
**${ayarlar.stars} ➥ Kullanıcı Bilgileri;**

• Kullanıcı: (<@${message.author.id}> - \`${message.author.id}\`) (${message.member.roles.highest})
• Hesap Kurulum Tarihi: \`${moment(message.member.createdAt).format('D MMMM YYYY')}\`
• Sunucuya Katılma Tarihi: \`${moment(message.member.joinedAt).format('D MMMM YYYY')}\`

────────────────────────

**${ayarlar.yukleniyor2} ➥ Ceza-İ İşlemler;**

• ChatMute: ${client.emojili(`${CmAtma}`)} Atma / ${client.emojili(`${CmAlma}`)} Alma,
• VoiceMute: ${client.emojili(`${VmAtma}`)} Atma / ${client.emojili(`${VmAlma}`)} Alma,

• Karantina: ${client.emojili(`${jailAtma}`)} Atma / ${client.emojili(`${jailAlma}`)} Alma,

• Ban: ${client.emojili(`${BanAtma}`)} Atma / ${client.emojili(`${BanAlma}`)} Alma,
• Kick: ${client.emojili(`${kickAtma}`)} Atma / ${client.emojili(`${kickAlma}`)} Alma,

• Toplam Ceza Puanı: ${client.emojili(`${cezapuan || "0"}`)} 

────────────────────────


**${ayarlar.hyp} ➥ Kayıt Verileri;**

• Toplam Kayıt Sayısı: ${client.emojili(`${toplamkayıt}`)}
• Toplam Kız Kayıt Sayısı: ${client.emojili(`${kızkayıt}`)}
• Toplam Erkek Kayıt Sayısı: ${client.emojili(`${erkekkayıt}`)}

────────────────────────

**${ayarlar.danksw} ➥ Davet Verileri;**

• Toplam Davet: ${client.emojili(`${a}`)} **davet**
• Toplam Fake Davet: ${client.emojili(`${fakea}`)} **davet**
• Günlük Davet: ${client.emojili(`${daily}`)} **davet**
`)
.setColor(message.member.displayColor)
.setThumbnail(message.author.avatarURL({ dynamic: true }))
.setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
.setTimestamp()
)
.catch(err => console.log(err))

};

exports.conf = {
    aliases:[],
    cooldown: 10000
};

exports.help = {
    name:'me'
}