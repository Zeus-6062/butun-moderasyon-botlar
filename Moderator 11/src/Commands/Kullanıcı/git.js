const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")
module.exports = {
  conf: {
    aliases: ["git"],
    name: "git",
    help: "git [Kullanıcı]"
  },

  run: async (client, message, args, embed) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) message.channel.send(embed.setDescription("Kimin yanına gideceğini belirtmen lazım."))

    if (!message.member.voice.channelID) {
        message.channel.send(embed.setDescription("Birisinin yanına gitmek için ilk önce seste olman lazım."))
    }

    if (!message.member.voice.channel || !member.voice.channel || message.member.voice.channelID == member.voice.channelID) {
        return message.channel.send(embed.setDescription("Belirtilen kullanıcı ses kanalında değil."))
    }
    if(!message.member.hasPermission('ADMINISTRATOR')) {
      const reactionFilter = (reaction, user) => {
        return ['✅'].includes(reaction.emoji.name) && user.id === member.id;
      };
      message.channel.send(`${member}`, {embed: embed.setAuthor(member.displayName, member.user.avatarURL({dynamic: true, size: 2048})).setDescription(`
      ${message.author} seni ses kanalına gelmek için izin istiyor! Onaylıyor musun?`)}).then(async msj => {
        await msj.react('✅');
        msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
          let cevap = c.first();
      if (cevap) {
        message.member.voice.setChannel(member.voice.channelID);
            msj.delete();
            message.react('✅').catch();
      };
        });
      });
    }
    if(message.member.hasPermission('ADMINISTRATOR')) {
        message.member.voice.setChannel(member.voice.channelID);
        message.react('✅').catch();
        message.channel.send(embed.setDescription(`${member} isimli kullanıcının kanalına girdiniz.`))
    } 
  }}