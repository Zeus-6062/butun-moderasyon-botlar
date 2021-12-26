const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")
module.exports = {
  conf: {
    aliases: ["rolsüz"],
    name: "rolsuz",
    help: "rolsüz ver"
  },

  run: async (client, message, args, embed) => {
    if(![conf.Staff].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
    //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Staff).name}\` yetkisine sahip olman lazım`))

let britarol = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
    
    if(args[0] == "ver") {
        britarol.forEach(x => {
            x.roles.add(conf.Register.UnregRole)
        });
message.channel.send(embed.setDescription(`Sunucuda Rolü olamayan kişilere rol verildi. (\`${britarol.size}\` kişi)`))
} else if (!args[0]){
message.channel.send(embed.setDescription(`Sunucumuzda rolü olmayan \`${britarol.size}\` kişi var bu kişilere rol vermek için \`.rolsüz ver\` komutunu kullan.`))

}
  }}