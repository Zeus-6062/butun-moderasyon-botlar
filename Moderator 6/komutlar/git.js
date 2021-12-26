module.exports.operate = async ({client, msg, args, author, uye}) => {
  const evet = "✅"
  const hayir = "❌";
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(msj => msj.delete({timeout:5000}));
  function onlarFilterBenBeko(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === uye.id };
  if (!uye.voice.channel) return msg.channel.send("**Gitmek istediğin üye herhangi bir ses kanalında bulunmuyor.**").then(msj => msj.delete({timeout:5000}));
  if (uye.voice.channelID === author.voice.channelID) return msg.channel.send("**Gitmek istediğin üye ile aynı kanaldasınız.**").then(msj => msj.delete({timeout:5000}));
  if (!author.voice.channel) return msg.channel.send("**Bir sesli kanalında bulunmuyorsun.**").then(msj => msj.delete({timeout:5000}));
  msg.channel.send(client.nrmlembed(`Merhaba ${uye}. ${author} adlı üye bulunduğun sesli kanalına gelmek istiyor. Onaylıyor musun? `)).then(async msj => {
    await msj.react(evet);
    await msj.react(hayir);
    msj.awaitReactions(onlarFilterBenBeko, { max: 1, time: client.getDate(15, "saniye"), errors:["time"] }).then(async collected => {
      let cvp = collected.first();
      if (cvp.emoji.name === evet) {
        await author.voice.setChannel(uye.voice.channel.id);
        await msj.delete();
        await msg.delete();
        author.send("Başarıyla <@" + uye + "> adlı üyenin odasına gittin.").catch(err => {
          msg.channel.send(client.nrmlembed(`${author} adlı üye başarıyla ${uye} adlı üyenin odasına taşındı.`)).then(m => m.delete({ timeout: 3000 }))
        });
      } else {
        await msj.delete();
        await author.send("<@" + uye + "> adlı üye kanala gitme isteğinizi reddetti.").catch();
      };
    }).catch(err => [msj.delete(), msg.delete()]);
  });
};

module.exports.help = {
  name: "git",
  alias: ["g"]
};