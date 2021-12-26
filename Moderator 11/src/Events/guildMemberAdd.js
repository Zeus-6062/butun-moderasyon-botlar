const conf = require("../configs/config.json");
const ayar = require("../configs/settings.json")
const emoji = require("../configs/emoji.json");
const { Discord} = require("discord.js");

const moment = require("moment")
moment.locale("tr")
module.exports = async (member) => {

  let hesap = member.user.createdTimestamp
  let durum = new Date().getTime() - member.user.createdAt.getTime() < 1000 * 60 * 60 * 24 * 7;
  let b = new Date().getTime() - member.user.createdAt.getTime()

  let register = member.guild.channels.cache.find(x => x.id === conf.Register.RegisterChannel)
  let rules = member.guild.channels.cache.find(x => x.id === conf.Rules)

  if (!durum){
    member.setNickname(`${conf.Ktag} İsim ' Yaş`).catch()
    member.roles.add([conf.Register.UnregRole]).catch()

    register.send(`
Sunucumuza hoş geldin ${member}, Seninle beraber **${member.guild.memberCount}** kişiyiz! 
          
Hesabın **${moment(hesap).locale('tr').format('LLL')}** tarihinde oluşturulmuş. ${moment.duration(b).format("d [gün]")}
          
Sunucumuza kayıt olmak için tagımızı alıp ses teyit vermelisin.
          
${rules} kanalından kurallarımızı okumalısın.

Sunucuya kayıt olduktan sonra kuralları okumuş kabul edeceğiz ve içeride yapılan cezai-işlemlerde bunu göz önünde bulunduracağız. İyi eğlenceler. :tada::tada::tada:`);
      
} else {
  member.setNickname(`${conf.Ktag} Yeni ' Hesap`).catch()
  member.roles.add([conf.FakeAccRole]).catch()

  return register.send(`
  ${member} (\`${member.id}\`) Sunucumuza katıldı fakat hesabı \`${moment.duration(b).format("d [gün]")}\` önce oluşturulduğu için cezalıya atıldı.`)
}

}
module.exports.conf = {
  name: "guildMemberAdd",
};
