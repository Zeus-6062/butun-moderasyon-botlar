const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const kullaniciverisi = new qDb.table("aKullanici");
const moment = require('moment');
module.exports = {
    Etkinlik: "voiceStateUpdate",
    Aktiflik: true,
    /**
     * @param {Client} client
     */
    onLoad: function (client) {
    },
    /**
     * @param {GuildMember} member
     */
    onRequest: async function (oldState, newState) {
        let acar = client.veri
        if((!oldState.channel && newState.channel) || (oldState.channel && newState.channel)){ 
            let data = cezaDb.get("sessusturulma") || [{id: null,kalkmaZamani: null}];
            let member = newState.member;
            if(!member) return;
            if(data.some(d => d.id == member.id)){
              let d = data.find(x => x.id == member.id);
              if(Date.now() >= d.kalkmaZamani){
                data = data.filter(d => d.id != member.id);
                member.voice.setMute(false)
                kullaniciverisi.set(`ceza.${d.No}.BitisZaman`, Date.now())
                cezaDb.set("sessusturulma", data);
              } else if(member.voice.channel && !member.voice.serverMute){
                member.voice.setMute(true)
              }
            }
          }
    }
  };
