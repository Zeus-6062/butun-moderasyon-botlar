const { MessageEmbed } = require("discord.js");
require('discord-reply');
const db = require("quick.db");
const moment = require("moment");
const conf = require('../ayarlar.json');

exports.run = async(client, message, args) => {
    
    let embed = new MessageEmbed().setColor('RANDOM')
if(!message.member.roles.cache.has(conf.kayıtcı) && !message.member.hasPermission(8)) return message.react(conf.carpi)
    let data = await db.get("teyit") || {};

let toplamkayıt = db.fetch(`teyit.${message.author.id}.toplam`)
let kızkayıt = db.fetch(`teyit.${message.author.id}.kadın`)
let erkekkayıt = db.fetch(`teyit.${message.author.id}.erkek`) 

    let xd = Object.keys(data);
    let topteyit = xd.filter(dat => message.guild.members.cache.has(dat)).sort((a, b) => Number((data[b].erkek || 0) + (data[b].kadın || 0)) - Number((data[a].erkek || 0) + (data[a].kadın || 0))).map((value, index) => `\`${index + 1}.\` ${message.guild.members.cache.get(value)} **${((data[value].erkek || 0) + (data[value].kadın || 0))}** Kayıt (**${((data[value].erkek || 0))}** Erkek, **${((data[value].kadın || 0))}** Kadın)`).splice(0, 25);

    let seninsıralamanan = xd.filter(dat => message.guild.members.cache.get(message.author.id)).sort((a) => Number((data[message.author.id].erkek || 0) + (data[message.author.id].kadın || 0)))

    message.channel.send(embed.setAuthor(`${message.member.user.tag}`, message.member.user.displayAvatarURL({ dynamic: true })) 
    .setDescription(`Sunucumuzda en çok kayıt yapan yetkililer;
    ───────────────────────────
    ${topteyit.join("\n") || "Teyit veritabanı bulunamadı!"}
    
    Sıralamada ${xd.filter(dat => db.has(`${dat}`)).sort((a, b) => Number((data[b].erkek || 0) + (data[b].kadın || 0))  - Number((data[a].erkek || 0) + (data[a].kadın || 0))).map((value, index) => `${index +1}.`)}'sin. Toplam **${toplamkayıt}**(\`${kızkayıt} kadın, ${erkekkayıt} erkek\`) teyitin bulunmakta.

    `)).catch().sil(25)

 
}

exports.conf = {
    aliases: ['tt']
};
exports.help = {
    name:'topteyit',
    description:'Sunucunun Top 10 Teyitini listeler.'
}