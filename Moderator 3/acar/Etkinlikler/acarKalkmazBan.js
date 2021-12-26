const { GuildMember, MessageEmbed,Client, WebhookClient} = require("discord.js");
const qDb = require("quick.db");
const db = new qDb.table("ayarlar");
const cezaDb = new qDb.table("aCezalar");
const moment = require('moment');
const acarhook = new WebhookClient(client.veri.hosgeldinSistemi.webhookID, client.veri.hosgeldinSistemi.webhookTOKEN);
module.exports = {
    Etkinlik: "guildMemberAdd",
    Aktiflik: true,
    /**
     * @param {Client} client
     */
    onLoad: function (client) {

    },
    /**
     * @param {GuildMember} member
     */
    onRequest: async function (member) {
        let acarkalkmazban = qDb.get(`akb_${member.guild.id}`)
        if(acarkalkmazban && acarkalkmazban.some(id => `k${member.user.id}` === id)) {
          try {
            await member.send(`**${member.guild.name}** sunucusundan kalıcı olarak bot tarafından yasaklandınız!`)
            member.ban({reason: 'Bot kalkmazban sistemi ile banlandı!'})
            } catch(err) { console.log(err) }
        }
        }
  };