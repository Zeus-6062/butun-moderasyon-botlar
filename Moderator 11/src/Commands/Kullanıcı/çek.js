const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")
module.exports = {
  conf: {
    aliases: ["çek"],
    name: "çek",
    help: "çek [Kullanıcı]"
  },

  run: async (client, message, args, embed) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) message.channel.send(embed.setDescription("Kimi yanına çekeceğini belirtmen lazım."))

    if (!message.member.voice.channel || !member.voice.channel || message.member.voice.channelID == member.voice.channelID) 
    message.channel.send(embed.setDescription("Belirtilen kullanıcı ses kanalında değil.")).then(x => x.delete({timeout: 5000})); 

    if(!message.member.hasPermission('ADMINISTRATOR')) {

      const reactionFilter = (reaction, user) => {
        return ['✅'].includes(reaction.emoji.name) && user.id === member.id;
      };
      message.channel.send(`${member}`, {embed: embed.setAuthor(member.displayName, member.user.avatarURL({dynamic: true, size: 2048})).setDescription(`
      ${message.author} seni ses kanalına çekmek için izin istiyor! Onaylıyor musun?`)}).then(async msj => {
        await msj.react('✅');
        msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
          let cevap = c.first();
      if (cevap) {
        member.voice.setChannel(message.member.voice.channelID);
            msj.delete();
            message.react('✅').catch();
      };
        });
      });
    }
    if(message.member.hasPermission('ADMINISTRATOR')) {
        member.voice.setChannel(message.member.voice.channelID);
        message.react('✅').catch();
        message.channel.send(embed.setDescription(`${member} isimli kullanıcı, ${message.author} tarafından odaya çekildi.`))
    } 
  }}

