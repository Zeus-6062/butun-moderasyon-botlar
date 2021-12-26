const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")
module.exports = {
  conf: {
    aliases: ["sil"],
    name: "temizle",
    help: "temizle [Sayı]"
  },

  run: async (client, message, args, embed) => {
    if(![conf.Staff].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
    //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Staff).name}\` yetkisine sahip olman lazım`))

    if(!args[0] || (args[0] && isNaN(args[0]))) { return message.channel.send(embed.setDescription(`Hatalı , değer belirtmeyi unuttun. \`${ayar.prefix}temizle <Sayı>\``)) }
    if(Number(args[0] > 100)) { return message.channel.send(embed.setDescription(`Hatalı , girdiğin değer 100'den büyük. \`${ayar.prefix}temizle <Sayı>\``)) }
    if(Number(args[0] <= 1)) { return message.channel.send(embed.setDescription(`Hatalı , girdiğin değer 1'den küçük yada eşit. \`${ayar.prefix}temizle <Sayı>\``)) }
        await message.delete().catch();
        message.channel.bulkDelete(Number(args[0])).then(mesaj => 
        message.channel.send(embed.setDescription(`\`${mesaj.size}\` kadar mesaj silindi.`))).catch()
  }}