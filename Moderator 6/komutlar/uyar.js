const moment = require("moment");
const tarih = moment(Date.parse(new Date().toLocaleString("tr-TR", {timeZone:"Europe/Istanbul"}))).format("LLL");

module.exports.operate = async ({msg, author, uye, args}, fs = require("fs")) => {
  if (!author.permissions.has("ADMINISTRATOR")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(msg => msg.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(msg => msg.delete({ timeout: 5000 }));
  let sebep = args[1] ? args.slice(1).join(" ") : "Sebep Girilmedi.";
  let uyarıArr = [];
  let sayıs = 0;
  let index = JSON.parse(fs.readFileSync("./uyarilar.json", "utf8"));
  if (!index[uye.id]) { uyarıArr = []; sayıs = 0; } else { uyarıArr = index[uye.id].uyarılar; sayıs = index[uye.id].sayı; };
  uyarıArr.push(`#${sayıs + 1}  | Sebep: ${sebep} | Yetkili: ${author.user.tag} | Tarih: ${tarih}`);
  index[uye.id] = { sayı: sayıs + 1, uyarılar: uyarıArr };
  let uyariSayisi = sayıs + 1;
  fs.writeFile("./uyarilar.json", JSON.stringify(index, null, 4), function(err) {
    if (err) console.log(err);
      msg.channel.send(
        "<@" +
        uye +
        "> kişisi <@" +
        msg.author +
        "> yetkilisi tarafından uyarıldı.\n────────────────────────────────────\nUyarı Sebebi: **" +
        sebep +
        "**\nUyarı Tarihi: **" +
        tarih +
        "**\nUyarı Sayısı: **" +
        uyariSayisi +
        "** "
      );
  });
};

module.exports.help = {
  name: "uyar",
  alias: ["uyarı"]
};