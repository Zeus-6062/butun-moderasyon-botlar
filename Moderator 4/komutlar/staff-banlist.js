const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply('Bu komutu kullanabilmek için `Üyeleri Yasakla` iznine sahip olmalısın!');

  let yashinu = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  try {
    message.guild.fetchBans()
    .then(bans => {
      message.channel.send(`⛔ \` > \` Sunucudan yasaklanmış kişiler (\`Toplam ${bans.size} yasaklama\`);

${bans.map(c => `${c.user.id} \`|\` **${c.user.username}**#${c.user.discriminator}`).join("\n")}
`)
    })
    } catch (err) {
     message.channel.send(`Yasaklı kullanıcı bulunmamakta!`)
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ban-list', 'banliste'],
  permLevel: 0
};

exports.help = {
    name: "ban-list"
};