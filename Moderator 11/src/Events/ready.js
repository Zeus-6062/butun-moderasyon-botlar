const client = global.client;
const conf = require("../configs/config.json");
const ayar = require("../configs/settings.json")
const emoji = require("../configs/emoji.json")
const penals = require("../Schemas/penals");
const {MessageEmbed} = require("discord.js")
module.exports = async (message , member) => {

  let botVoiceChannel = client.channels.cache.get(ayar.botSes); 
  if (botVoiceChannel) 
  botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
  client.user.setPresence({ activity: { name: ayar.botDurum}, status: "idle" });

setInterval(async () => {  
        

const guild = client.guilds.cache.get(ayar.guildID);
const tagData = require('../Schemas/banned-tag')
let data = await tagData.find({ guildID: guild.id }, async(data) => {
        if (!data) return;
        if (data) {
            let taglar = data.map(s => s.Tag)
            if (taglar.some(tag => member.user.tag.toLowerCase().includes(tag))) {
                setTimeout(async() => {
                    await member.roles.set([conf.BannedTag])
                    await member.setNickname(`Banned ' Tag`)
                }, 2000)

            }
        }
    })
if (!guild) return;
const finishedPenals = await penals.find({ guildID: guild.id, active: true, temp: true, finishDate: { $lte: Date.now() } });
finishedPenals.forEach(async (x) => {
  const member = guild.members.cache.get(x.userID);
  if (!member) return;
  if (x.type === "CHAT-MUTE") {
    x.active = false;
    await x.save();
    await member.roles.remove(conf.Mute.ChatMute).catch()
    client.channels.cache.get(conf.Mute.MuteLogChannel).send(new MessageEmbed().setColor("00ffee").setFooter("huh? Brita?").setDescription(`${member} üyesinin susturulması, süresi bittiği için kaldırıldı!`));
  }

  if (x.type === "JAIL") {
    x.active = false;
    await x.save();
    await member.setRoles(conf.Register.UnregRole).catch()
    client.channels.cache.get(conf.Jail.JailLogChannel).send(new MessageEmbed().setColor("00ffee").setFooter("huh? Brita?").setDescription(`${member} üyesinin jaili, süresi bittiği için kaldırıldı!`));
  } 

  if (x.type === "VOICE-MUTE") {
    if (member.voice.channelID) {
      x.removed = true;
      await x.save();
      if (conf.Vmute.Vmute) member.voice.setMute(false).catch()
    }
    x.active = false;
    await x.save();
    member.roles.remove(conf.Vmute.Vmute).catch()
    client.channels.cache.get(conf.Vmute.VmuteLogChannel).send(new MessageEmbed().setColor("00ffee").setFooter("huh? Brita?").setDescription(`${member} üyesinin **sesli kanallarda** susuturulması, süresi bittiği için kaldırıldı!`));
  }
});

const activePenals = await penals.find({ guildID: guild.id, active: true });
activePenals.forEach(async (x) => {
  const member = guild.members.cache.get(x.userID);
  if (!member) return;
  if (x.type === "CHAT-MUTE" && ![conf.Mute.ChatMute].some((x) => member.roles.cache.has(x))) return member.roles.add(conf.Mute.ChatMute);
  if ((x.type === "JAIL") && ![conf.Jail.Jail].some((x) => member.roles.cache.has(x))) return member.setRoles(conf.Jail.Jail);
  if (x.type === "VOICE-MUTE") {
    if (![conf.Vmute.Vmute].some((x) => member.roles.cache.has(x))) member.roles.add(conf.Vmute.Vmute);
    if (member.voice.channelID && !member.voice.serverMute) member.voice.setMute(true);
  }
});
}, 1000 * 60);

};
module.exports.conf = {
    name: "ready",
  };