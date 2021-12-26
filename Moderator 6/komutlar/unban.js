module.exports.operate = async ({client, msg, args, author}) => {
  let banLog = msg.guild.channels.cache.find(c => c.name === "ban-log");
  if (!author.permissions.has("BAN_MEMBERS")) return msg.channel.send("**Gerekli yetkiye sahip değilsiniz.**").then(m => m.delete({ timeout: 5000 }));
  if (!args[0] || isNaN(args[0])) return msg.channel.send("**Geçerli bir id girmelisiniz.**").then(m => m.delete({ timeout: 5000 }));
  let user = args[0];
  if (user) {
    let reason = args.slice(1).join(" ") || "Sebep Girilmedi";
    msg.guild.members.unban(user).catch(err => {
      msg.channel.send({ embed: { description: "**Belirtilen ID'de bir yasaklama bulunamadı.**", color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp: new Date()}}).then(m => m
      .delete({ timeout: 3000 }));
    });
    if (banLog) banLog.send(client.nrmlembed(`${user} ID'li üyenin yasaklaması ${author} tarafından kaldırıldı.`));
  } else {
    msg.channel.send("**Geçerli bir kişi ID'si belirtmelisin.**").then(m => m.delete({ timeout: 4000 }));
  };
};

exports.help = {
  name: "unban",
  alias: ["ub", "af"],
  description: "Sunucudan ban kaldırmanızı sağlar.",
};