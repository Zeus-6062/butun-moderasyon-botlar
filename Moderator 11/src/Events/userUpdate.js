const conf = require("../Configs/config.json");
const ayar = require("../Configs/settings.json")
const emoji = require("../Configs/emoji.json")
const Discord = require("discord.js")

module.exports = async (oldUser, newUser) => {

        if(oldUser.username !== newUser.username) {
        if(oldUser.bot || newUser.bot) return;
        
        const embed = new Discord.MessageEmbed().setColor("00ffee").setFooter("huh? Brita?").setTimestamp()
        
        let client = oldUser.client;
        let guild = client.guilds.cache.get(ayar.guildID)
        let member = guild.members.cache.get(oldUser.id)
        let channel = client.channels.cache.get(conf.Log.TagLogChannel)
        
        {
        if(newUser.username.includes(conf.Tag) && !member.roles.cache.has(conf.CrewRole)) {
        member.roles.add(conf.CrewRole).catch()
        member.setNickname(member.displayName.replace(conf.Tag)).catch()
        channel.send(embed.setDescription(`${member} ( \`${member.id}\` ) tagımızı (\`${conf.Tag}\`) aldığı için <@&${conf.CrewRole}> rolü verildi.`))
        } else if(!newUser.username.includes(conf.Tag) && member.roles.cache.has(conf.CrewRole)) {
        member.roles.cache.has(conf.Booster) ? await member.roles.set([conf.Register.UnregRole, conf.Booster]).catch() : await member.roles.set([conf.Register.UnregRole]).catch()
        member.setNickname(`${conf.Ktag} İsim ' Yaş`).catch()
        channel.send(embed.setDescription(`${member} ( \`${member.id}\` ) tagımızı (\`${conf.Tag}\`) çıkardığı için kayıtsıza atıldı.`))
        }}}
}
module.exports.conf = {
    name: "userUpdate",
  };