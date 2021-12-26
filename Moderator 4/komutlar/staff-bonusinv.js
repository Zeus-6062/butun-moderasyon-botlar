const { MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json');
const DataBase = require('quick.db');

exports.run = async(client, message, args) => { 

if(!message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.carpi)

let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!user) return message.react(ayarlar.carpi)

let a = await DataBase.fetch(`davetsayi.${user.id}.${message.guild.id}`) || 0
let fakea = await DataBase.fetch(`fake.${user.id}_${message.guild.id}`) || 0
let daily = await DataBase.fetch(`günlük.${user.id}.${message.guild.id}`) || 0
let ayrılan = await DataBase.fetch(`ayrılan.${user.id}.${message.guild.id}`) || 0
let bonus = await DataBase.fetch(`bonusinv.${user.id}.${message.guild.id}`) || 0

let eklenecek = args[1]
if(!args[1]) return message.react(ayarlar.carpi)

if(args[1]) return message.channel.send(new MessageEmbed() .setDescription(`
${user} adlı kullanıcının envanterine **${eklenecek}** bonus davet eklendi.;

Toplam **${a} davet** (\`${ayrılan} ayrılan, ${fakea} fake, ${(bonus+eklenecek).toString()} bonus\`)
`))
DataBase.add(`bonusinv.${user.id}.${message.guild.id}`, +eklenecek.toString())

};

exports.conf = {
    aliases:["bonusinv"]
};

exports.help = {
    name:'bonus'
}