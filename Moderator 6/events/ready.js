class Login {
  constructor(client) {
    this.client = client;
  }
  log(guild) {
    this.client.user.setStatus("idle");
    console.log("("+this.client.user.username +") adlı hesapta [" +guild.name +"] adlı sunucuda giriş yapıldı.");
  }
}

class ChatEdit {
  constructor(client, sunucu, chat, sncIsim, tagrolIsim, tag) {
    this.client = client;
    this.sunucu = sunucu;
    this.chat = chat;
    this.sncIsim = sncIsim;
    this.tagrolIsim = tagrolIsim;
    this.tag = tag;
  }
  edit() {
    let guild = this.client.guilds.cache.get(this.sunucu);
    let kanal = guild.channels.cache.get(this.chat);
    if (!kanal) return null;
    let cookie = 0;
    let sayi = guild.memberCount;
    let taglı = guild.members.cache.filter(u => u.user.username.includes(this.tag)).size;
    let online = guild.members.cache.filter(u => u.presence.status !== "offline").size;
    cookie = cookie + 1;
    if (cookie === 1) {
      kanal.edit({
        topic: `**${this.sncIsim}: ${this.client.emojili(sayi)} Online: ${this.client.emojili(online)} ${this.tagrolIsim}: ${this.client.emojili(taglı)}**`
      });
    } else if (cookie === 2) {
      kanal.edit({
        topic: `**${this.sncIsim}: ${this.client.emojili(sayi)} Online: ${this.client.emojili(online)} ${this.tagrolIsim}: ${this.client.emojili(taglı)}**`
      });
    } else if (cookie === 3) {
      kanal.edit({
        topic: `**${this.sncIsim}: ${this.client.emojili(sayi)} Online: ${this.client.emojili(online)} ${this.tagrolIsim}: ${this.client.emojili(taglı)}**`
      });
    } else if (cookie === 4) {
      cookie = 0;
      kanal.edit({
        topic: `**${this.sncIsim}: ${this.client.emojili(sayi)} Online: ${this.client.emojili(online)} ${this.tagrolIsim}: ${this.client.emojili(taglı)}**`
      });
    };
  }
}

module.exports.help = { name: "ready" };

module.exports.event = (client = global.client, { sunucu, roles } = require("../config.json"), cfg = require("../config.json"), db = require("quick.db")) => {
  new Login(client).log(client.guilds.cache.get(sunucu));
  setInterval(() => new ChatEdit(client, sunucu, cfg.chats.gchat, cfg.snc.sncIsim, cfg.snc.tagRolIsim, cfg.tag.taglıTag).edit(), client.getDate(5, "dakika"));
};