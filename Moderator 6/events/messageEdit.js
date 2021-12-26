module.exports.help = { name: "messageUpdate" };

class MessageUpdate {
  constructor(oldMessage, newMessage, sunucu) {
    this.oldMessage = oldMessage;
    this.newMessage = newMessage;
    this.sunucu = sunucu;
  }
  logla(kanal) {
    if (this.newMessage.author.bot || this.newMessage.channel.type === "dm") return;
    if (this.newMessage.guild.id !== this.sunucu) return;
    if (this.oldMessage.content.toLowerCase() === this.newMessage.content.toLowerCase()) return;
    if (!kanal) return null;
    kanal.send({
      embed: {
        description:
          this.newMessage.channel.name +
          " kanalında <@" +
          this.newMessage.author +
          "> tarafından bir mesaj düzenlendi. \n\n Eski Mesaj : " +
          this.oldMessage.content +
          "\n\n Yeni Mesaj : " +
          this.newMessage.content,
        color: Math.floor(Math.random() * (0xffffff + 1)),
        author: {
          name: this.newMessage.author.tag,
          icon_url: this.newMessage.author.avatarURL
        },
        thumbnail: {
          url: this.newMessage.author.avatarURL
        },
        timestamp: new Date()
      }
    });
  }
}

module.exports.event = (oldMessage, newMessage, { sunucu } = require("../config.json"), cfg = require("../config.json") ,client = global.client, db = require("quick.db")) => {
  let messageLog = newMessage.guild.channels.cache.find(c => c.name === "message-log");
  new MessageUpdate(oldMessage, newMessage, sunucu, client).logla(messageLog);
};