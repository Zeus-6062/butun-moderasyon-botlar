const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cfg = require("../config.js");

module.exports.run = async (client, message, args) => {
  let embedvegas = new MessageEmbed()
    .setColor(`RANDOM`)
    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }));
  if (message.channel.id !== cfg.chat.fotochat)
    return (
      message.channel.send(embedvegas.setDescription(`Bu Komutu Sadece <#${cfg.chat.fotochat}> Kanalında Kullanabilirsin!`))
        .then(msg => msg.delete({ timeout: 5000 })) &&
      message.channel
        .send(`<#${cfg.fotochat}>`)
        .then(
          msg => msg.delete({ timeout: 5000 }),
          message.react(cfg.react.red)
        )
    );
  let member = message.mentions.members.first() || args[0] || message.author;
  let victim;
  if (member instanceof Discord.GuildMember) {
    victim = member.user;
  } else if (member instanceof Discord.User) {
    victim = member;
  } else {
    victim = await client.users.fetch(member);
  }
  let avatar = victim.avatarURL({ dynamic: true });
  message.channel.send(`${victim.tag.replace("`", "")} ${avatar}`);

 
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['avatar', 'av'],
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  kategori: 'avataar komudu'
};