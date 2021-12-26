const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const kullanicicinsiyet = new qDb.table("aCinsiyet");
const moment = require('moment');
module.exports = {
    Etkinlik: "guildMemberRemove",
    /**
     * @param {Client} client
     */
    onLoad: function (client) {
    },
    /**
     * @param {GuildMember} member
     */
    onRequest: async function (member) {
        let acar = client.veri
        if(member.user.bot) return;
        kullanicicinsiyet.delete(`veri.${member.id}.cinsiyet`, `erkek`);
        kullanicicinsiyet.delete(`veri.${member.id}.cinsiyet`, `kadin`);
    }
  };