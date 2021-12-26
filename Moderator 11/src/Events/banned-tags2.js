const Discord = require("discord.js");
const conf = require("../configs/config.json");
const ayar = require("../configs/settings.json")
const emoji = require("../configs/emoji.json")
const bTag = require("../Schemas/banned-tag")

module.exports = async member => {

    let data = await bTag.find({ guildID: member.guild.id }, async(err, data) => {
        if (!data || !data.length) return;
        if (data) {
            let taglar = data.map(s => s.Tag)
            if (taglar.some(tag => member.user.tag.toLowerCase().includes(tag))) {
                setTimeout(async() => {
                    await member.roles.set([conf.Register.UnregRole])
                    await member.setNickname(`Banned ' Tag`)
                }, 2000)

            }
        }
    })
};