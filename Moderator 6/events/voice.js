module.exports.help = { name: "voiceStateUpdate" };

class VoiceChecker {
  constructor(oldState, newState) {
    this.oldState = oldState;
    this.newState = newState;
    this.client = global.client;
  }
  voiceLogger(channel) {
    if (!channel) return null;
    if (!this.oldState.channel && this.newState.channel) return channel.send(this.client.voicembed(`**${this.newState.guild.members.cache.get(this.newState.id).user.username}** - (\`${this.newState.id}\`) adlı üye **${this.newState.channel.name}** adlı kanala giriş yaptı.`)).catch();
    if (this.oldState.channel && !this.newState.channel) return channel.send(this.client.voicembed(`**${this.newState.guild.members.cache.get(this.newState.id).user.username}** - (\`${this.newState.id}\`) adlı üye **${this.oldState.channel.name}** adlı kanalından çıkış yaptı.`)).catch();
    if (this.oldState.channelID !== this.newState.channelID) return channel.send(this.client.voicembed(`**${this.newState.guild.members.cache.get(this.newState.id).user.username}** - (\`${this.newState.id}\`) adlı üye **${this.oldState.channel.name}** adlı kanalından  **${this.newState.channel.name}** kanalına geçiş yaptı.`)).catch();
  }
  checkMute(db) {
    if ((!this.oldState.channel && this.newState.channel) || (this.oldState.channel && this.newState.channel)) {
      let vmuted = db.get(`vmute_${this.newState.guild.id}`) || [{id: null, kalkmaZamani: null}];
      let uye = this.newState.member;
      if (!uye) return null;
      if (vmuted.some(d => d.id == uye.id)) {
        let d = vmuted.find(x => x.id == uye.id);
        if (Date.now() >= d.kalkmaZamani) {
          vmuted = vmuted.filter(d => d.id != uye.id);
          uye.voice.setMute(false);
          db.set(`vmute_${this.newState.guild.id}`, vmuted);
        } else if (uye.voice.channel && !uye.voice.serverMute) {
          uye.voice.setMute(true);
        };
      };
    };
  }
}

module.exports.event = (oldState, newState, db = require("quick.db")) => {
  let kanal = newState.guild.channels.cache.find(c => c.name === "voice-log");
  const checkVoice = new VoiceChecker(oldState, newState);
  checkVoice.checkMute(db);
  checkVoice.voiceLogger(kanal);
};