const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")
const datas = require("../../Schemas/names");
module.exports = {
    conf: {
      aliases: ["nick"],
      name: "isim",
      help: "isim [Kullanıcı] <Nick>"
    },
  
run: async (client, message, args, embed, prefix) => {
    if(![conf.Register].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
    //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Register.RegisterHammer).name}\` yetkisine sahip olman lazım`))
    
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(embed.setDescription(`Hatalı , kullanıcı belirtmeyi unuttun. Doğru kullanım \`${ayar.prefix}isim @Brita/ID <Nick>\``))

    let name = args[1];
    let age = args[2];
    if(!name || !age || isNaN(age)) return message.channel.send(embed.setDescription(`Hatalı , isim değiştirmek için her hangi bir isim ve yaş yazman lazım. Doğru kullanım \`${ayar.prefix}isim @Brita/ID <Nick>\``))       

    let Belirlenenİsim;
    if(!member.user.username.includes(conf.Tag)) Belirlenenİsim = `${conf.Ktag} ${name.substr(0,1).toUpperCase()+name.substr(1,name.length)} ' ${age}`
    if(member.user.username.includes(conf.Tag)) Belirlenenİsim  = `${conf.Tag} ${name.substr(0,1).toUpperCase()+name.substr(1,name.length)} ' ${age}`  

    await datas.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { names: { name: Belirlenenİsim, Gender: "İsim Değiştirme.", yetkili: message.author.id,  date: Date.now() } } }, { upsert: true });  

    member.setNickname(Belirlenenİsim)
    return message.channel.send(embed.setDescription(`
    ${member} kullanıcısının ismi başarıyla \`${Belirlenenİsim}\` olarak değiştirildi.
    Kullanıcının önceki isimlerini görmek için \`${ayar.prefix}isimler @Brita/ID\` komutunu kullanmanız yeterlidir.`))

}}