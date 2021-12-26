module.exports.help = { name: "message" };

const etiketlenmis = new Set();

module.exports.event = async (msg, db = require("quick.db"), parsems = require("parse-ms"), client = global.client) => {
    if (msg.author.bot || msg.channel.type === "dm") return;
  let afklar = await db.fetch(`afk_${msg.author.id}, ${msg.guild.id}`);
  if (afklar) {
    db.delete(`afk_${msg.author.id}, ${msg.guild.id}`);
    db.delete(`afk-zaman_${msg.author.id}, ${msg.guild.id}`);
    msg.reply(`Artık AFK değilsin, aramıza tekrardan hoş geldin!`).then(m => m.delete({timeout: 5000}));
    try {
      let takma_ad = msg.member.nickname.replace("[AFK]", "");
      if (msg.guild.member(msg.author).roles.highest.position < msg.guild.members.cache.get(client.user.id).roles.highest.position) msg.member.setNickname(takma_ad);
    } catch (err) {
      console.log(err.message);
    }
  }
  let kullanıcı = msg.mentions.users.first();
  if (!kullanıcı) return;
  let zaman = await db.fetch(`afk-zaman_${kullanıcı.id}, ${msg.guild.id}`);
  let süre = parsems(Date.now() - zaman);
  let sebep = await db.fetch(`afk_${kullanıcı.id}, ${msg.guild.id}`);
  if (await db.fetch(`afk_${msg.mentions.users.first().id}, ${msg.guild.id}`)) {
    if (etiketlenmis.has(msg.mentions.users.first().id)) return;
    if (süre.days !== 0) {
      setTimeout(() => etiketlenmis.delete(msg.mentions.users.first().id), client.getDate(5, "saniye"));
      etiketlenmis.add(msg.mentions.users.first().id);
      msg.channel.send(
        `**${kullanıcı}** kullanıcısı **${süre.days}** gün **${süre.hours}** saat **${süre.minutes}** dakika Önce **AFK** oldu.\n AFK Nedeni : \`${sebep}\``
      );
      return;
    };
    if (süre.hours !== 0) {
      setTimeout(() => etiketlenmis.delete(msg.mentions.users.first().id), client.getDate(5, "saniye"));
      etiketlenmis.add(msg.mentions.users.first().id);
      msg.channel.send(
        `**${kullanıcı}** kullanıcısı **${süre.hours}** saat **${süre.minutes}** dakika önce **AFK** oldu.\n AFK Nedeni : \`${sebep}\``
      );
      return;
    };
    if (süre.minutes !== 0) {
      setTimeout(() => etiketlenmis.delete(msg.mentions.users.first().id), client.getDate(5, "saniye"));
      etiketlenmis.add(msg.mentions.users.first().id);
      msg.channel.send(
        `**${kullanıcı}** kullanıcısı **${süre.minutes}** dakika önce **Afk** oldu.\n AFK Nedeni : \`${sebep}\``
      );
      return;
    };
    if (süre.seconds !== 0) {
      setTimeout(() => etiketlenmis.delete(msg.mentions.users.first().id), client.getDate(5, "saniye"));
      etiketlenmis.add(msg.mentions.users.first().id);
      msg.channel.send(
        `**${kullanıcı}** kullanıcısı **bir kaç saniye** önce **AFK** oldu.\n AFK Nedeni : \`${sebep}\``
      );
      return;
    };
  };
};