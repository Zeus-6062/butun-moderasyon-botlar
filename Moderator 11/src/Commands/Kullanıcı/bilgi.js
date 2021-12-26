const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")
module.exports = {
  conf: {
    aliases: ["rol-bilgi","rbilgi"],
    name: "rol-info",
    help: "rbilgi [Rol]"
  },

  run: async (client, message, args, embed) => {
    if(![conf.Staff].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
    //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Staff).name}\` yetkisine sahip olman lazım`))

        let rol = message.mentions.roles.first() || message.guild.roles.cache.find(x => x.id === args[0]);
        
        if(!rol || message.mentions.roles.size < 1 && isNaN(args[0])) {
        return message.channel.send(embed.setDescription(`Hatalı , rol belirtmeyi unuttun. Doğru kullanım \`${ayar.prefix}@Rol/ID\``))
    }
        
        if(rol.members.size < 1) {
        return message.channel.send(embed.setDescription(`Belirtilen rolde hiç üye bulunmamakta.`))
    }
        
        message.channel.send(embed.setDescription(`
        ${rol} Rolüne sahip üyeler ( \`${rol.members.size}\` )
        
        ${rol.members.map(x => `<@${x.id}>`).join('\n')}
        `))    
  }}