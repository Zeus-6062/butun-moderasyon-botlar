const { GuildMember, MessageEmbed,Client,WebhookClient} = require("discord.js");
const qDb = require("quick.db");
const db = new qDb.table("ayarlar");
const moment = require('moment');
const cezaDb = new qDb.table("aCezalar");
const acar = client.veri
module.exports = {
    Etkinlik: "voiceStateUpdate",
    /**
     * @param {Client} client
    */
    onLoad: function (client) {
       
    },

    /**
    * @param {User} oldMember
    * @param {User} newMember
    */
    onRequest: async function (oldState, newState) {
        let ayar = client.veri
        if (ayar.Kanallar.sesLogKanali && client.channels.cache.has(ayar.Kanallar.sesLogKanali)) {
            let logKanali = client.channels.cache.get(ayar.Kanallar.sesLogKanali);
            if (!oldState.channelID && newState.channelID) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanala **katıldı!**`).catch();
            if (oldState.channelID && !newState.channelID) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(oldState.channelID).name}\` adlı sesli kanaldan **ayrıldı!**`).catch();
            if (oldState.channelID && newState.channelID && oldState.channelID != newState.channelID) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi ses kanalını **değiştirdi!** (\`${newState.guild.channels.cache.get(oldState.channelID).name}\` => \`${newState.guild.channels.cache.get(newState.channelID).name}\`)`).catch();
            if (oldState.channelID && oldState.selfMute && !newState.selfMute) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi susturmasını **kaldırdı!**`).catch();
            if (oldState.channelID && !oldState.selfMute && newState.selfMute) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini **susturdu!**`).catch();
            if (oldState.channelID && oldState.selfDeaf && !newState.selfDeaf) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi sağırlaştırmasını **kaldırdı!**`).catch();
            if (oldState.channelID && !oldState.selfDeaf && newState.selfDeaf) return logKanali.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini **sağırlaştırdı!**`).catch();
          };
    }
  };