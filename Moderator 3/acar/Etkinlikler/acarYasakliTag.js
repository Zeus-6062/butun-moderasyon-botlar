const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const db = new qDb.table("ayarlar");
const cezaDb = new qDb.table("aCezalar");
const kullaniciverisi = new qDb.table("aKullanici");
const moment = require('moment');
module.exports = {
    Etkinlik: "ready",
    /**
     * @param {Client} client
     */
    onLoad: function (client) {
       
    },
    /**
     * @param {GuildMember} member
     */
    onRequest: async function () {
        setInterval(() => {
            yasakliTagKontrolEt();
          }, 10000);
    }
  };

  function yasakliTagKontrolEt() {
    let acar = client.veri;
    let acarveri = client.veri
    let sid = client.sistem.a_sunucuId;
    
    // Yasaklı tag tarama (Yasaklı Tag Checkleme)
    let yasakTaglar = acarveri.yasakTaglar || [];
    let yasakTaglilar = cezaDb.get("yasakTaglilar") || [];
  for (let kisi of yasakTaglilar) {
    let uye = client.guilds.cache.get(sid).members.cache.get(kisi.slice(1));
    if (uye && yasakTaglar.some(tag => uye.user.username.includes(tag)) && !uye.roles.cache.has(acar.Roller.yasakliTagRolu)) uye.roles.set(uye.roles.cache.has(acar.Roller.boosterRolu) ? [acar.Roller.boosterRolu, acar.Roller.yasakliTagRolu] : [acar.Roller.yasakliTagRolu]).catch();
    if (uye && !yasakTaglar.some(tag => uye.user.username.includes(tag)) && uye.roles.cache.has(acar.Roller.yasakliTagRolu)) {
      cezaDb.set("yasakTaglilar", yasakTaglilar.filter(x => !x.includes(uye.id)));
      uye.roles.set(acar.kayıtRolleri.kayıtsızRolleri).catch();
      if(acar.IkinciTag) uye.setNickname(`${acar.IkinciTag} İsim | Yaş`).catch();
      else if(acar.Tag) uye.setNickname(`İsim | Yaş`).catch();
    };
  };
  };