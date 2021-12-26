const conf = require("../Configs/config.json");
const ayar = require("../Configs/settings.json")
const emoji = require("../Configs/emoji.json")
const Discord = require("discord.js")
const btag = require("../Schemas/banned-tag")

module.exports = async (oldUser, newUser) => {

        if(oldUser.username !== newUser.username) {
        if(oldUser.bot || newUser.bot) return;
        
        let client = oldUser.client;
        let guild = client.guilds.cache.get(ayar.guildID)
        let member = guild.members.cache.get(oldUser.id)
        let channel = client.channels.cache.get(conf.BTagLogChannel)
    
        const embed = new Discord.MessageEmbed().setColor("00ffee").setFooter("huh? Brita?").setTimestamp()

let data = await btag.find({guildID: member.guild.id})
if(!data) return;
if(data) {
    let tags = data.map(x => x.Tag)
    if(tags.some(tag => newUser.username.includes(tag)) && (!member.roles.cache.has(conf.BannedTag))) {
    member.setRoles([conf.BannedTag]).catch()
    member.setNickname(`Banned ' Tag`).catch()
    channel.send(embed.setDescription(`${member} ( \`${member.id}\` ) yasaklı tagımızı aldığı için <@&${conf.BannedTag}> rolü verildi.`))
    } else if (uye.roles.cache.has(conf.BannedTag)) {
    member.roles.cache.has(conf.Booster) ? await member.roles.set([conf.Register.UnregRole, conf.Booster]).catch() : await member.roles.set([conf.Register.UnregRole]).catch()
    member.setNickname(`${conf.Ktag} İsim ' Yaş`).catch()
    channel.send(embed.setDescription(`${member} ( \`${member.id}\` ) yasaklı tagımızı çıkardığı için kayıtsıza atıldı.`))
    
}}
}
}
module.exports.conf = {
    name: "userUpdate",
  };