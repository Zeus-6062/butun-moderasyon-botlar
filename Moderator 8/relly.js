const Discord = require('discord.js');
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
    log(`Kylenin Komutları ${files.length} bu kdr simdi yuklenio`);
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
  client.on("message", message => {
    if(message.content.toLowerCase() == ".link") 
    return message.channel.send(("https://discord.gg/gsVBhGTKzh"))
  });


//------------------------------------------------------------------------------------------------------------\\


const kiltifat = [
  "Sonra mucize diye bir şeyden bahsettiler. Gözlerin geldi aklıma.",
  "Mucizelerden bahsediyordum. Tam o sırda gözlerin geldi aklıma.",
  "Benim için mutluluğun tanımı, seninle birlikteyken geçirdiğim vakittir.",
  "Mavi gözlerin, gökyüzü oldu dünyamın.",
  "Seni gören kelebekler, narinliğin karşısında mest olur.",
  "Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.",
  "Huzur kokuyor geçtiğin her yer.",
  "En güzel manzaramsın benim, seyretmeye doyamadığım.",
  "Seni kelimeler ile anlatmak çok zor. Muhteşem desem yine eksik kalıyor anlamın.",
  "Bu kadar muhteşem olamaz bir insan. Bu kadar kusursuz bu kadar mükemmel.. Kirpiklerinin dizilişi bile sırayla senin.",
  "Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.",
  "Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.",
  "Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.",
  "Aşk acı ise sen niye tatlısın ?",
  "Mutluluk nedir dediler, yanında geçirdiğim anların anlamını anlatamadım.",
  "Bugün yine o kadar güzelsin ki, gözlerim kamaştı.",
  "Güneş mi doğdu yoksa sen mi uyandın?",
  "Bir gülüşün etrafa ışıklar saçtığını sen de gördüm.",
  "O gülüşündeki gamze olmak isterim güzelliğine güzellik katmak için...",
  "Seni yaşarken yanımda nesneler görünmez yanında, sana küçük buseler atarken hayatla bağlantım kopar o an...",
  "Yürüdüğün yol olmak isterim, hiç aksamadan seni yürütmek için bu hayatta...",
  "Bu mesajımı sana kalbimin en şiddetli sesiyle yolluyorum, seni seviyorum...",
  "Seni özlediğim kadar kimseyi özlemedim, gecelerim kıskanır oldu artık sana çektiğim hasreti biriciğim...",
  "Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.",
  "Mutluluk nedir sorusuna cevabımsın.",
  "Biraz kilo mu verdin sen? Zayıflamış görünüyorsun. ;)",
  "Kimselere söyleme. Ben ‘Seni’ yazarım, onlar şiir zanneder.",
  "İnsan seni sevince iş güç sahibi oluyor,Bot oluyor mesela.",
  "Mutluluk ne diye sorsalar- cevabı gülüşünde ve o sıcak bakışında arardım.",
  "Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.",
  "Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın.",
  "Sesini duymaktan- hikayelerini dinlemekten asla bıkmayacağım. Konuşmaktan en çok zevk aldığım kişi sensin.",
  "Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
  "Çok yorulmuş olmalısın. Bütün gün aklımda dolaşıp durdun.",
  "Çocukluk yapsan da gönlüme senin için salıncak mı kursam?",
  "Sen birazcık huzur aradığımda gitmekten en çok hoşlandığım yersin.",
  "Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...",
  "Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.",
  "Telaşımı hoş gör, ıslandığım ilk yağmursun.",
  "Gülüşün ne güzel öyle- cumhuriyetin gelişi gibi...",
  "Yaşanılacak en güzel mevsim sensin.",
  "Sıradanlaşmış her şeyi, ne çok güzelleştiriyorsun.",
  "Gönlüm bir şehir ise o şehrin tüm sokakları sana çıkar.",
  "Birilerinin benim için ettiğinin en büyük kanıtı seninle karşılaşmam.",
  "Denize kıyısı olan şehrin huzuru birikmiş yüzüne.",
  "Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.",
  "Gece yatağa yattığımda aklımda kalan tek gerçek şey sen oluyorsun.",
  "Ne tatlısın sen öyle. Akşam gel de iki bira içelim.",
  "Bir gamzen var sanki cennette bir çukur.",
  "Gecemi aydınlatan yıldızımsın.",
  "Ponçik burnundan ısırırım seni",
  "Bu dünyanın 8. harikası olma ihtimalin?",
  "fıstık naber?",
  "Dilek tutman için yıldızların kayması mı gerekiyor illa ki? Gönlüm gönlüne kaydı yetmez mi?",
  "Süt içiyorum yarım yağlı, mutluluğum sana bağlı.",
  "Müsaitsen aklım bu gece sende kalacak.",
  "Gemim olsa ne yazar liman sen olmadıktan sonra...",
  "Gözlerimi senden alamıyorum çünkü benim tüm dünyam sensin.",
  "Sabahları görmek istediğim ilk şey sensin.",
  "Gözlerinle baharı getirdin garip gönlüme.",
  "Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.",
  "Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.",
  "Sen benim yanımda olduğun sürece benim nerde olduğum hiç önemli değil .Kokunu aldığım her yer cennet bana.",
  "Seni her yerde görebileceğim arzusu, belki de bu hayattaki tek yaşama sebebim.",
  "Ateş gibi yakıyorsun ruhun ile beni. Gözlerin adeta ejderha, alev yayıyor etrafa.",
  "Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.",
  "Sen bu dünyadaki 7 harikadan bile daha harika bir varlıksın. Sen gönlümün ebedi sultanısın.",
  "Aynı zaman diliminde yaşamak benim için büyük ödüldür.",
  "Seni de bu dünyada görünce yaşama sebebimi anladım. Meğer senmişsin beni dünyada yaşamaya zorlayan.",
  "Melek yüzünü gördüğüm ilk an benim olmanı diledim. Şimdi benimsin ve bu bugüne kadar başıma gelen en güzel şey.",
  "Sen benim kabul olmuş en büyük duamsın.",
  "Annemden daha iyi yemek yapıyorsun. :)",
  "Gamzen varsa, aksesuarların en güzeli sende demektir.",
  "Sen benim düşlerimin surete bürünmüş halisin.",
  "Mükemmeli sende gördüm ben.",
  "Gece nasıl sabahı bekliyorsa aydınlanmak için ben de seni öyle bekliyorum.",
  "Gülüşünde nice ilaçlar var yarama merhem olan.",
  "Bir sahil kasabasının huzuru birikmiş yüzüne.",
  "Şey gözlerin çok güzelmiş tanışalım mı ?",
  "sen beni bir de sevgilinken gör",
  "birbirimizi çift görmem için kaç duble daha içmeliyim?",
  "8 milyar gülüş varken seninki favorim",
  "artık benimsin",
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
//Main
client.on("messageDelete", async message => {
  const cdb = require("orio.db")
      if (message.author.bot) return;
      if (message.content.length > "200") {
          cdb.push(`snipe.${message.guild.id}`, {
              authors: message.author.username,
              contents: "Silinen mesaj 200 karakteri aşıyor!",
              tarih: Date.now()
          })
      } else {
          cdb.push(`snipe.${message.guild.id}`, {
              authors: message.author.username,
              contents: message.content,
              tarih: Date.now()
          })
      }
  })
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
const { CronJob } = require("cron");
const Job = new CronJob("00 00 8 * * *", function() {
client.channels.cache.get(config.chatkanalı).send('\`>\` Günaydınlarrr \n\`>\` Gününüz aydın olması dilegiyle seviliyorsunuz')
}, null, true, "Europe/Istanbul");
Job.start();

const Jobb = new CronJob("00 00 00 * * *", function() {
  client.channels.cache.get(config.chatkanalı).send(`**───────────────────────────────────────**\n\`>\` Bugün de bitti, yeni gününüz sevdiklerinizle mutlu geçsin!\n\`>\`  Şunu asla unutmayın ki seviliyorsunuz ve değerlisiniz. İyi geceler!\n**───────────────────────────────────────**\n**[00.00]** https://cdn.discordapp.com/attachments/797858174605590568/810075975693107232/33CYhED.gif`);
  }, null, true, "Europe/Istanbul");
  Jobb.start();

 //------------------------------------------------------------------------------------------------------------\\ 
//botdmlog
client.on("message", async message => {
  if(message.author.id === client.user.id) return;
  if(message.guild) return;
  client.channels.cache.get('818488170412638209').send(new Discord.MessageEmbed().setAuthor("Bir Dm Geldi", client.user.avatarURL()).setFooter(message.author.tag, message.author.avatarURL()).setDescription(`**Gönderenin ID:** ${message.author.id}`).setTimestamp().addField("Mesaj", message.content).setColor("RANDOM"))
})
//------------------------------------------------------------------------------------------------------------\\ 
// spoengel
client.on("message", async reawenyazdimqwe => {

  let spotifyEngel = await db.fetch("spotifyEngel");
  let reawEmbed = new Discord.MessageEmbed().setAuthor(reawenyazdimqwe.member.displayName, reawenyazdimqwe.author.avatarURL({dynamic: true})).setFooter("Relly", reawenyazdimqwe.guild.iconURL({dynamic: true})).setColor("010000")
  
  if (!spotifyEngel) return;
  
  if (spotifyEngel) {
  if (!reawenyazdimqwe.activity) return;
  if (reawenyazdimqwe.activity.partyID.startsWith("spotify:")) {
  reawenyazdimqwe.delete();
  reawenyazdimqwe.channel.send(reawEmbed.setDescription(`:no_entry_sign: Spotify parti daveti paylaşmak yasak!`));
  }
  }
  })
//------------------------------------------------------------------------------------------------------------------------//
// snipe
const {MessageEmbed}= require("discord.js"); 
client.on("messageDelete", async(message) => {
  if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
let snipe = {
mesaj: message.content,
mesajyazan: message.author.id,
ytarihi: message.createdTimestamp,
starihi: Date.now(), 
kanal: message.channel.id
}
await db.set(`snipe.${message.guild.id}`, snipe)
});
//-------------------------------------------------------------------------------------------//
// küfürengel
client.on("message", async msg => {
  
  
  const i = await db.fetch(`kufur_${msg.guild.id}`)
     if (i == "acik") {
         const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq","amguard","seksüel","sekssüel","sg","oruspuçocu","annenisikiyim","babanısikiyim"];
         if (kufur.some(word => msg.content.includes(word))) {
           try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                   msg.delete();
                           
                       return msg.channel.send(new Discord.MessageEmbed().setDescription(`${msg.author} **KÜFÜR ETMEMELİSİN!**`).setColor('0x800d0d').setAuthor(msg.member.displayName, msg.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
   
             }              
           } catch(err) {
             console.log(err);
           }
         }
     }
     if (!i) return;
 });
 
 client.on("messageUpdate", (oldMessage, newMessage) => {
   
   
  const i = db.fetch(`${oldMessage.guild.id}.kufur`)
     if (i) {
         const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq","amguard","seksüel","sekssüel","sg","oruspuçocu","annenisikiyim","babanısikiyim"];
         if (kufur.some(word => newMessage.content.includes(word))) {
           try {
             if (!oldMessage.member.hasPermission("BAN_MEMBERS")) {
                   oldMessage.delete();
                           
                       return oldMessage.channel.send(new Discord.MessageEmbed().setDescription(`${oldMessage.author} **KÜFÜR ETMEMELİSİN!**`).setColor('0x800d0d').setAuthor(oldMessage.member.displayName, oldMessage.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
   
             }              
           } catch(err) {
             console.log(err);
           }
         }
     }
     if (!i) return;
 });
 //---------------------------------------------------------------------------------------------------//
 // reklamengel
 client.on("message", msg => {
  if(!db.has(`reklam_${msg.guild.id}`)) return;
         const reklam = [".com", ".net", ".tk", ".xyz", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
         if (reklam.some(word => msg.content.includes(word))) {
           try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                   msg.delete();
                   return msg.channel.send(new Discord.MessageEmbed().setDescription(`${msg.author} **REKLAM YAPMAMALISIN!**`).setColor('0x800d0d').setAuthor(msg.member.displayName, msg.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
    
  
   msg.delete(5000);                              
  
             }              
           } catch(err) {
             console.log(err);
           }
         }
     });
 //----------------------------------------------------------------------------------//
client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
    if(msg.author.bot) return;  
      if (msg.content.length > 4) {
       if (db.fetch(`capslock_${msg.guild.id}`)) {
         let caps = msg.content.toUpperCase()
         if (msg.content == caps) {
           if (!msg.member.hasPermission("ADMINISTRATOR")) {
             if (!msg.mentions.users.first()) {
               msg.delete()
               return msg.channel.send(new Discord.MessageEmbed().setDescription(`${msg.author} **BÜYÜK HARFLE KONUŞMAMALISIN!**`).setColor('0x800d0d').setAuthor(msg.member.displayName, msg.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
   }
     }
   }
 }
}
});
///------------------------------------------------ETİKET

client.on('message', async message => {
  let etiketengelle = await db.fetch(`etiketengel_${message.guild.id}`)
  if(etiketengelle) {
  let Güvenli = db.fetch(`karaL.${message.member.id}_${message.guild.id}`)
  if(Güvenli) return;
  var log = db.fetch(`log_${message.guild.id}`)
  var logcuk = message.guild.channels.cache.get(log)
  var rol = db.fetch(`muted_${message.guild.id}`)
  var rolcük = message.guild.roles.cache.get(rol)
  if(!message.guild) return
  if(message.author.id === message.guild.owner.id) return
  if(message.member.permissions.has("ADMINISTRATOR")) return;
  if(message.mentions.users.size >= 3) {
  await message.delete()
  client.channels.cache.get(log).send(new MessageEmbed().setTimestamp().setColor("RANDOM").setTitle(`${emojis.çarpı} __Dikkat!__`).setDescription(`${message.author} - (\`${message.author.id}\`) adlı üye, ${message.channel} - (\`${message.channel.id}\`) kanalında insanları etiketleyerek rahatsız ettiği için ${rolcük} rolünü verdim!`).setFooter(`Chat Protection ❤️ ${message.guild.name}`))
  message.channel.send(new MessageEmbed().setColor("RANDOM").setTitle(`${emojis.çarpı} __Dikkat!__`).setDescription(`${message.author}, bu sunucuda \`Etiket\` engeli bulunmakta. İnsanları etiketleyerek rahatsız ettiğin için sana ${rolcük} rolünü verdim ${emojis.ünlem}`).setFooter(`Chat Protection ❤️ ${message.guild.name}`)).then(x => x.delete({timeout: 5000}));
  message.member.roles.add(rolcük)
}
}})

client.on('messageUpdate', async (old, neww) => {
  let etiketengelle = await db.fetch(`etiketengel_${neww.guild.id}`)
  if(etiketengelle) {
  let Güvenli = db.fetch(`karaL.${neww.member.id}_${neww.guild.id}`)
  if(Güvenli) return;
  var log = db.fetch(`log_${neww.guild.id}`)
  var logcuk = neww.guild.channels.cache.get(log)
  var rol = db.fetch(`muted_${neww.guild.id}`)
  var rolcük = neww.guild.roles.cache.get(rol)
  if(!neww.guild) return
  if(neww.author.id === neww.guild.owner.id) return
  if(neww.member.permissions.has("ADMINISTRATOR")) return;
  if(neww.mentions.users.size >= 3) {
  await neww.delete()
  client.channels.cache.get(log).send(new MessageEmbed().setTimestamp().setColor("RANDOM").setTitle(`${emojis.çarpı} __Dikkat!__`).setDescription(`${neww.author} - (\`${neww.author.id}\`) adlı üye, ${neww.channel} - (\`${neww.channel.id}\`) kanalında  mesajını editleyerek insanları etiketledi rahatsız ettiği için ${rolcük} rolünü verdim!`).setFooter(`Chat Protection ❤️ ${neww.guild.name}`))
  neww.channel.send(new MessageEmbed().setColor("RANDOM").setTitle(`${emojis.çarpı} __Dikkat!__`).setDescription(`${neww.author}, bu sunucuda \`Etiket\` engeli bulunmakta. Mesajını editleyerek insanları etiketledin ve rahatsız ettiğin için sana ${rolcük} rolünü verdim ${emojis.ünlem}`).setFooter(`Chat Protection ❤️ ${neww.guild.name}`)).then(x => x.delete({timeout: 5000}));
  neww.member.roles.add(rolcük)
}
}})
