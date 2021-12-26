const { MessageEmbed } = require("discord.js");
const moment = require("moment")
const cfg = require("../config.js");

module.exports.run = async(client, message, args) => {
  
  let vegasembed = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true}))
  let embedvegas2 = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true})).setFooter(client.user.username,client.user.avatarURL({dynamic:true}))
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embedvegas2.setDescription(`✖️ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red))
  let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(m => m.name === args.slice(0).join(" "))
  if(!rol) return message.channel.send(new MessageEmbed().setDescription(`Lütfen tüm argümanları doğru giriniz.\nÖrnek Kullanım: !rolbilgi @Rol/ID/Rolisim`).setColor('RANDOM').setAuthor(message.author.tag, message.member.user.avatarURL({dynamic: true}))).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red))
  message.channel.send(`- ${rol} rol bilgileri\n- Rol Rengi: \`${rol.hexColor}\`\n- Rol ID: \`${rol.id}\`\n- Rol Kişi Sayısı: \`${rol.members.size}\`\n─────────────────\n- Roldeki Kişiler:\n`)
  let vegas =  `${rol.members.map(m=> m .toString()+ " - " + "(\`"+m.id+"\`)").join("\n")}`
  for (var i = 0; i < (Math.floor(vegas.length/2000)); i++) {
  message.channel.send(vegas.slice(0, 2040));
  vegas = vegas.slice(2040);
  };
  if (vegas.length > 0) message.channel.send(vegas);
  
}
module.exports.configuration = {
  name: "rolbilgi",
  aliases: ['roldekiler','rolüyeleri','rolbilgi','rol','rol-bilgi','rolinfo','Rolbilgi','rb'],
  usage: 'rolbilgi [rol]',
  description: 'Belirttiğiniz rol hakkında detaylı bilgi alırsınız.',
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['roldekiler','rolüyeleri','rolbilgi','rol','rol-bilgi','rolinfo','Rolbilgi','rb','rolinfo'],
    permLevel: 0,
    name: "rolbilgi"
  }
  
  exports.help = {
    name: "rolbilgi"
  };
  