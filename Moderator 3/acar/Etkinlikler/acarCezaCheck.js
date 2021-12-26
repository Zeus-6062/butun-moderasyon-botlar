const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const kullaniciverisi = new qDb.table("aKullanici");
const kullanicicinsiyet = new qDb.table("aCinsiyet");
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
            yasakKontrolEt();
          }, 10000);
    }
  };

  function yasakKontrolEt() {
    let acar = client.veri;
    let sid = client.sistem.a_sunucuId;
    //Cezalı (Check İşlemi)
    let cezalılar = cezaDb.get("cezalı") || [];
    let kalıcıcezalılar = cezaDb.get("kalıcıcezalı") || [];
    for (let kisi of kalıcıcezalılar) {
        let uye = client.guilds.cache.get(sid).members.cache.get(kisi.slice(1));
        if (uye && !uye.roles.cache.has(acar.Roller.jailRolu)) uye.roles.set(uye.roles.cache.has(acar.Roller.boosterRolu) ? [acar.Roller.boosterRolu, acar.Roller.jailRolu] : [acar.Roller.jailRolu]).catch();
      };
    for (let ceza of cezalılar) {
        let uye = client.guilds.cache.get(sid).members.cache.get(ceza.id);
        if (Date.now() >= ceza.kalkmaZamani) {
          cezaDb.set("cezalı", cezalılar.filter(x => x.id !== ceza.id));
          let erkeks = uye.roles.cache.filter(x => x.managed).map(x => x.id).concat(acar.kayıtRolleri.erkekRolleri);
          let teyitsiz = uye.roles.cache.filter(x => x.managed).map(x => x.id).concat(acar.kayıtRolleri.kayıtsızRolleri);
          let kizs = uye.roles.cache.filter(x => x.managed).map(x => x.id).concat(acar.kayıtRolleri.kadinRolleri);
          let cinsiyet  = kullanicicinsiyet.get(`veri.${uye.id}.cinsiyet`);
          kullaniciverisi.set(`ceza.${ceza.No}.BitisZaman`, Date.now())
          if(cinsiyet == `erkek`) {
               try {
                 uye.roles.set(erkeks)
               } catch(err) { console.log(err) }
           } else {
              if(cinsiyet == `kadin`) {
               try {
                 uye.roles.set(kizs)
               } catch(err) { console.log(err) }
            } else {
              try {
                 uye.roles.set(teyitsiz)
                 
    
               } catch(err) { console.log(err) }
            }
           }
        } else {
          if (uye && !uye.roles.cache.has(acar.Roller.jailRolu)) uye.roles.set(uye.roles.cache.has(acar.Roller.boosterRolu) ? [acar.Roller.boosterRolu, acar.Roller.jailRolu] : [acar.Roller.jailRolu]).catch();
        };
      };


    //Ses Susturulma ve Susturulma sorgusu (Check İşlemi)
        let kalicisusturulma = cezaDb.get("kalicisusturulma") || [];
        let sürelisusturma = cezaDb.get("susturulma") || [];
        let sessusturulma = cezaDb.get("sessusturulma") || [];
            for (let ceza of sürelisusturma) {
              let uye = client.guilds.cache.get(sid).members.cache.get(ceza.id);
                 if (Date.now() >= ceza.kalkmaZamani) {
                      cezaDb.set("susturulma", sürelisusturma.filter(x => x.id !== ceza.id));
                     if (uye && uye.roles.cache.has(acar.Roller.muteRolu)) uye.roles.remove(acar.Roller.muteRolu).catch();
                     kullaniciverisi.set(`ceza.${ceza.No}.BitisZaman`, Date.now())
                } else {
                  if (uye && !uye.roles.cache.has(acar.Roller.muteRolu)) uye.roles.add(acar.Roller.muteRolu).catch();
                };
            };
            for (let kisi of kalicisusturulma) {
             let uye = client.guilds.cache.get(sid).members.cache.get(kisi.slice(1));
                if (uye && !uye.roles.cache.has(acar.Roller.muteRolu)) uye.roles.add(acar.Roller.muteRolu).catch();
            };
            for (let ceza of sessusturulma) {
                let uye = client.guilds.cache.get(sid).members.cache.get(ceza.id);
                if (Date.now() >= ceza.kalkmaZamani) {
                  cezaDb.set("sessusturulma", sessusturulma.filter(x => x.id !== ceza.id));
                  if (uye && uye.voice.channel && uye.voice.serverMute) uye.voice.setMute(false);
                  kullaniciverisi.set(`ceza.${ceza.No}.BitisZaman`, Date.now())
                } else {
                  if (uye && uye.voice.channel && !uye.voice.serverMute) uye.voice.setMute(true);
                };
              }; 
  };