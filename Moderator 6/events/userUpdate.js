module.exports.help = { name: "userUpdate" };

class Tag {
  constructor(oldUser, newUser, client, tagRol, tag, tagsıztag, sunucu) {
    this.oldUser = oldUser;
    this.newUser = newUser;
    this.client = client;
    this.tagrol = tagRol;
    this.tag = tag;
    this.tagsıztag = tagsıztag;
    this.sunucu = sunucu;
  };

  async tagKontrol() {
    const guild = this.client.guilds.cache.get(this.sunucu);
    let nick = guild.members.cache.get(this.newUser.id).displayName;
    if (this.newUser.username.includes(this.tag)) {
      const sembol = nick.replace(this.tagsıztag, this.tag);
      if (this.oldUser.username.includes(this.tag)) return;
      if (this.tagsıztag === "") return guild.members.cache.get(this.newUser.id).roles.add(this.tagrol);
      await guild.members.cache.get(this.newUser.id).roles.add(this.tagrol);
      await guild.members.cache.get(this.newUser.id).setNickname(sembol);
    } else {
      if (!this.oldUser.username.includes(this.tag)) return;
      if (this.tagsıztag === "") return guild.members.cache.get(this.newUser.id).roles.remove(this.tagrol);
      const sembol = nick.replace(this.tag, this.tagsıztag);
      await guild.members.cache.get(this.newUser.id).roles.remove(this.tagrol);
      await guild.members.cache.get(this.newUser.id).setNickname(sembol);
    };
  };
  
  async yasakliTagKontrol(db) {
    var yasakliTagKontrol = db.get(`yasakliTagKontrol_${this.sunucu}`) || "kapali";
    if (yasakliTagKontrol === "kapali") return;
    var yasakliTagRol = db.get(`yasakliTagRol_${this.sunucu}`) || this.cfg.roles.yasaklıTagRol;
    var yasakliTag = db.get(`yasakliTag_${this.sunucu}`) || this.cfg.tag.yasakliTaglar;
    let guild = this.client.guilds.cache.get(this.sunucu);
    yasakliTag.forEach(tag => {
    guild.members.cache.filter(gmember => gmember.user.username.includes(tag))
      .map(u => u.roles.cache.get(this.cfg.roles.booster) ? u.roles.set([this.cfg.roles.booster, yasakliTagRol]) : u.roles.set([yasakliTagRol]));
    });

  }
};

module.exports.event = async (oldUser,newUser,client = global.client,{ roles, tag, sunucu } = require("../config.json"), db = require("quick.db")) => {
  new Tag(oldUser, newUser, client, roles.tagRol, tag.taglıTag, tag.tagsızTag, sunucu).tagKontrol();
};