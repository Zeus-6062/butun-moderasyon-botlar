const Discord = require("discord.js")
const db = require("quick.db");
const config = require("../config.js");
module.exports.run = async (client, message, args, params) => {

    let embed = new Discord.MessageEmbed().setColor("RANDOM").setFooter("RK was here", message.author.avatarURL({dynamic: true})).setTimestamp().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
    let crews = db.get(`crews.${message.guild.id}`) || [];
    let crewPage = crews.length > 0 ? crews.map((value) => `
    Ekip Adı: \`${value.EkipAdı}\`
    Ekip Tagları: (\`${value.EkipAdı}\` - \`${value.Sayısı}\`)
    Ekip Yöneticisi: <@!${value.Yöneticisi}>
    Katılım Tarihi: \`${new Date(value.KatılmaTarihi).tarihgetir()}\`
    Ekip Rolü: <@&${value.EkipRolu}>
    `).join("\n") : `Sunucumuzda ekip bulunmuyor.`;
    
    let secim = args[0];
    if (!secim) return message.channel.send(embed.setDescription(`
    **ekip** \`-\` Yardım menüsünü gösterir.
    **ekip ekle** \`-\` Yeni bir ekip eklersiniz.
    **ekip liste** \`-\` Ekipleri listelersiniz.
    **ekip bilgi** \`-\` Ekip bilgileri.
    **ekip kontrol** \`-\` Ekip kontrol.
    **ekip sil** \`-\` Mevcut bir ekibi silersiniz.
    `)).then(x => x.delete({ timeout: 15000 }));;
    let tag = args[1];
    let sayitagi = args[2];
    let yönetici = message.mentions.members.first() || message.guild.members.cache.get(args[3]);
      
    let veriTabani = db.fetch(`ekipler.${message.guild.id}`)
      
    if (secim === "ekle") {
    if (!tag) return message.channel.send(embed.setDescription(`Geçerli bir tag belirtmelisin. (kullanım; \`ekip ekle tag sayıtagı yönetici\`!)`)).then(x => x.delete({ timeout: 7500 }));
    if (!sayitagi || isNaN(sayitagi)) return message.channel.send(embed.setDescription(`Geçerli bir sayı tagı belirtmelisin.`)).then(x => x.delete({ timeout: 5000 }));
    if (!yönetici) return message.channel.send(embed.setDescription(`Ekibin yöneticisini etiketlemelisin. (kullanım; \`ekip ekle tag sayıtagı yönetici\`!)`)).then(x => x.delete({ timeout: 5000 }));
    
    message.guild.roles.create({
            data: {
              name: `${tag} #${sayitagi}`,
              color: "RANDOM",
              mentionable: false
            },
            reason: "Ekip Rolü Kuruldu!"
          }).then(role => {
    db.push(`crews.${message.guild.id}`, {EkipAdı: tag, Sayısı: sayitagi || "Yok!", Yöneticisi: yönetici.id, KatılmaTarihi: Date.now(), EkipRolu: role.id})
    db.set(`ekipler.${tag}.${message.guild.id}`, {EkipAdı: tag, Sayısı: sayitagi || "Yok!", Yöneticisi: yönetici.id, KatılmaTarihi: Date.now(), EkipRolu: role.id})
    message.channel.send(embed.setDescription(`
    **${tag}** adında bir ekip oluşturuldu!
    
    **Detaylı bilgiler:**
    \`Ekip Tagı:\` ${tag}
    \`Ekip Tagı(Sayı):\` ${sayitagi}
    \`Ekip Yöneticisi:\` ${yönetici}
    \`Ekibin sunucuya katılma tarihi:\` ${new Date(Date.now()).tarihgetir()}
    \`Ekip Rolü:\` <@&${role.id}>
    
    **Ekip Tagındaki Kişi Sayısı:**
    \`Yazılı(${tag}):\` ${message.guild.members.cache.filter(m => m.user.username.toLowerCase().includes(tag)).size}
    \`Sayı(${sayitagi}):\` ${message.guild.members.cache.filter(m => m.user.discriminator.includes(sayitagi)).size}
    
    Toplamda ${message.guild.members.cache.filter(m => m.user.discriminator.includes(sayitagi)).size + message.guild.members.cache.filter(m => m.user.username.toLowerCase().includes(tag)).size} kişiye <@&${role.id}> rolü dağıtılıyor!
    `))
    message.guild.members.cache.forEach(qwe => {
    if (qwe.user.username.includes(tag)) {
    qwe.roles.add(role.id)
    }
    })
    message.guild.members.cache.forEach(qwe => {
    if (qwe.user.discriminator.includes(sayitagi)) {
    qwe.roles.add(role.id)
    }
    })
    
    })
    }
      
    if (secim === "liste") {
    message.channel.send(embed.setDescription(`
    Sunucumuzda Toplam \`${crews.length || "0"}\` adet ekip var!
    
    ${crewPage}
    `))
    }
  
    if (secim === "bilgi") {
    if(!tag) return message.channel.send(embed.setDescription("Bir tag belirtmelisin.")).then(x => x.delete({ timeout: 3500 }));
    let ekipler = db.fetch(`ekipler.${tag}.${message.guild.id}`)
    if(!ekipler) return message.channel.send(embed.setDescription("Geçerli bir ekip belirtmelisin.")).then(x => x.delete({ timeout: 3500 }));
    message.channel.send(embed.setDescription(`
    **${ekipler.EkipAdı}** ekibinin bilgileri gösteriliyor!
    
    \`Ekip Tagı:\` ${ekipler.EkipAdı}
    \`Sayı Tagı:\` ${ekipler.Sayısı}
    \`Yöneticisi:\` ${message.guild.members.cache.get(ekipler.Yöneticisi) || message.guild.members.cache.get(ekipler.Yöneticisi).user.tag}
    \`Katılım Tarihi:\` \`${new Date(ekipler.KatılmaTarihi).tarihgetir()}\`
    \`Ekibin Rolü:\` <@&${ekipler.EkipRolu}>
    `)) 
    }
      
    if (secim === "kontrol") { 
    if(!tag) return message.channel.send(embed.setDescription("Bir tag belirtmelisin."))
    let ekipler = db.fetch(`ekipler.${tag}.${message.guild.id}`)
    if(!ekipler) return message.channel.send(embed.setDescription("Geçerli bir ekip belirtmelisin.")).then(x => x.delete({ timeout: 3500 }));
    message.channel.send(embed.setDescription(`
    **${ekipler.EkipAdı}** kontrol ediliyor..
    Yöneticisi: ${message.guild.members.cache.get(ekipler.Yöneticisi) || message.guild.members.cache.get(ekipler.Yöneticisi).user.tag}
    Yönetici: ${message.guild.members.cache.get(ekipler.Yöneticisi).voice.channelID ? "Ekip yöneticisi seste!":"Ekip yöneticisi seste değil!"}
    \`Seste Olan Kişi Sayısı(Yazılı Tag):\` ${message.guild.members.cache.filter(s => s.user.username.toLowerCase().includes(ekipler.EkipAdı)).filter(s => s.voice.channel).size || "0"}
    \`Seste Olan Kişi Sayısı(Sayılı Tag):\` ${message.guild.members.cache.filter(s => s.user.discriminator.includes(ekipler.Sayısı)).filter(s => s.voice.channel).size || "0"}
    \`Seste Olan Kişi Sayısı(Toplam):\` ${message.guild.members.cache.filter(s => s.user.discriminator.includes(ekipler.Sayısı)).filter(s => s.voice.channel).size + message.guild.members.cache.filter(s => s.user.username.includes(ekipler.EkipAdı)).filter(s => s.voice.channel).size || 0}
    `)) 
    } 
      
    if (secim === "sil") { 
    if(!tag) return message.channel.send(embed.setDescription("Bir tag belirtmelisin."))
    let ekipler = db.fetch(`ekipler.${tag}.${message.guild.id}`)
    if(!ekipler) return message.channel.send(embed.setDescription("Geçerli bir ekip belirtmelisin.")).then(x => x.delete({ timeout: 3500 }));
    message.channel.send(embed.setDescription(`
    **${ekipler.EkipAdı}** isimli ekip silindi.
    
    **${message.guild.roles.cache.get(ekipler.EkipRolu).name || "Silinen Rol"}** isimli rol silindi.
    
    ${message.guild.members.cache.get(ekipler.Yöneticisi) || "Ekip Yöneticisine"} ekibinin sunucumuzdan ayrıldığı bildirildi.
    `)) 
    message.guild.members.cache.get(ekipler.Yöneticisi).send(embed.setDescription(`
    **${ekipler.EkipAdı}** isimli ekibin **${message.guild.name}** isimli sunucudan ayrıldı!
    `))
    message.guild.roles.cache.get(ekipler.EkipRolu).delete({reason: "Ekip Ayrıldı!"});
    db.delete(`ekipler.${tag}.${message.guild.id}`)
    } 
    };
    exports.conf = {
      enabled: true,
      guildOnly: false,
      aliases: ["ekip"],
      permLevel: 0
      };
      
      exports.help = {
      name: "ekip",
      description: "[Admin Komutu]",
      usage: "ekip"
      };

