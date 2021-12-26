const { GuildMember, MessageEmbed,Client,WebhookClient} = require("discord.js");
const qDb = require("quick.db");
const db = new qDb.table("ayarlar");
const moment = require('moment');
const cezaDb = new qDb.table("aCezalar");
const acar = client.veri
module.exports = {
    Etkinlik: "userUpdate",
    /**
     * @param {Client} client
    */
    onLoad: function (client) {
       
    },

    /**
    * @param {User} oldMember
    * @param {User} newMember
    */
    onRequest: async function (oldUser, newUser) {
        if(oldUser.username == newUser.username || oldUser.bot || newUser.bot) return;
        let client = oldUser.client;
        let guild = client.guilds.cache.get(client.sistem.a_sunucuId);
        if(!guild) return console.error(`Hata: ${__filename} Sunucu bulunamadı!`);
        let user = guild.members.cache.get(oldUser.id);
        let ayarlar = client.veri
        let yasakTaglilar = cezaDb.get('yasakTaglilar') || [];
        let log = client.channels.cache.get(acar.Kanallar.tagLogKanali);
        const embed = new MessageEmbed().setAuthor(user.displayName, user.user.avatarURL({dynamic: true})).setFooter(client.altbaslik).setColor('0x2F3236');
        if ((ayarlar.yasakTaglar && ayarlar.yasakTaglar.some(tag => newUser.username.includes(tag))) && (acar.Roller.yasakliTagRolu && !user.roles.cache.has(acar.Roller.yasakliTagRolu))) {
          user.roles.set(user.roles.cache.has(acar.Roller.boosterRolu) ? [acar.Roller.boosterRolu, acar.Roller.yasakliTagRolu] : [acar.Roller.yasakliTagRolu]).catch();
          user.send(`**${user.guild.name}** sunucumuzun yasaklı taglarından birini kullanıcı adına aldığın için jaile atıldın! Tagı geri bıraktığında jailden çıkacaksın.`).catch();
          if(!yasakTaglilar.some(x => x.includes(newUser.id))) cezaDb.push('yasakTaglilar', `y${newUser.id}`);
          return;
        };
        if ((ayarlar.yasakTaglar && !ayarlar.yasakTaglar.some(tag => newUser.username.includes(tag))) && (acar.Roller.yasakliTagRoluu && user.roles.cache.has(acar.Roller.yasakliTagRolu)) && yasakTaglilar.some(x => x.includes(newUser.id))) {
          user.roles.set(acar.kayıtRolleri.kayıtsızRolleri).catch();
          user.send(`**${user.guild.name}** sunucumuzun yasaklı taglarından birine sahip olduğun için jaildeydin ve şimdi bu yasaklı tagı çıkardığın için jailden çıkarıldın!`).catch();
          cezaDb.set('yasakTaglilar', yasakTaglilar.filter(x => !x.includes(newUser.id)));
          return;
        };


        // Tag Çıkardı Ekledi (Checkleyip Rol verme İsim Ayarlama İşlemi)
        if(newUser.username.includes(acar.Tag) && !user.roles.cache.has(acar.kayıtRolleri.tagRolu)){
             user.roles.add(acar.kayıtRolleri.tagRolu).catch();
             if(user.manageable) user.setNickname(user.displayName.replace(acar.IkinciTag, acar.Tag)).catch();
             log.send(embed.setColor('GREEN').setDescription(`${user} kişisi ismine \`${acar.Tag}\` tagı alarak ailemize katıldı!`)).catch();
       } else if(!newUser.username.includes(acar.Tag) && user.roles.cache.has(acar.kayıtRolleri.tagRolu)){
             user.roles.remove(acar.kayıtRolleri.tagRolu).catch();
             log.send(embed.setColor('0x2F3236').setDescription(`${user} kişisi isminden \`${acar.Tag}\` tagı çıkararak ailemizden ayrıldı!`)).catch();
        }
        if(newUser.discriminator.includes(acar.Tag2) && !user.roles.cache.has(acar.kayıtRolleri.tagRolu)){
          user.roles.add(acar.kayıtRolleri.tagRolu).catch();
          if(user.manageable) user.setNickname(user.displayName.replace(acar.IkinciTag, acar.Tag)).catch();
          log.send(embed.setColor('GREEN').setDescription(`${user} kişisi ismine \`${acar.Tag2}\` tagı alarak ailemize katıldı!`)).catch();
    } else if(!newUser.discriminator.includes(acar.Tag2) && user.roles.cache.has(acar.kayıtRolleri.tagRolu)){
          user.roles.remove(acar.kayıtRolleri.tagRolu).catch();
          log.send(embed.setColor('0x2F3236').setDescription(`${user} kişisi isminden \`${acar.Tag2}\` tagı çıkararak ailemizden ayrıldı!`)).catch();
     }
    }
  };