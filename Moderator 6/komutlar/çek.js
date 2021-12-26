module.exports.operate = async ({client, msg, args, author, uye, cfg}) => {
  if (!author.roles.cache.get(cfg.roles.transport) && !author.permissions.has("ADMINISTRATOR")) return msg.channel.send('**Gerekli yetkiye sahip değilsin.**').then(m => m.delete({ timeout: 3000 }));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 3000 }));
  if (!uye.voice.channel) return msg.channel.send("**Etiketlediğin üye bir ses kanalında bulunmuyor.**").then(m => m.delete({ timeout: 3000 }));
  if (!args[1]) {
    if (!author.voice.channel) return msg.channel.send("**Bir sesli kanalında bulunmuyorsun.**").then(m => m.delete({ timeout: 4000 }));
    if (author.voice.channel.id === uye.voice.channel.id) return msg.channel.send("**Bu üyeyle aynı kanaldasınız.**").then(m => m.delete({ timeout: 5000 }));
    await uye.voice.setChannel(author.voice.channel.id).catch(err => msg.channel.send(err.message));
    await msg.channel.send(client.nrmlembed(`**${uye} adlı üye başarıyla kanala çekildi.**`)).then(m => m.delete({ timeout: 5000 }));
  } else if (
    [
      "at",
      "null",
      "kick",
      "kanaldanat",
      "kanaldan-at",
      "kanal-at"
    ].includes(args[1])
  ) {
      await uye.voice.kick().catch(err => msg.channel.send(err.message));
      await msg.channel.send(client.nrmlembed(`**${uye} adlı üye başarıyla kanaldan atıldı**`)).then(a => a.delete({ timeout: 5000 }));
    } else {
      if (!author.voice.channel) return msg.channel.send("**Bir sesli kanalında bulunmuyorsun.**").then(m => m.delete({ timeout: 4000 }));
      await uye.voice.setChannel(args[1]).catch(err => msg.channel.send(err.message));
      await msg.channel.send(client.nrmlembed(`**${uye} adlı  başarıyla <#${args[1]}> kanalına gönderildi.**`)).then(a => a.delete({ timeout: 5000 }));
    };
};

module.exports.help = {
  name: "çek",
  alias: []
}