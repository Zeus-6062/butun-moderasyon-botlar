const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
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
              TagKontrolEt();
          }, 10000);
    }
  };

  function TagKontrolEt() {
    let acar = client.veri;
    let sid = client.sistem.a_sunucuId;
    //if (acar.kayıtRolleri.kayıtsızRolleri) client.guilds.cache.get(sid).members.cache.filter(uye => uye.roles.cache.size === 1).array().forEach((uye, index) => setTimeout(() => { uye.roles.add(acar.kayıtRolleri.kayıtsızRolleri).catch(console.error); uye.setNickname('⸸ İsim | Yaş'); }, index*1000));
    client.guilds.cache.get(sid).members.cache.filter(uye => uye.user.username.includes(acar.Tag) && !uye.hasPermission('ADMINISTRATOR') && !uye.roles.cache.has(acar.Roller.jailRolu) && !uye.roles.cache.has(acar.kayıtRolleri.kayıtsızRolleri) && !uye.roles.cache.has(acar.Roller.yasakliTagRolu) && !uye.roles.cache.has(acar.Roller.supheliRolu) && (!uye.roles.cache.has(acar.kayıtRolleri.tagRolu) || !uye.displayName.startsWith(acar.Tag))).array().forEach((uye, index) => {
        setTimeout(() => {
          uye.setNickname(uye.displayName.replace(acar.IkinciTag, acar.Tag));
          uye.roles.add(acar.kayıtRolleri.tagRolu);
        }, index*5000);
        client.guilds.cache.get(sid).members.cache.filter(uye => uye.user.discriminator.includes(acar.Tag2) && !uye.hasPermission('ADMINISTRATOR') && !uye.roles.cache.has(acar.Roller.jailRolu) && !uye.roles.cache.has(acar.kayıtRolleri.kayıtsızRolleri) && !uye.roles.cache.has(acar.Roller.yasakliTagRolu) && !uye.roles.cache.has(acar.Roller.supheliRolu) && (!uye.roles.cache.has(acar.kayıtRolleri.tagRolu) || !uye.displayName.startsWith(acar.Tag2))).array().forEach((uye, index) => {
          setTimeout(() => {
            uye.setNickname(uye.displayName.replace(acar.IkinciTag, acar.Tag));
            uye.roles.add(acar.kayıtRolleri.tagRolu);
          }, index*5000);
      });

  })}