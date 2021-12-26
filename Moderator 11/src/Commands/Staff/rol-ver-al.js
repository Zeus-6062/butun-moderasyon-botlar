const conf = require("../../Configs/config.json")
module.exports = {
  conf: {
    aliases: ["rol"],
    name: "yetenek",
    help: "rol [Kullanıcı]"
  },

  run: async (client, message, args, embed) => {
    if(![conf.Staff].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
    //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Staff).name}\` yetkisine sahip olman lazım`))

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) { return message.channel.send("Bir kullanıcı belirtmelisin!") }

    let x = args[0];
    if(!x) return message.channel.send(embed.setDescription(`Bir işlem belirtiniz. \`${conf.prefix}rol lgbt/alone/couple\` `)).catch(e => { })

    if(x == "lgbt") {
      if (!member.roles.cache.has(conf.Rol.Lgbt)) {
        member.roles.add(conf.Rol.Lgbt)
        return message.channel.send(embed.setDescription(`${member} üyesine başarıyla <@&${conf.Rol.Lgbt}> rolü verildi.`))
    } else {
        member.roles.remove(conf.Rol.Lgbt)
        return message.channel.send(embed.setDescription(`${member} üyesine başarıyla <@&${conf.Rol.Lgbt}> rolü alındı.`)) 
    }
    }

    if(x == "alone") {
      if (!member.roles.cache.has(conf.Rol.Alone)) {
        member.roles.add(conf.Rol.Alone)
        return message.channel.send(embed.setDescription(`${member} üyesine başarıyla <@&${conf.Rol.Alone}> rolü verildi.`))
    } else {
        member.roles.remove(conf.Rol.Alone)
        return message.channel.send(embed.setDescription(`${member} üyesine başarıyla <@&${conf.Rol.Alone}> rolü alındı.`)) 
    }
    }

    if(x == "couple") {
      if (!member.roles.cache.has(conf.Rol.Couple)) {
        member.roles.add(conf.Rol.Couple)
        return message.channel.send(embed.setDescription(`${member} üyesine başarıyla <@&${conf.Rol.Couple}> rolü verildi.`))
    } else {
        member.roles.remove(conf.Rol.Couple)
        return message.channel.send(embed.setDescription(`${member} üyesine başarıyla <@&${conf.Rol.Couple}> rolü alındı.`)) 
    }
    }
}}