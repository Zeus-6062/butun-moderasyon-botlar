const Discord = require('discord.js'); //BİR SORUNLA KARŞILAŞIRSANIZ Relly #1784//
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const express = require('express');
const config = require("./config.js");
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const ms = require('ms');
const tags = require('common-tags');
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`Rellynin Komutları ${files.length} bu kdr simdi yuklenio`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`${props.help.name} Eklendi :P`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//------------------------------------------------------------------------------------------------------------\\
client.on("messageDelete", async message => {
    if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
    await db.set(`snipe.${message.guild.id}.${message.channel.id}`, { yazar: message.author.id, yazilmaTarihi: message.createdTimestamp, silinmeTarihi: Date.now(), dosya: message.attachments.first() ? true : false });
    if (message.content) db.set(`snipe.${message.guild.id}.${message.channel.id}.icerik`, message.content);
  });

//------------------------------------------------------------------------------------------------------------\\

  client.on("message", message => {
    if(message.content.toLowerCase() == "tagges") 
    return message.channel.send(("Wio  & #1784"))
});

client.on("message", message => {
  if(message.content.toLowerCase() == ".tag") 
  return message.channel.send(("Wio  & #1784"))
});

client.on("message", message => {
    if(message.content.toLowerCase() == "tag") 
    return message.channel.send(("Wio  & #1784"))
  });

  client.on("message", message => {
    if(message.content.toLowerCase() == "!tag") 
    return message.channel.send(("Wio  & #1784"))
  });

  client.on("message", message => {
    if(message.content.toLowerCase() == "u-tag") 
    return message.channel.send(("Wio  & #1784"))
  });

//------------------------------------------------------------------------------------------------------------\\


const kiltifat = [
  'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
  'Mavi gözlerin, gökyüzü oldu dünyamın.',
  'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
  'Huzur kokuyor geçtiğin her yer.',
  'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
  'Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.',
  'Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.',
   'Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.',
   'Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.',
   'Etkili gülüş kavramını ben senden öğrendim.',
   'Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.',
   'Gözlerinle baharı getirdin garip gönlüme.',
   'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
   'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
   'Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.',
   'Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.',
   'Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.',
   'Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.',
   'Aynı zaman diliminde yaşamak benim için büyük ödüldür.',
  'Biraz Çevrendeki İnsanları Takarmısın ?',
  'İğrenç İnsansın!',
   'Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.',
   'Onu Bunu Boşver de bize gel 2 bira içelim.',
    'Taş gibi kızsın ama okey taşı… Elden elde gidiyorsun farkında değilsin.',
    'Kyle seni çok seviyor...',
    'Mucizelerden bahsediyordum.',
];
client.on("message", async message => {
  if(message.channel.id !== (config.chatkanalı)) return;
  let Knavedev = db.get('chatiltifat');
  await db.add("chatiltifat", 1);
  if(Knavedev >= 60) {
    db.delete("chatiltifat");
    const random = Math.floor(Math.random() * ((kiltifat).length - 1) + 1);
    message.reply(`${(kiltifat)[random]}`);
  };
});

  //------------------------------------------------------------------------------------------------------------\\

  client.on("userUpdate", async function(oldUser, newUser) {
    const guildID = "830410002601738250"//sunucu
    const roleID = "831509652768161832"//taglırolü
    const tag = "Wio"//tag
    const chat = '830411404942901249'// chat
    const log2 = '830411409640259614' // log kanalı
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp();
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(` ${newUser} isminden \`${tag}\` çıakrtarak ailemizden ayrıldı!`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(`Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(${tag})`)
            client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} ismine \`${tag}\` alarak ailemize katıldı`))
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == "1784" && newUser.discriminator !== "1784") {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} etiketinden \`1784\` çıakrtarak ailemizden ayrıldı!`))
        } else if (oldUser.discriminator !== "1784" && newUser.discriminator == "1784") {
            member.roles.add(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} etiketine \`1784\` alarak ailemize katıldı`))
            client.channels.cache.get(chat).send(`Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(#1784)`)
        }
    }
  
  })

  //------------------------------------------------------------------------------------------------------------\\
////   Sunucuya Katıldıhındaki Tag Rol Kısmı
client.on("guildMemberAdd", member => {
  const lorewebhook = new Discord.WebhookClient('830698134853517332', 'AE4f1VmxbWyMojaodO4f8haQN2XVIe2ajaoPhv9sVuM3bjSgd5mHzzyU-gGv2XW4M0iw')

  let sunucuid = "830410002601738250"; 
  var tag = '•';
  let rol = "830411338748526603";
if(member.user.username.includes(tag)){
member.roles.add(rol)
}  
})
client.on("guildMemberAdd", async member => {
  let muteData = db.get(`${member.guild.id}.${member.id}.mute`)
  let log_channel = member.guild.channels.cache.find(x => x.name === "mute-log");
const mutelogs = new Discord.WebhookClient(config.mutelogid, config.mutelogtoken)

  if(muteData) {
      member.roles.add("830411350651174935") //Muted ID
      mutelogs.send(new Discord.MessageEmbed().setColor('RANDOM').setTitle('Susturulma Bildirimi').setDescription(`**${member.user.tag}** isimli kullanıcı, susturma cezasını kaldırmak amaçlı sunucuda çık gir yaptı!\n \n\`\`\`Susturulma Sebebi: ${muteData}\`\`\``).setFooter(member.guild.name, member.guild.iconURL).setTimestamp())
  }
})

client.on("guildMemberAdd", member => {  
 const lorewebhook = new Discord.WebhookClient('830698134853517332', 'AE4f1VmxbWyMojaodO4f8haQN2XVIe2ajaoPhv9sVuM3bjSgd5mHzzyU-gGv2XW4M0iw')
      
   
   let user = client.users.cache.get(member.id);
      require("moment-duration-format");
       const kurulus = new Date().getTime() - user.createdAt.getTime();  
   const gecen = moment.duration(kurulus).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
     
  
    moment.locale("tr");
  lorewebhook.send("Selam <@" + member + "> - (\`"+member.id+"\`) \`Wio#1784\` Hoş Geldin.  \n\n  <a:wio_yildiz:830717291644977163> Hesabını `" +gecen+ "` oluşturmuşsun.  \n\n  <a:wio_yildiz:830717291644977163> Kayıt olmak için **V.Confirmed** odalarına girip ses teyit vermen gerekiyor <@&830714455980638209> yetkililerimiz seninle ilgilenecektir! \n\n  <a:wio_yildiz:830717291644977163> Sunucu kurallarımız <#830411379776421908> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğun varsayılarak gerçekleştirilecektir. **Wio** veya **#1784** taglarımızdan birini alarak kayıt olabilirsiniz. \n\n  <a:wio_yildiz:830717291644977163> Seninle birlikte  **" + member.guild.memberCount + "** üyeye ulaştık.İyi eğlenceler! :tada: :tada: :tada: ");
  member.setNickname(`• İsim | Yaş`);
});


      //------------------------------------------------------------------------------------------------------------\\

      

//------------------------------------------------------------------------------------------------------------\\
Date.prototype.tarihgetir = function (format) {
  let date = this,
  day = date.getDate(),
  weekDay = date.getDay(),
  month = date.getMonth(),
  year = date.getFullYear(),
  hours = date.getHours(),
  minutes = date.getMinutes(),
  seconds = date.getSeconds();
  
  let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
  let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");
  
  if (!format) {
  format = "dd MM yyyy";
  };
  format = format.replace("mm", month.toString().padStart(2, "0"));
  format = format.replace("MM", monthNames[month]);
    
  if (format.indexOf("yyyy") > -1) {
  format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
  format = format.replace("yy", year.toString().substr(2, 2));
  };
    
  format = format.replace("dd", day.toString().padStart(2, "0"));
  format = format.replace("DD", dayNames[weekDay]);
  
  if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("hh") > -1) {
  if (hours > 12) hours -= 12;
  if (hours === 0) hours = 12;
  format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
  };
  if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
  return format;
  };

//------------------------------------------------------------------------------------------------------------\\s
  client.on("guildMemberRemove", async member => {
    db.set(`isim.${member.id}`, member.displayName) 
      });

client.on("guildMemberAdd", async member => {
let nick = await db.get(`isim.${member.id}`)
  await member.setNickname(nick)
await db.delete(`isim.${member.id}`);
});
//------------------------------------------------------------------------------------------------------------\\

//------------------------------------------------------------------------------------------------------------\\

client.on('voiceStateUpdate', (oldMember, newMember) => {
  { 
    let giriş = client.channels.cache.get(config.voicegiriş);
    let çıkış = client.channels.cache.get(config.voiceçıkış);
    let odadeğişme = client.channels.cache.get(config.voicetransfer);
    let logKanali = client.channels.cache.get(config.voicelog);
    let susturma = client.channels.cache.get(config.voiceselfmute);
    let sağırlaştırma = client.channels.cache.get(config.voiceselfdeaf);

    if (oldMember.channelID && !oldMember.serverMute && newMember.serverMute) return logKanali.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda yetkili tarafından **susturdu!**`).catch();
    if (!oldMember.channelID && newMember.channelID) return giriş.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanala **katıldı!**`).catch();
    if (oldMember.channelID && !newMember.channelID) return çıkış.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(oldMember.channelID).name}\` adlı sesli kanaldan **ayrıldı!**`).catch();
    if (oldMember.channelID && newMember.channelID && oldMember.channelID != newMember.channelID) return odadeğişme.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi ses kanalını **değiştirdi!** (\`${newMember.guild.channels.cache.get(oldMember.channelID).name}\` => \`${newMember.guild.channels.cache.get(newMember.channelID).name}\`)`).catch();
    if (oldMember.channelID && oldMember.selfMute && !newMember.selfMute) return susturma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendi susturmasını **kaldırdı!**`).catch();
    if (oldMember.channelID && !oldMember.selfMute && newMember.selfMute) return susturma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendini **susturdu!**`).catch();
    if (oldMember.channelID && oldMember.selfDeaf && !newMember.selfDeaf) return sağırlaştırma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendi sağırlaştırmasını **kaldırdı!**`).catch();
    if (oldMember.channelID && !oldMember.selfDeaf && newMember.selfDeaf) return sağırlaştırma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendini **sağırlaştırdı!**`).catch();
  };
});   
//------------------------------------------------------------------------------------------------------------\\
client.on('messageDelete', (message) => {
  if (!message.guild || message.author.bot || message.content.startsWith("prefix")) return;
  const embed = new Discord.MessageEmbed()
    .setAuthor("Mesaj Silindi", message.author.avatarURL({dynamic: true}))
    .addField("🔹 **Mesaj Sahibi**",`${message.author.tag}`, true)
    .addField("🔹 **Mesaj Kanalı**",`${message.channel}`, true)
    .addField("🔹 **Mesaj Silinme Tarihi**",`**${moment().format('LLL')}**`, true)
    .setDescription(`🔹 **Silinen mesaj:** \`${message.content.replace("`", "")}\``)
    .setTimestamp()
    .setColor("#00a3aa")
    .setFooter("Mesaj silindiği saat:")
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
 return client.channels.cache.get("830411408771383326").send(embed)
})
//------------------------------------------------------------------------------------------------------------\\
client.on('messageUpdate', (oldMessage, newMessage) => {
  if (!oldMessage.guild || oldMessage.author.bot || oldMessage.content.startsWith(ayarlar.prefix)) return;
  if(oldMessage.content == newMessage.content) return
  const embed = new Discord.MessageEmbed()
     .setAuthor("Mesaj Güncellendi", oldMessage.author.avatarURL({dynamic: true}))
    .addField("🔹 **Mesahh sahibi**",`${oldMessage.author.tag}`, true)
    .addField("🔹 **Mesaj Kanalı**",`${oldMessage.channel}`, true)
    .addField("🔹 **Mesaj Düzenlenmme Tarihi**",`**${moment().format('LLL')}**`, true)
    .setDescription(`🔹 \`Old Message:\` **${oldMessage.content.replace("`", "")}** \n🔹 \`New Message:\` **${newMessage.content.replace("`", "")}** `)
    .setTimestamp()
    .setColor("#070030")
    .setFooter("Mesaj Düzenlendiği saat:")
    .setThumbnail(oldMessage.guild.iconURL({ dynamic: true }))
 return client.channels.cache.get("830411408771383326").send(embed)
})
//------------------------------------------------------------------------------------------------------------\\

//-----------------------GİRENE-ROL-VERME----------------------\\     

client.on("guildMemberAdd", member => {
  member.roles.add('831512880943595580'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});
//-----------------------GİRENE-ROL-VERME----------------------\\     

client.on("guildMemberAdd", member => {
  member.roles.add('831512952199839764'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});
//-----------------------GİRENE-ROL-VERME----------------------\\     

client.on("guildMemberAdd", member => {
  member.roles.add('830411341599735868'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});



//----------------------AFK MAİN KISMI----------------------\\     
client.on("message" , async msg => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
 
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)    
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@`+ msg.author.id+`> Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`))
   }
 }
  if(msg.author.id === kisi){
       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@${kisi}> Başarıyla Afk Modundan Çıktınız`))
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
    msg.member.setNickname(isim)
  }
  
});


//----------------------AFK MAİN KISMI----------------------\\     
