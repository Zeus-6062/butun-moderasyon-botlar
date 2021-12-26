var kullandi = new Set();
module.exports.operate = ({client, author, msg, args, db}) => {
  if (kullandi.has(author.id)) return;
  let afkSebebi = args.join(" ");
  let afkRoles = msg.mentions.roles.first();
  if (
    afkSebebi.toLowerCase().includes(".com") ||
    afkSebebi.toLowerCase().includes("discord.gg") ||
    afkSebebi.toLowerCase().includes("http") ||
    afkSebebi.toLowerCase().includes(afkRoles) ||
    afkSebebi.toLowerCase().includes("@everyone") ||
    afkSebebi.toLowerCase().includes("@here")
  ) {
    msg.delete();
    msg.reply("**Bir daha linki veya everı atarsan senin o ananı yerden yere vururum**");
    return;
  };
  if (!afkSebebi) afkSebebi = "Şuanda AFK'yım en kısa sürede döneceğim. ?";
  setTimeout(function() {
    db.set(`afk_${msg.author.id}, ${msg.guild.id}`, afkSebebi);
    db.set(`afk-zaman_${msg.author.id}, ${msg.guild.id}`, Date.now());
    kullandi.add(author.id);
  }, 700);
  msg.reply(`**${afkSebebi}** sebebi ile [AFK] moduna giriş yaptınız.`).then(x => x.delete({ timeout: 6000 }));
  if (!author.nickname && author.roles.highest.position < msg.guild.members.cache.get(client.user.id).roles.highest.position && author.displayName.length < 27) return author.setNickname("[AFK] " + msg.member.user.username);
  if (author.roles.highest.position < msg.guild.members.cache.get(client.user.id).roles.highest.position && author.displayName.length < 27) author.setNickname("[AFK] " + msg.member.nickname).catch(err => console.log(err));
  setTimeout(() => kullandi.delete(author.id), client.getDate(5, "saniye"));
};

module.exports.help = {
  name: "afk",
  alias: []
};