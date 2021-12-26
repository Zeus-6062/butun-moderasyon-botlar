const moment = require("moment");
moment.locale("tr");
module.exports.operate = async ({client, msg, args, author, cfg}) => {
  if (!author.roles.cache.get(cfg.roles.botc) && !author.permissions.has("ADMINISTRATOR")) return;
  let u = msg.mentions.users.first() || client.users.cache.get(args[0]) || msg.author;
  if (!u.presence.activities[1]) return msg.channel.send("**Bu üyenin profilinde herhangi bir oynuyor aktivitesi yok.**").then(m => m.delete({ timeout: 5000 }));
  if (u.presence.activities[1].name === "Spotify") {
    let isim = u.presence.activities[1].details;
    let soyleyen = u.presence.activities[1].state;
    let baslangicSaati = moment(u.presence.activities[1].timestamps.start).format("HH:mm:ss");
    let bitisSaati = moment(u.presence.activities[1].timestamps.end).format("HH:mm:ss");
    let albümİsmi = u.presence.activities[1].assets.largeText;
    let image = `https://i.scdn.co/image/${u.presence.activities[1].assets.largeImage.slice(8)}`;
    let URL = `https://open.spotify.com/track/${u.presence.activities[1].syncID}`;
    msg.channel.send({
      embed: {
        author: { name: `Albüme Gitmek İçin Tıkla`, icon_url: image, url: URL },
        color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],
        thumbnail: { url: u.displayAvatarURL({dynamic:true}) },
        description: `\`Şarkı Adı:\` **__${isim}__**\n\`Sanatçı:\` **__${soyleyen}__**\n\`Albüm İsmi:\` **__${albümİsmi}__**\n\n\`Şarkının Başlama Saati:\` **${baslangicSaati}** \n\`Şarkının Bitiş Saati:\` **${bitisSaati}**`,
        footer: { text: msg.guild.member(u).displayName + " tarafından istendi.", icon_url: u.avatarURL({dynamic:true}) },
        timestamp: new Date()
      }
    }).then(msj => msj.delete({ timeout: 7000 }));
  } else {
    console.log(u.presence.activities[1]);
    msg.channel.send("**Bu üye spotify dinlemiyor.**");
  };
};

module.exports.help = {
  name: "spoti",
  alias: ["spotify", "spo"]
};