module.exports.operate = ({client, author, msg, args, uye}, fs = require("fs")) => {
  if (!author.permissions.has("ADMINISTRATOR")) return;
  if (!args[1]) {
    if (!uye) return msg.channel.send("**Bir üye etiketlemelisin**").then(a => a.delete({ timeout: 5000 }));
    let index = JSON.parse(fs.readFileSync("./uyarilar.json", "utf8"));
    if (!index[uye.id]) return msg.channel.send("Etiketlediğin üyenin uyarısı bulunmamakta.");
    let uyarisayi = index[uye.id].sayı;
    let uyarilar = index[uye.id].uyarılar;
    msg.channel.send(
      `**Bu kişinin ${uyarisayi} adet uyarısı bulunuyor. İşte listesi;**\n\`\`\`ID | Uyarı Sebep | Uyarı Atan Yetkili | Uyarı Tarihi \n─────────────────────────────────────────────────────────────────────\n${uyarilar.join(
        "\n──────────────────────────────────────────────────────────────────\n"
      )}\`\`\``
    );
  } else {
      if (!uye) return msg.channel.send("**Bir üye etiketlemelisin**").then(a => a.delete({ timeout: 5000 })); 
      let index = JSON.parse(fs.readFileSync("./uyarilar.json", "utf8"));
      if (!index[uye.id]) return msg.channel.send("Bu üyenin uyarısı yok");
      let sayı = index[uye.id].sayı;
      let uyarılar = index[uye.id].uyarılar;
      let bul = uyarılar.filter(a => a.includes(`#${args[1]}`));
      if (!bul) return msg.channel.send("Bu id de uyarı yok");
      msg.channel.send(`\`\`\`${bul}\`\`\``);
    };
};

module.exports.help = {
  name: "uyarılar",
  alias: []
};