const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")
const kayıt = require("../../Schemas/kayıt")
const datas = require("../../Schemas/names")
const moment = require("moment")
moment.locale("tr")

const { MessageEmbed, Client } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const client = new Client();

module.exports = {
  conf: {
    aliases: ["e","kayıt","erkek","kadın","k"],
    name: "kayıt",
    help: "kayıt [Kullanıcı] [İsim] [Yaş]"
  },

  run: async (client, message, args, embed) => {
    if(![conf.Register.RegisterHammer].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
    // return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Register.RegisterHammer).name}\` yetkisine sahip olman lazım`))
    
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(embed.setDescription(`Bir kullanıcı belirtmen gerek.`))

    let times = new Date().getTime() - member.user.createdAt.getTime(); // Bu kısmı Shi'den çaldım <31  shi⁴²#4730
    if(times< 604800000) return message.channel.send(embed.setDescription(`7 gün önce açılmış hesapları kayıt edemzsin`)) // Bu kısmı Shi'den çaldım <31  shi⁴²#4730 
    if(message.author.id === member.id) { return message.channel.send(embed.setDescription(`Kendini kayıt edemezsin`)) }
    if(message.member.roles.highest.position <= member.roles.highest.position) { return message.channel.send(embed.setDescription(`Senden yüksekte olan birisini kayıt edemezsin.`)) }
    if(conf.Register.BoyRoles.some(x => member.roles.cache.has(x)) && conf.Register.GirlRoles.some(x => member.roles.cache.has(x))) { return message.channel.send(embed.setDescription(`Belirlediğin kullanıcı zaten kayıtlı.`)) }

    let name = args[1];
    let age = args[2];
    if(!name || !age || isNaN(age)) return message.channel.send(embed.setDescription(`Doğru Kullanım Şekli \`${conf.prefix}kayıt @Brita/ID <İsim> <Yaş>`))       
    if(13 >= age) return message.channel.send(embed.setDescription(`13 yaş ve altını kayıt edemezsin.`))

    let Belirlenenİsim;
    if(!member.user.username.includes(conf.Tag)) Belirlenenİsim = `${conf.Ktag} ${name.substr(0,1).toUpperCase()+name.substr(1,name.length)} ' ${age}`
    if(member.user.username.includes(conf.Tag)) Belirlenenİsim  = `${conf.Tag} ${name.substr(0,1).toUpperCase()+name.substr(1,name.length)} ' ${age}`  

    var erkek = new MessageButton()
    .setID("Boys")
    .setLabel("Erkek")
    .setStyle("gray")

    var kız = new MessageButton()
    .setID("Girls")
    .setLabel("Kadın")
    .setStyle("gray")

    await member.setNickname(Belirlenenİsim)

    let embed2 = new MessageEmbed()
    .setColor("00ffee")
    .setFooter(`huh? Brita?`)
    .setThumbnail(message.guild.iconURL({dynamic: true}))
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, size: 2048 }))
    .setDescription(`
    ${member} kullanıcısının ismi başarıyla \`${Belirlenenİsim}\` olarak değişti.
    Alttaki Butonlara Basarak Kullanıcının Cinsiyetini Seçebilirsin.`)

    let msg = await message.channel.send({ buttons : [ erkek, kız], embed: embed2})
    
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, { time: 10000 })

      collector.on("collect", async (button) => {
      message.react(emoji.TikID)
      if(button.id === "Boys") {
        await member.roles.remove(conf.Register.UnregRole)
        member.user.username.includes(conf.Tag) && !member.roles.cache.has(conf.Register.CrewRole) ? 
        await member.roles.add(conf.Register.CrewRole , conf.Register.BoyRoles) : member.roles.add(conf.Register.BoyRoles)
        await button.think(true)
        await button.reply.edit(`${member} adlı kullanıcı başarıyla ${conf.Register.BoyRoles.map(r => `<@&${r}>`)} rolüyle kayıt edildi`)
        await datas.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { names: { name: Belirlenenİsim, Gender: "ERKEK", rol: conf.Register.BoyRoles.map(x => `<@&${x}>`).join(" , "), yetkili: message.author.id,  date: Date.now() } } }, { upsert: true });  
        await kayıt.findByIdAndUpdate(member.id, { $push: { kayıt: [{ isim: Belirlenenİsim, yetkili: message.author.id, rol: conf.Register.BoyRoles.map(x => `<@&${x}>`).join(" , "), tarih: Date.now() }] } }, { upsert: true });
    
      }
      if(button.id === "Girls") {
        await member.roles.remove(conf.Register.UnregRole)
        member.user.username.includes(conf.Tag) && !member.roles.cache.has(conf.Register.CrewRole) ? 
        await member.roles.add(conf.Register.CrewRole , conf.Register.BoyRoles) : member.roles.add(conf.Register.GirlRoles)
        await button.think(true)
        await button.reply.edit(`${member} adlı kullanıcı başarıyla ${conf.Register.GirlRoles.map(r => `<@&${r}>`)} rolüyle kayıt edildi`)
        await datas.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { names: { name: Belirlenenİsim, Gender: "KADIN", rol: conf.Register.GirlRoles.map(x => `<@&${x}>`).join(" , "), yetkili: message.author.id,  date: Date.now() } } }, { upsert: true });  
        await kayıt.findByIdAndUpdate(member.id, { $push: { kayıt: [{ isim: Belirlenenİsim, yetkili: message.author.id, rol: conf.Register.GirlRoles.map(x => `<@&${x}>`).join(" , "), tarih: Date.now() }] } }, { upsert: true });
    
  }
    });

    collector.on("end", async () => {
      msg.delete();
    });
  

}}