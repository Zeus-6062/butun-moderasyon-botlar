const config = require("../config.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const db = require('quick.db')

exports.run = async (client, message, args) => {

  let UyarıVegas = await db.fetch(`streameruyarı_${newState.member.id}`);
  if(newState.member.bot) return
  if(newState.member.hasPermission('ADMINISTRATOR')) return
  try {
  if(!newState.member.nickname && !newState.member.nickname.includes('|') && !isNaN(newState.member.nickname.split('| ')[1] || "")) return 
  if(!newState.member.voice || newState.member.voice.channelID != config.streamer18kanal1) return 
  if(Number(newState.member.nickname.split('|')[1]) < 18) { 
  newState.member.voice.setChannel(null)
  db.add(`streameruyarı_${newState.member.id}`, 1)
  if(UyarıVegas === 1) return db.delete(`streameruyarı_${newState.member.id}`) && newState.member.roles.add(config.streamercezalırolü) && client.channels.cache.get(config.streamercezalılog).send(`${newState.member} üyesi **18 yaşından** küçük olmasına rağmen +18 kanallara giriş yaptığından dolayı sesten atıldı! Girdiği kanal: ${newState.channel.name}`)
  } 
  }catch{{}}
  let UyarıVegas2 = await db.fetch(`streameruyarı_${newState.member.id}`);
  if(newState.member.bot) return
  if(newState.member.hasPermission('ADMINISTRATOR')) return
  try {
  if(!newState.member.nickname && !newState.member.nickname.includes('|') && !isNaN(newState.member.nickname.split('| ')[1] || "")) return console.log('bu kod kyle için ducky tarafından editlenmiştir.')
  if(!newState.member.voice || newState.member.voice.channelID != config.streamer18kanal2) return 
  if(Number(newState.member.nickname.split('|')[1]) < 18) { 
  newState.member.voice.setChannel(null)
  db.add(`streameruyarı_${newState.member.id}`, 1)
  if(UyarıVegas2 === 1) return db.delete(`streameruyarı_${newState.member.id}`) && newState.member.roles.add(config.streamercezalırolü) && client.channels.cache.get(config.streamercezalılog).send(`${newState.member} üyesi **18 yaşından** küçük olmasına rağmen +18 kanallara giriş yaptığından dolayı sesten atıldı! Girdiği kanal: ${newState.channel.name}`)
  } 
  }catch{{}}
}
module.exports.configuration = {
  name: "voiceStateUpdate"
};
