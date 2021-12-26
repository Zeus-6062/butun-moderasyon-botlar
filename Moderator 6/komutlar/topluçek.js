module.exports.operate = ({client, msg, args, author, uye, cfg}) => {
  if (!author.roles.cache.get(cfg.roles.transport) && !author.permissions.has("ADMINISTRATOR")) return msg.channel.send('**Gerekli yetkiye sahip değilsin.**').then(m => m.delete({ timeout: 3000 }));
  if (!args[0]) return msg.channel.send("**Bir kanal idsi girmelisin.**").then(msj => msj.delete({ timeout: 5000 }));
  if (!args[1]) {
    let kanal = author.voice.channelID;
    let kanal2 = args[0];
    var uyeler = msg.guild.members.cache.filter(u => msg.guild.member(u).voice.channelID === kanal2);
    if (uyeler.size < 1) return msg.channel.send("**Toplu taşıma yapmak istediğin kanalda üye bulunmamakta.**").then(msj => msj.delete({ timeout: 5000 }));
    if (kanal === kanal2) return msg.channel.send("**Aynı kanala üye taşıyamazsın.**").then(msj => msj.delete({ timeout: 5000 }));
    uyeler.map(u => u.voice.setChannel(kanal));
    msg.channel.send(client.nrmlembed(`** \`${uyeler.size}\` adet üye \`${msg.guild.channels.cache.get(kanal).name}\` kanalından \`${msg.guild.channels.cache.get(kanal2).name}\` kanalına taşınıyor.**`)).then(msj => msj.delete({ timeout: 5000 }));
  } else {
    let kanal = args[1];
    let kanal2 = args[0];
    var uyeler = msg.guild.members.cache.filter(u => msg.guild.member(u).voice.channelID === kanal2);
    if (uyeler.size < 1) return msg.channel.send("**Toplu taşıma yapmak istediğin kanalda üye bulunmamakta.**").then(msj => msj.delete({ timeout: 5000 }));
    if (kanal === kanal2) return msg.channel.send("**Aynı kanala üye taşıyamazsın.**").then(msj => msj.delete({ timeout: 5000 }));
    uyeler.map(u => u.voice.setChannel(kanal));
    msg.channel.send(client.nrmlembed(`** \`${uyeler.size}\` adet üye \`${msg.guild.channels.cache.get(kanal).name}\` kanalından \`${msg.guild.channels.cache.get(kanal2).name}\` kanalına taşınıyor.**`)).then(msj => msj.delete({ timeout: 5000 }));
  };
};

module.exports.help = {
  name: "topluçek",
  alias: []
};