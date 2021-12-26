const { Client, Discord, MessageEmbed, Collection, WebhookClient } = require('discord.js');
const client = global.client = new Client({fetchAllMembers: true});
const moment = require('moment')
global.client = client;
require("moment-duration-format")
moment.locale('tr')
const fs = require("fs");
client.komutlar = new Collection();
client.komut = new Collection();
client.veri = require("./acar/acar-veri.json");
client.sistem = require("./acar/acar-ayar.json");
client.modüller = {}; 
client.altbaslik = client.veri.Tag + " " + client.veri.sunucuUfakIsim + " Developed by Antiperes"
const qDb = require("quick.db");
const db = new qDb.table("ayarlar");
const cezaDb = new qDb.table("aCezalar");
const acarhook = new WebhookClient(client.veri.hosgeldinSistemi.webhookID, client.veri.hosgeldinSistemi.webhookTOKEN);
fs.readdir("./acar/Komutlar", (err, files) => {
    if(err) return console.error(err);
    files = files.filter(file => file.endsWith(".js"));
    console.log(`[ ${files.length} ] Adet  Komutlar Yüklenecek!`);
    files.forEach(file => {
        let referans = require(`./acar/Komutlar/${file}`);
  if(typeof referans.onLoad === "function") referans.onLoad(client);
            client.komutlar.set(referans.Isim, referans);
            if (referans.Komut) {
              referans.Komut.forEach(alias => client.komut.set(alias, referans));
            }
          });
});

  fs.readdir("./acar/Etkinlikler/", (err, files) => {
    if (err) return console.myTime(err);
    files.forEach(fileName => {
      let referans = require("./acar/Etkinlikler/" + fileName);
        referans.onLoad(client);
        client.on(referans.Etkinlik, referans.onRequest);
      console.log(
        ` (${fileName}) isimli etkinlik yüklendi.`
      );
    });
  });
  const küfür = ["amcık","orospu","piç","sikerim","sikik","amına","pezevenk","yavşak","ananı","anandır","orospu","evladı","göt","pipi","sokuk","yarrak","oç","o ç","siktir","bacını","karını","amk","aq","sik","amq","anaskm","AMK","YARRAK","sıkerım"];
client.on('message', async message => {
let kelimeler = message.content.slice(" ").split(/ +/g)
if (küfür.some(word => message.content.toLowerCase().includes(word))) {
if (message.member.hasPermission("BAN_MEMBERS")) return;
//message.delete()
}
});
client.on("messageUpdate", async (oldMsg, newMsg) => {
let kelimeler = newMsg.content.slice(" ").split(/ +/g)
if (küfür.some(word => newMsg.content.toLowerCase().includes(word))) {
if (newMsg.member.hasPermission("BAN_MEMBERS")) return;
//newMsg.delete()
}
});
let reklamlar = ["http://","https://","cdn.discordapp.com","discordapp.com","discord.app", "discord.gg","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf"]

client.on('message', async message => {
let kelimeler = message.content.slice(" ").split(/ +/g)
if (reklamlar.some(word => message.content.toLowerCase().includes(word))) {
if (message.member.hasPermission("BAN_MEMBERS")) return;
message.delete()
}
});
client.on("messageUpdate", async (oldMsg, newMsg) => {
let kelimeler = newMsg.content.slice(" ").split(/ +/g)
if (reklamlar.some(word => newMsg.content.toLowerCase().includes(word))) {
if (newMsg.member.hasPermission("BAN_MEMBERS")) return;
newMsg.delete()
}
});

client.on("message", message => {
  if (message.channel.type === "dm") {
    if (message.author.bot) return;
    const dmlog = new MessageEmbed()
      .setTitle(`${client.user.username}'a Özelden Mesaj Gönderildi!`)
      .setColor("BLUE")
      .addField("Mesajı Gönderen", ` \`\`\` ${message.author.tag} \`\`\` `)
      .addField("Mesajı Gönderenin ID", ` \`\`\`${message.author.id}\`\`\` `)
      .addField(`Gönderilen Mesaj`, message.content)
      .setThumbnail(message.author.avatarURL());
    client.channels.cache.get(client.veri.Kanallar.mesajLogKanali).send(dmlog);
  }
});

  client.on("messageDelete", async (message, channel) => {
if(message.author.bot || message.channel.type === "dm") return;
  
  if (message.author.bot) return;
  
  var user = message.author;
  
  let sChannel2 = message.guild.channels.cache.get(client.veri.Kanallar.mesajLogKanali)
  const embed = new MessageEmbed()
  .setColor("GREEN")
  .setAuthor(`Mesaj silindi.`, message.author.avatarURL())
  .addField("Kullanıcı Tag", message.author.tag, true)
  .addField("Kanal Adı", message.channel.name, true)
  .addField("Silinen Mesaj", "```" + message.content + "```")
  .setThumbnail(message.author.avatarURL())
  .setFooter(`Bilgilendirme  • bügün saat ${message.createdAt.getHours()+3}:${message.createdAt.getMinutes()}`, `${client.user.displayAvatarURL()}`)
  sChannel2.send(embed);
  
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
if(newMessage.author.bot || newMessage.channel.type === "dm") return;
  let sChannel3 = newMessage.guild.channels.cache.get(client.veri.Kanallar.mesajLogKanali)
  if (oldMessage.content == newMessage.content) return;
  let embed = new MessageEmbed()
  .setColor("GREEN")
  .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL())
  .addField("Kullanıcı", newMessage.author)
  .addField("Eski Mesaj", oldMessage.content, true)
  .addField("Yeni Mesaj", newMessage.content, true)
  .addField("Kanal Adı", newMessage.channel.name, true)
  .setThumbnail(newMessage.author.avatarURL())
  .setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours()+3}:${newMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL()}`)
  sChannel3.send(embed)
});


 client.on("message", (message) => {
    if([".link", "!link"].includes(message.content.toLowerCase())){ 
    return message.channel.send(message.client.veri.sunucuDavetLinki); 
    }
    if([".tag", "!tag", "+tag", "tag"].includes(message.content.toLowerCase())){ 
      return message.channel.send("Câss , #0019"); 
    }
      if (message.author.bot ||!message.content.startsWith(client.sistem.a_Prefix) || !message.channel || message.channel.type == "dm") return;
      let args = message.content
        .substring(client.sistem.a_Prefix.length)
        .split(" ");
      let komutcuklar = args[0];
      let bot = message.client;
      args = args.splice(1);
      let calistirici;
      if (bot.komut.has(komutcuklar)) {
        calistirici = bot.komut.get(komutcuklar);
      
        calistirici.onRequest(bot, message, args);
      } else if (bot.komutlar.has(komutcuklar)) {
        calistirici = bot.komutlar.get(komutcuklar);
        calistirici.onRequest(bot, message, args);
      }
});
  client.gecmisTarihHesaplama = (date) => {
    const startedAt = Date.parse(date);
    var msecs = Math.abs(new Date() - startedAt);
  
    const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
    msecs -= years * 1000 * 60 * 60 * 24 * 365;
    const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
    msecs -= months * 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
    msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
    msecs -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msecs / (1000 * 60 * 60));
    msecs -= hours * 1000 * 60 * 60;
    const mins = Math.floor((msecs / (1000 * 60)));
    msecs -= mins * 1000 * 60;
    const secs = Math.floor(msecs / 1000);
    msecs -= secs * 1000;
  
    var string = "";
    if (years > 0) string += `${years} yıl`
    else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
    else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
    else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
    else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
    else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
    else if (secs > 0) string += `${secs} saniye`
    else string += `saniyeler`;
  
    string = string.trim();
    return `\`${string} önce\``;
  };
let anliktarih = Date.now()
let aylartoplam = {
  "01": "Ocak",
  "02": "Şubat",
  "03": "Mart",
  "04": "Nisan",
  "05": "Mayıs",
  "06": "Haziran",
  "07": "Temmuz",
  "08": "Ağustos",
  "09": "Eylül",
  "10": "Ekim",
  "11": "Kasım",
  "12": "Aralık"
};
let aylar = aylartoplam;
client.tarihsel = moment(anliktarih).format("DD") + " " + aylar[moment(anliktarih).format("MM")] + " " + moment(anliktarih).format("YYYY HH:mm")
client.emoji = function(x) {
  return client.emojis.cache.get(x);
};
client.on("guildMemberAdd", async member => {
          if(member.id == client.sistem.a_sID) {
              member.roles.add(client.veri.Roller.botcuRolu) 
              return
          };
          let acarkalkmazban = qDb.get(`akb_${member.guild.id}`)
          if(acarkalkmazban && acarkalkmazban.some(id => `k${member.user.id}` === id)) return;
          let acar = client.veri;
          let acarveri = db.get("ayar") || {};
          let cezalılar = cezaDb.get("cezalı") || [];
          let kalıcıcezalılar = cezaDb.get("kalıcıcezalı") || [];
          let yasakTaglilar = cezaDb.get("yasakTaglilar") || [];
          let kalicisusturulma = cezaDb.get("kalicisusturulma") || [];
          let sürelisusturma = cezaDb.get("susturulma") || [];
          let sessusturulma = cezaDb.get("sessusturulma") || [];
          let guvenili = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
          if (acarveri.yasakTaglar && !acarveri.yasakTaglar.some(tag => member.user.username.includes(tag)) && yasakTaglilar.some(x => x.includes(member.id))) await cezaDb.set('yasakTaglilar', yasakTaglilar.filter(x => !x.includes(member.id)));
           if (acarveri.yasakTaglar && acarveri.yasakTaglar.some(tag => member.user.username.includes(tag))) {
           if(acar.Roller.yasakliTagRolu) member.roles.set([acar.Roller.yasakliTagRolu]).catch();
      if (!yasakTaglilar.some(id => id.includes(member.id))) cezaDb.push('yasakTaglilar', `y${member.id}`);
      member.send(`**${acar.Tag} ${acar.sunucuIsmi}** Yasak tag'da bulunduğunuz için otomatik olarak cezalıya atıldınız tagı çıkartana kadar cezalıda kalmaya devam ediceksin.`).catch();
    } else if (guvenili) {
            if(acar.Roller.supheliRolu) member.roles.set([acar.Roller.supheliRolu]).catch();
            if(acar.Kanallar.supheliLogKanali && member.guild.channels.cache.has(acar.Kanallar.supheliLogKanali)) return;
          } else if(acar.kayıtRolleri.kayıtsızRolleri) member.roles.add(acar.kayıtRolleri.kayıtsızRolleri).catch();
          if(sürelisusturma.some(x => x.id === member.id) || kalicisusturulma.some(x => x.includes(member.id))) member.roles.add(acar.Roller.muteRolu).catch();
          if(sessusturulma.some(x => x.id === member.id) && member.voice.channel) member.voice.setMute(true).catch();
          if(acar.IkinciTag) member.setNickname(`${acar.IkinciTag} İsim | Yaş`).catch();
          else if(acar.Tag) member.setNickname(`${acar.Tag} İsim | Yaş`).catch();
          var gün = moment(member.user.createdAt).format('DD')
          if(moment(member.user.createdAt).format('DD') === '01') {
             var gün = '1'
             }
          if(moment(member.user.createdAt).format('DD') === '02') {
             var gün = '2'
           }
          if(moment(member.user.createdAt).format('DD') === '03') {
             var gün = '3'
           }
          if(moment(member.user.createdAt).format('DD') === '04') {
             var gün = '4'
           }
          if(moment(member.user.createdAt).format('DD') === '05') {
             var gün = '5'
           }
          if(moment(member.user.createdAt).format('DD') === '06') {
             var gün = '6'
           }
          if(moment(member.user.createdAt).format('DD') === '07') {
             var gün = '7'
           }
          if(moment(member.user.createdAt).format('DD') === '08') {
             var gün = '8'
           }
          if(moment(member.user.createdAt).format('DD') === '09') {
             var gün = '9'
           }
          var tarih = ''
          if(moment(member.user.createdAt).format('MM') === '01') {
              var tarih = `${gün} Ocak ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '02') {
              var tarih = `${gün} Şubat ${moment(member.user.createdAt).format('YYYY')}${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '03') {
              var tarih = `${gün} Mart ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '04') {
              var tarih = `${gün} Nisan ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '05') {
              var tarih = `${gün} Mayıs ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '06') {
              var tarih = `${gün} Haziran ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '07') {
              var tarih = `${gün} Temmuz ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '08') {
              var tarih = `${gün} Ağustos ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '09') {
              var tarih = `${gün} Eylül ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '10') {
              var tarih = `${gün} Ekim ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '11') {
              var tarih = `${gün} Kasım ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          if(moment(member.user.createdAt).format('MM') === '12') {
              var tarih = `${gün} Aralık ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH')}:${moment(member.user.createdAt).format('mm')}`
          }
          acarhook.send(`
 <a:19_start:853535289607454720> Câss'e Hoşgeldin! ${member} (\`${member.id}\`)\n

 <a:19_start:853535289607454720> Hesabın __${tarih}__ tarihinde ${client.gecmisTarihHesaplama(member.user.createdAt)} oluşturulmuş.\n

 <a:19_start:853535289607454720> Seninle birlikte **${member.guild.memberCount}** kişiye ulaştık! **(Câss),(#0019)** taglarımızı alarak bizlerden biri olabilirsin.\n

 <a:19_start:853535289607454720> Sunucu kurallarımız <#${acar.Kanallar.kurallarKanal}> kanalında belirtilmiştir. Sunucu içerisinde ki ceza işlemleri bu kurallara bağlıdır.
  `); 


})
let kufurler = ["allahoc","allahoç","allahamk","allahaq","0r0spuc0cu","4n4n1 sk3r1m","p1c","@n@nı skrm","evladi","orsb","orsbcogu","amnskm","anaskm","oc","abaza","abazan","ag","a\u011fz\u0131na s\u0131\u00e7ay\u0131m","fuck","shit","ahmak","seks","sex","allahs\u0131z","amar\u0131m","ambiti","am biti","amc\u0131\u011f\u0131","amc\u0131\u011f\u0131n","amc\u0131\u011f\u0131n\u0131","amc\u0131\u011f\u0131n\u0131z\u0131","amc\u0131k","amc\u0131k ho\u015faf\u0131","amc\u0131klama","amc\u0131kland\u0131","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","am\u0131k","am\u0131na","amına","am\u0131nako","am\u0131na koy","am\u0131na koyar\u0131m","am\u0131na koyay\u0131m","am\u0131nakoyim","am\u0131na koyyim","am\u0131na s","am\u0131na sikem","am\u0131na sokam","am\u0131n feryad\u0131","am\u0131n\u0131","am\u0131n\u0131 s","am\u0131n oglu","am\u0131no\u011flu","am\u0131n o\u011flu","am\u0131s\u0131na","am\u0131s\u0131n\u0131","amina","amina g","amina k","aminako","aminakoyarim","amina koyarim","amina koyay\u0131m","amina koyayim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","amin oglu","amiyum","amk","amkafa","amk \u00e7ocu\u011fu","amlarnzn","aml\u0131","amm","ammak","ammna","amn","amna","amnda","amndaki","amngtn","amnn","amona","amq","ams\u0131z","amsiz","amsz","amteri","amugaa","amu\u011fa","amuna","ana","anaaann","anal","analarn","anam","anamla","anan","anana","anandan","anan\u0131","anan\u0131","anan\u0131n","anan\u0131n am","anan\u0131n am\u0131","anan\u0131n d\u00f6l\u00fc","anan\u0131nki","anan\u0131sikerim","anan\u0131 sikerim","anan\u0131sikeyim","anan\u0131 sikeyim","anan\u0131z\u0131n","anan\u0131z\u0131n am","anani","ananin","ananisikerim","anani sikerim","ananisikeyim","anani sikeyim","anann","ananz","anas","anas\u0131n\u0131","anas\u0131n\u0131n am","anas\u0131 orospu","anasi","anasinin","anay","anayin","angut","anneni","annenin","annesiz","anuna","aq","a.q","a.q.","aq.","ass","atkafas\u0131","atm\u0131k","att\u0131rd\u0131\u011f\u0131m","attrrm","auzlu","avrat","ayklarmalrmsikerim","azd\u0131m","azd\u0131r","azd\u0131r\u0131c\u0131","babaannesi ka\u015far","baban\u0131","baban\u0131n","babani","babas\u0131 pezevenk","baca\u011f\u0131na s\u0131\u00e7ay\u0131m","bac\u0131na","bac\u0131n\u0131","bac\u0131n\u0131n","bacini","bacn","bacndan","bacy","bastard","b\u0131z\u0131r","bitch","biting","boner","bosalmak","bo\u015falmak","cenabet","cibiliyetsiz","cibilliyetini","cibilliyetsiz","cif","cikar","cim","\u00e7\u00fck","dalaks\u0131z","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dinsiz","dkerim","domal","domalan","domald\u0131","domald\u0131n","domal\u0131k","domal\u0131yor","domalmak","domalm\u0131\u015f","domals\u0131n","domalt","domaltarak","domalt\u0131p","domalt\u0131r","domalt\u0131r\u0131m","domaltip","domaltmak","d\u00f6l\u00fc","d\u00f6nek","d\u00fcd\u00fck","eben","ebeni","ebenin","ebeninki","ebleh","ecdad\u0131n\u0131","ecdadini","embesil","emi","fahise","fahi\u015fe","feri\u015ftah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","giberim","giberler","gibis","gibi\u015f","gibmek","gibtiler","goddamn","godo\u015f","godumun","gotelek","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotune","gotunu","gotveren","goyiim","goyum","goyuyim","goyyim","g\u00f6t","g\u00f6t deli\u011fi","g\u00f6telek","g\u00f6t herif","g\u00f6tlalesi","g\u00f6tlek","g\u00f6to\u011flan\u0131","g\u00f6t o\u011flan\u0131","g\u00f6to\u015f","g\u00f6tten","g\u00f6t\u00fc","g\u00f6t\u00fcn","g\u00f6t\u00fcne","g\u00f6t\u00fcnekoyim","g\u00f6t\u00fcne koyim","g\u00f6t\u00fcn\u00fc","g\u00f6tveren","g\u00f6t veren","g\u00f6t verir","gtelek","gtn","gtnde","gtnden","gtne","gtten","gtveren","hasiktir","hassikome","hassiktir","has siktir","hassittir","haysiyetsiz","hayvan herif","ho\u015faf\u0131","h\u00f6d\u00fck","hsktr","huur","\u0131bnel\u0131k","ibina","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnerator","ibnesi","idiot","idiyot","imansz","ipne","iserim","i\u015ferim","ito\u011flu it","kafam girsin","kafas\u0131z","kafasiz","kahpe","kahpenin","kahpenin feryad\u0131","kaka","kaltak","kanc\u0131k","kancik","kappe","karhane","ka\u015far","kavat","kavatn","kaypak","kayyum","kerane","kerhane","kerhanelerde","kevase","keva\u015fe","kevvase","koca g\u00f6t","kodu\u011fmun","kodu\u011fmunun","kodumun","kodumunun","koduumun","koyarm","koyay\u0131m","koyiim","koyiiym","koyim","koyum","koyyim","krar","kukudaym","laciye boyad\u0131m","libo\u015f","madafaka","malafat","malak","mcik","meme","memelerini","mezveleli","minaamc\u0131k","mincikliyim","mna","monakkoluyum","motherfucker","mudik","oc","ocuu","ocuun","O\u00c7","o\u00e7","o. \u00e7ocu\u011fu","o\u011flan","o\u011flanc\u0131","o\u011flu it","orosbucocuu","orospu","orospucocugu","orospu cocugu","orospu \u00e7oc","orospu\u00e7ocu\u011fu","orospu \u00e7ocu\u011fu","orospu \u00e7ocu\u011fudur","orospu \u00e7ocuklar\u0131","orospudur","orospular","orospunun","orospunun evlad\u0131","orospuydu","orospuyuz","orostoban","orostopol","orrospu","oruspu","oruspu\u00e7ocu\u011fu","oruspu \u00e7ocu\u011fu","osbir","ossurduum","ossurmak","ossuruk","osur","osurduu","osuruk","osururum","otuzbir","\u00f6k\u00fcz","\u00f6\u015fex","patlak zar","penis","pezevek","pezeven","pezeveng","pezevengi","pezevengin evlad\u0131","pezevenk","pezo","pic","pici","picler","pi\u00e7","pi\u00e7in o\u011flu","pi\u00e7 kurusu","pi\u00e7ler","pipi","pipi\u015f","pisliktir","porno","pussy","pu\u015ft","pu\u015fttur","rahminde","revizyonist","s1kerim","s1kerm","s1krm","sakso","saksofon","saxo","sekis","serefsiz","sevgi koyar\u0131m","sevi\u015felim","sexs","s\u0131\u00e7ar\u0131m","s\u0131\u00e7t\u0131\u011f\u0131m","s\u0131ecem","sicarsin","sie","sik","sikdi","sikdi\u011fim","sike","sikecem","sikem","siken","sikenin","siker","sikerim","sikerler","sikersin","sikertir","sikertmek","sikesen","sikesicenin","sikey","sikeydim","sikeyim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiim","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmi\u015f","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","siki\u015f","siki\u015fen","siki\u015fme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikko","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinbaya","siksinler","siksiz","siksok","siksz","sikt","sikti","siktigimin","siktigiminin","sikti\u011fim","sikti\u011fimin","sikti\u011fiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktim","siktimin","siktiminin","siktir","siktir et","siktirgit","siktir git","siktirir","siktiririm","siktiriyor","siktir lan","siktirolgit","siktir ol git","sittimin","sittir","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skim","skime","skmek","sksin","sksn","sksz","sktiimin","sktrr","skyim","slaleni","sokam","sokar\u0131m","sokarim","sokarm","sokarmkoduumun","sokay\u0131m","sokaym","sokiim","soktu\u011fumunun","sokuk","sokum","soku\u015f","sokuyum","soxum","sulaleni","s\u00fclaleni","s\u00fclalenizi","s\u00fcrt\u00fck","\u015ferefsiz","\u015f\u0131ll\u0131k","taaklarn","taaklarna","tarrakimin","tasak","tassak","ta\u015fak","ta\u015f\u015fak","tipini s.k","tipinizi s.keyim","tiyniyat","toplarm","topsun","toto\u015f","vajina","vajinan\u0131","veled","veledizina","veled i zina","verdiimin","weled","weledizina","whore","xikeyim","yaaraaa","yalama","yalar\u0131m","yalarun","yaraaam","yarak","yaraks\u0131z","yaraktr","yaram","yaraminbasi","yaramn","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraam\u0131","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarra\u011f","yarra\u011f\u0131m","yarra\u011f\u0131m\u0131","yarraimin","yarrak","yarram","yarramin","yarraminba\u015f\u0131","yarramn","yarran","yarrana","yarrrak","yavak","yav\u015f","yav\u015fak","yav\u015fakt\u0131r","yavu\u015fak","y\u0131l\u0131\u015f\u0131k","yilisik","yogurtlayam","yo\u011furtlayam","yrrak","z\u0131kk\u0131m\u0131m","zibidi","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiiin","ziksiin","zulliyetini","zviyetini"];
client.chatKoruma = async mesajIcerik => {
  if (!mesajIcerik) return;
    let inv = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;  
    if (inv.test(mesajIcerik)) return true;

    let link = /(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi;  
    if (link.test(mesajIcerik)) return true;

    if ((kufurler).some(word => new RegExp("(\\b)+(" + word + ")+(\\b)", "gui").test(mesajIcerik))) return true;
  return false;
};

client.login(client.sistem.a_Token).catch(err => console.error(" Discord API Botun tokenini doğrulayamadı."));
