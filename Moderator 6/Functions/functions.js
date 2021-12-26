const { MessageEmbed } = require("discord.js");

module.exports = (client, cfg) => {
  
 client.favoriRenkler = new Array("#0b0067", "#4a0038", "#07052a", "#1f0524", "#FFDF00", "#00FFFF", "#0091CC", "#0047AB", "#384B77", "#ffffff", "#000000");  
    
  client.duzembed = (message) => {
    return {
      embed: {
        description: message,
        color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],
        timestamp: new Date(),
        footer: {
          text: `${[client.xd[Math.floor(Math.random() * client.xd.length)]]}`
        }
      }
    };
  };
  
  Object.defineProperty(Array.prototype, "flat", {
     value: (depth = 1) => {
       return Array.prototype.reduce((flat, toFlatten) => {
         return flat.concat(Array.isArray(toFlatten) && depth > 1 ? toFlatten.flat(depth - 1) : toFlatten);
       }, []);
     }
  });
  
  client.emojili = (string) => {
    let str = "";
    String(string).split("").forEach(x => {
      str += "" + cfg.sayilar[Number(x)];
    });
    return str;
  };
  
  client.sayilariCevir = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  client.beko = async (msg, rolID, veren, sunucu, tip, args, arr) => {
    let author = msg.guild.member(msg.author);
    let uye = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args);
    if (tip === "normal") {
      if (!author.roles.cache.get(cfg.roles.yetkiliRoller.botc) && !author.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Bu işlemi gerçekleştirmek için gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
      if (!uye) return msg.channel.send("**Bu işlemi gerçekleştirmek için bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
      if (uye.roles.cache.get(rolID)) {
        await uye.roles.remove(rolID).catch();
        await msg.channel.send(client.duzembed(`**${uye} adlı üyeden <@&${rolID}> rolü alındı.**`)).then(m => m.delete({ timeout: 5000 }));
      } else {
        await uye.roles.add(rolID).catch();
        await msg.channel.send(client.duzembed(`**${uye} adlı üyeye <@&${rolID}> rolü verildi.**`)).then(m => m.delete({ timeout: 5000 }));
      };
    } else if (tip === "custom") {
      if (!arr.includes(author.id)) return msg.channel.send("**Bu işlemi gerçekleştirmek için gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
      if (!uye) return msg.channel.send("**Bu işlemi gerçekleştirmek için bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
      if (uye.roles.cache.get(rolID)) {
        await uye.roles.remove(rolID).catch();
        await msg.channel.send(client.duzembed(`**${uye} adlı üyeden <@&${rolID}> rolü alındı.**`)).then(m => m.delete({ timeout: 5000 }));
      } else {
        await uye.roles.add(rolID).catch();
        await msg.channel.send(client.duzembed(`**${uye} adlı üyeye <@&${rolID}> rolü verildi.**`)).then(m => m.delete({ timeout: 5000 }));
        };
     };
  };

  client.getDate = (date, type) => {
    let sure;
    date = Number(date);
    if (type === "saniye") { sure = (date * 1000) }
    else if (type === "dakika") { sure = (60 * 1000) * date }
    else if (type === "saat") { sure = ((60 * 1000) * 60) * date }
    else if (type === "gün") { sure = (((60 * 1000) * 60) * 24) * date }
    else if (type === "hafta") { sure = ((((60 * 1000) * 60) * 24) * 7) * date }
    else if (type === "ay") { sure = ((((60 * 1000) * 60) * 24) * 30) * date }
    else if (type === "yıl") { sure = ((((((60 * 1000) * 60) * 24) * 30) * 12) + 5) * date };
    return sure;
  };
  
  client.getRandomInt = (min, max) => {
    (min = Number(min)), (max = Number(max));
    return min + Math.floor((max - min) * Math.random());
  };
  
  client.nrmlembed = (message) => {
    return {
      embed: {
        description: message,
        timestamp: new Date(),
        color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]
      }
    };
  };
  
    client.voicembed = (message) => {
      return {
        embed: {
          description: message,
          color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],
          footer: { text: `${client.toDate(new Date())}`}
        }
      };
    };
  
  client.banembed = (message) => {
    return {
      embed: {
        description: message,
        timestamp: new Date(),
        color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],
        footer: {
          text: `Bugün saat:`
        }
      }
    };
  };
  
  client.toDate = (date) => {
    var tarih = "";
    tarih = new Date(date).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" }).replace("AM", "").replace("PM", "").replace(",", "");
    return tarih;
  };
  
  client.xd = [
    "Nefes alıp veriyoruz hepimizin sorunu başka...",
    "Karışık duygularıma kör düğüm atarım...",
    "Kahverengi gözlerin var ama gökyüzü gibi bakıyosun.",
    "Herkes merak içinde ölümden sonra hayat var mı diye boşuna düşünürler sanki hayat varmış gibi ölümden önce.",
    "Güne açan çiçekler gibiyiz, yalaaaaaaaaaaağn",
    "Başka bir yer varsa orada tekrar görüşürüz belki yoksa da seni tanımak benim cennetimdi zaten.",
    "Bir gün gelir aşk biter, insafsızca terk eder. Bütün bunların ardından sadece gözyaşı kalır.",
    "Havam bozulmaya başladı yine. Gözlerim de dolmaya. Sanırım içimde bir yerlere sen yağdı gece gece...",
    "Yalanlarımız güzel, inanması zevkli.",
    "Çık hücrenden, ruhunu göster",
    "Hiç bir melek ölmez ama sen bi kere dirilmedin.",
    "Klasik oldu ama her şeye rağmen hayattayız yanımızda hatalarımız.",
    "Niye küstahça bakışlara sabır ediyorum?",
    "Silgiyle iz bıraktın, kalemle silinmedin.",
    "Amacım kötü değil, istiyordum yardım ama dönülmez akşamların ufkunda kaldım",
    "Hayattan ne istediğimi bilmiyorum aslında...",
    "Sokiyim böyle dünyaya...",
    "Her şeyi bilen sen. Bilemedin bir beni",
    "Her şeyi gören sen. Göremedin mi beni?",
    "Her şeyi duyan sen. Duyamadın mı beni?",
    "Ben olmasam bile hayat gülsün sana.", 
    "Prensese benim ol dedikçe daha çok uzaklaştı.",
    "Tanrıyı cenneten gelip bizi kurtarmadığı için suçlamıyorum, çünkü hiçbir şeyi hak etmiyoruz.","Senin olanın yokluğu, bir alev gibi yaktı mı hiç seni?"
  ];
  
  client.clean = (text) => {
	  if (typeof text !== "string")
	  text = require("util").inspect(text, { depth: 0 })
	  text = text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
	  return text;
  };
};
///////////////////////////////////////////////////