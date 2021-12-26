const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const acarveri = client.veri.kayıtRolleri;
const acar = client.veri;
module.exports = {
    Isim: "git",
    Komut: ["git", "izinligit"],
    Kullanim: "izinligit @acar/ID",
    Aciklama: "Belirlenen üyeye izin ile yanına gider.",
    Kategori: "Üye",
    TekSunucu: true,
  /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @param {Guild} guild
   */
  onRequest: async function (client, message, args, guild) {
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let embed = new MessageEmbed().setColor("#2F3136");
    if (!uye) return message.channel.send("Hata: Ses odasına gidilecek üyeyi belirtmelisin!").then(x => x.delete({timeout: 5000}));
    if (!message.member.voice.channel || !uye.voice.channel || message.member.voice.channelID == uye.voice.channelID) return message.channel.send("Hata: Belirtilen üyenin ve kendinin ses kanalında olduğundan emin ol!").then(x => x.delete({timeout: 5000}));
    if (message.member.roles.highest.position < uye.roles.highest.position) { 
   const reactionFilter = (reaction, user) => {
        return ['✅'].includes(reaction.emoji.name) && user.id === uye.id;
      };
   message.channel.send(`${uye}`, {embed: embed.setFooter(client.altbaslik).setAuthor(uye.displayName, uye.user.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author} senin ses kanalına girmek için izin istiyor! Onaylıyor musun?`)}).then(async msj => {
        await msj.react('✅');
        msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
        coll => coll.first().catch(err => { mesaj.delete().catch(); return; })
      let cevap = c.first();
      if (cevap) {
        message.member.voice.setChannel(uye.voice.channelID);
            msj.delete();
            message.channel.send(embed.setDescription(`${message.member}, isimli üye ${uye} isimli üyenin __odasına izin ile__ gitti!`).setFooter(client.altbaslik)).then(x => x.delete({timeout: 5000}));
      } else {
      msj.delete();
      message.channel.send(embed.setFooter(client.altbaslik).setDescription(`${client.emoji(acar.Emojiler.Iptal)} __**15** Saniye__ boyunca ${uye} isimli kişiden cevap gelmediği için otomatik olarak iptal edildi!`)).then(x => x.delete({timeout: 5000}));
      };	
        });
      });
      } else {
  if (acar.Roller.moveHammer.some(rol => message.member.roles.cache.has(rol)) || message.member.hasPermission('ADMINISTRATOR')) {
      await message.member.voice.setChannel(uye.voice.channelID);
      message.channel.send(embed.setDescription(`${client.emoji(acar.Emojiler.Onay)} ${message.member} isimli __yetkili__ ${uye} isimli __üyenin odasına__ gitti!`)).then(x => x.delete({timeout: 5000}));
    } else {
      const reactionFilter = (reaction, user) => {
        return ['✅'].includes(reaction.emoji.name) && user.id === uye.id;
      };
  };
  };

    }
};
