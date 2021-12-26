const Discord = require("discord.js");
const config = require("../config.js");
const data = require("wio.db");
const db = require("quick.db");
module.exports.run = async (client, message, args) => {

  if (
    !message.member.roles.cache.has(config.kayıtcırol) &&
    !message.member.hasPermission("ADMINISTRATOR")
  )
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          `Bu komutu kullanmak için ayarlanan yetkiye sahip değilsiniz!`
        )
        .setColor("#black")
    );

  const member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.member;

  const user = member.user;


  const memberembed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag)
    .setDescription(
      `Lütfen tüm argümanları doğru yerleştiriniz ve tekrar deneyiniz. \`Örnek\`: .isimler @RK`
    );
  if (!member) return message.channel.send(memberembed);
  let isimleri;



  
    let embed = new Discord.MessageEmbed()
    
      .setDescription(
        `Bu üyenin toplamda \`${
          db.get(`users.${user.id}.registerLog`)
            ? db.get(`users.${user.id}.registerLog`).length
            : 0
        }\` isim kayıtı bulundu;\n\n`
      );
   

    if (db.get(`users.${user.id}.registerLog`) ? true : false) {
      Object.keys(db.get(`users.${member.id}.registerLog`)).forEach(x => {
        embed.description +=
          "`• " +
          db.get(`users.${user.id}.registerLog`)[x][0].isim +
          "` " +
          `(${db.get(`users.${user.id}.registerLog`)[x][0].rol})\n`;
      })
      
  
  };
  
  if(db.get(`users.${user.id}.registerLog`) ? false : true){
    embed.description += `Bu kullanıcı hakkında veri tabanında kayıtlı bir isim bulamadım!`;
  }
  
  message.channel.send(embed);
  

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isimler","geçmiş-isimler"],
  permLvl: 0,
}

  exports.help = {
  name: 'isimler'
}
