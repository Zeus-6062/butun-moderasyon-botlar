const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kDb = new qDb.table("aKullanici");
const moment = require('moment');
const acar = client.veri;
module.exports = {
    Isim: "sicil",
    Komut: ["sicil"],
    Kullanim: "sicil temizle ID / sicil @acar/ID",
    Aciklama: "Belirlenen üyenin ceza geçmişini ve ceza numaralarını gösterir.",
    Kategori: "Yönetim Komutları",
    TekSunucu: true,
  /**
   * @param {Client} client 
   */
  onLoad: function (client) {
    Date.prototype.TurkiyeTarihDuzeni = function (format) {
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
          format = "dd MM yyyy HH:ii";
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
        if (format.indexOf("hh.") > -1) {
          if (hours > 24) hours -= 24;
          if (hours === 0) hours = 24;
          format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
        };
        if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
        if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
        return format;
      };
      client.embedGenislet = async function(description, author = false, footer = false, features = false) {
        let embedSize = parseInt(`${description.length/2048}`.split('.')[0])+1
        let embeds = new Array()
        for (var i = 0; i < embedSize; i++) {
          let desc = description.split("").splice(i*2048, (i+1)*2048)
          let x = new MessageEmbed().setDescription(desc.join(""))
          if (i == 0 && author) x.setAuthor(author.name, author.icon ? author.icon : null)
          if (i == embedSize-1 && footer) x.setFooter(footer.name, footer.icon ? footer.icon : null)
          if (i == embedSize-1 && features && features["setTimestamp"]) x.setTimestamp(features["setTimestamp"])
          if (features) {
            let keys = Object.keys(features)
            keys.forEach(key => {
              if (key == "setTimestamp") return
              let value = features[key]
              if (i !== 0 && key == 'setColor') x[key](value[0])
              else if (i == 0) {
                if(value.length == 2) x[key](value[0], value[1])
                else x[key](value[0])
              }
            })
          }
          embeds.push(x)
        }
        return embeds
      };
  },
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @param {Guild} guild
   */
  onRequest: async function (client, message, args, guild) {
  let embed = new MessageEmbed().setColor('0x2f3136').setAuthor(acar.Tag + " " + acar.sunucuIsmi, message.guild.iconURL({dynamic: true, size: 2048})).setFooter(client.altbaslik)
  let kullanici = message.mentions.users.first() || client.users.cache.get(args[0])|| (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
  let uye = message.guild.member(kullanici);
  let sicil = kDb.get(`k.${uye.id}.sicil`) || [];

  let sicilguvenli;
  if(kDb.get(`k.${uye.id}.sicil`)) {
    sicilguvenli = `Sicil Temiz Değil ❌`

  } else {
    sicilguvenli = `Sicil Temiz ✔`

  }
  let sorgu = args[0];
   
  if(sorgu == "temizle" || sorgu == "sıfırla") {
    if(!message.member.roles.cache.has(acar.Roller.kurucuRolu)) return message.channel.send(`Hata: Bu komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`).then(x => x.delete({timeout: 5000}));
    let kullanicitemizle = client.users.cache.get(args[1])
    let uye2 = message.guild.member(kullanicitemizle);
  if(!uye2) return message.channel.send(`Hata: Lütfen bir üye Id giriniz!  __Örn:__  \`${client.sistem.a_Prefix}sicil temizle <ID>\``).then(x => x.delete({timeout: 5000}));
  kDb.delete(`k.${uye2.id}.sicil`) 
  message.channel.send(embed.setDescription(`${uye2} (\`${uye2.id}\`), isimli üyenin bütün sicil geçmişi temizlendi!`)).then(x => x.delete({timeout: 5000})); 
  message.react("✅")
  return  
};
  sicil = sicil.reverse();
  let sicilpaneli = sicil.length > 0 ? sicil.map((value, index) => `[\`#${value.No}\` - \`${value.Tip}\`] ${new Date(value.Zaman).TurkiyeTarihDuzeni()} tarihinde **${value.Sebep}** nedeniyle ${message.guild.members.cache.has(value.Yetkili) ? message.guild.members.cache.get(value.Yetkili) : value.Yetkili} tarafından cezalandırıldı.`).join("\n") : `Üyenin herhangi bir sicil kayıtı bulunamadı.\n`;
  client.embedGenislet(`[\`${sicilguvenli}\`]\n ${sicilpaneli}`,
                           {name: `${uye.displayName}`, icon: kullanici.avatarURL({dynamic: true})},
                           {name: `${client.sistem.a_Prefix}ceza bilgi #No ile ceza sorulayabilirsin.`, icon: false},
                           {setColor: ["0x2F3136"]}).then(list => {
             list.forEach(item => {
             message.channel.send(item);
            });
        });
    }
};