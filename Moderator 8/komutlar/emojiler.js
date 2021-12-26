const Discord = require('discord.js')

exports.run = (bot, message, args) => {
let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      return bot.emojis.cache.get(id).toString();
    }
    message.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    });
    let Embed = new Discord.MessageEmbed()
      .setTitle(`${message.guild.name} Emojileri:`)
      .setDescription(
        `**Hareketli [${Animated}]**:\n${EmojisAnimated}\n\n**Normal [${EmojiCount}]**:\n${Emojis}\n\n**Toplam emoji sayısı [${OverallEmojis}]**`
      )
      .setColor(0x000000);
    message.channel.send(Embed);
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0,
    kategori: 'sunucu'
}

exports.help = {
    name: 'emojiler',
    description: 'Sunucuda bulunan emojileri gösterir.',
    usage: 'emojiler'
}