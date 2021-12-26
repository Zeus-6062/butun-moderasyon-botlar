const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../config.js");

exports.run = async (client, message, args) => {
  if(db.fetch(`bakim`)) {
    if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
  }
  const member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.member;

  if (
    !message.member.roles.cache.has(config.kayıtcırol) &&
    !message.member.hasPermission("ADMINISTRATOR")
  )
    
    return message.channel.send(
      new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(`Komutu kullanan kullanıcıda yetki bulunmadı`)
      .setColor("2F3136")
      );
  
 let lore1 =
    message.mentions.users.first() ||
    client.users.cache.get(args.join(" ")) ||
    message.guild.members.cache.find(c => c.id === args[0]);
 if (!lore1)
    return message.channel.send(
      new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(`**Argümanları Eksiksiz Doldur !** \`Örnek\`: .erkek @RK/id İsim Yaş`)
      .setColor("2F3136")
      );
  let role = message.guild.roles.cache.get(config.erkek);

  const nick = args[1];
  if (!nick)
    return message.channel.send(
      new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(`**Argümanları Eksiksiz Doldur !** \`Örnek\`: .erkek @RK/id İsim `)
      .setColor("2F3136")
    );
    const yas = args[2];
    if (!nick)
      return message.channel.send(
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`**Argümanları Eksiksiz Doldur !** \`Örnek\`: .erkek @Rk/id İsim `)
        .setColor("BLACK")
      );
    if (!yas)
      return message.channel.send(
        new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`**Argümanları Eksiksiz Doldur !** \`Örnek\`: .erkek @Rk/ID İsim Yaş`)
        .setColor("BLACK")
      );
  

    if(db.fetch(`taglıAlım.${message.guild.id}`)) {
      if(!member.user.username.includes(config.tag) && !member.roles.cache.has(config.vip) && !member.roles.cache.has(config.etikettagrol) && !member.roles.cache.has(config.booster)) return message.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`Üzgünüm , Ama Henüz Taglı Alımdayız . Vip Veya Booster Rolü Olmadığı Koşulda İçeri Alamam ... `))
       
       }

 let user = message.mentions.users.first();
  let lore = message.guild.member(lore1);
  let kayıtlımı = await db.fetch(`kayıtlıkişi_${lore.user}`);
  let kayıtlılar = new Discord.MessageEmbed();

  let eskiismi = await db.fetch(`kayıtlıisim_${lore.user}`);
  if (!lore.user) return message.channel.sendEmbed
  new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(`**Argümanları Eksiksiz Doldur !** \`Örnek\`: .erkek @RK/ID İsim Yaş`)
      .setColor("BLACK")
 
let tag = config.tag

const Tagisim = `★ ${nick} | ${yas}`;





  setTimeout(function() {}, 1000);
  setTimeout(function() {
    lore.setNickname(Tagisim);
    lore.roles.add(config.erkek1);
    lore.roles.add(config.erkek2);
    lore.roles.add(config.erkek3);
 
  }, 2000);
  setTimeout(function() {
    lore.setNickname(Tagisim);
    lore.roles.remove(config.unregister1);
    lore.roles.remove(config.unregister2);
  }, 3000);

  db.push(`users.${lore.user.id}.registerLog`, [
    {
      tarih: Date.now(),
      isim: `${nick} ${yas}`,
      rol: `<@&${config.erkek}>`
    }
  ]);

  db.add(`${message.guild.id}.${message.author.id}.kayıtSorgu_`, 1);

  if (db.get(`users.${lore.user.id}.registerLog`) ? true : false) {
    let embed = new Discord.MessageEmbed().setColor("2F3136").setDescription(`
${lore.user} adlı kullanıcı sunucumuza __Erkek__ olarak kayıt edildi.

 **Kullanıcının Toplam \`${db.get(`users.${lore.user.id}.registerLog`) ? db.get(`users.${lore.user.id}.registerLog`).length
        : 0
    }\` Geçmiş İsim Verisi Bulunmakta**\n **Geçmiş İsimler**;\n
`);
    if (db.get(`users.${lore.user.id}.registerLog`) ? true : false) {
      Object.keys(db.get(`users.${lore.user.id}.registerLog`)).forEach(x => {
        embed.description += "`• " + db.get(`users.${lore.user.id}.registerLog`)[x][0].isim +"` " + `(${db.get(`users.${lore.user.id}.registerLog`)[x][0].rol})\n`;
      });
      
 embed.description += `Geçmiş İsimleri Kontrol Etmek İçin .isimler @RK/id Yazıp Kontrol Edebilirsin \n\n Relly ❤️ Kyle. `
  message.channel.send(embed).then(x => x.delete({timeout: 15000}));
  message.react(config.onayemoji);
    }
    if (db.get(`users.${lore.user.id}.registerLog`) ? false : true) {
      let embed = new Discord.MessageEmbed().setColor("2F3136").setDescription(`

  ${lore.user} adlı kullanıcı başarılı bir şekilde __Erkek__ olarak kayıt edildi.
  
  :dnd: Kişinin veri tabanında kayıtlı verisi bulunamadı.
`);

      message.channel.send(embed).then(x => x.delete({timeout: 15000}));
      message.react(config.onayemoji);
    }
  }
  client.channels.cache.get(config.chatkanalı).send(`${lore} \`Sunucumuza hoş geldin seninle beraber ${member.guild.memberCount} kişiye ulaştık! sağdaki rol seçme bölümlerinden rolünü seçebilirsin. ✨\``).then(msg => msg.delete({timeout:7000}));
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["erkek","e","erkekk"],
    permLevel: 0
    };
    
    exports.help = {
    name: "erkek",
    description: "[Kayıt Komutu]",
    usage: "erkek"
    };