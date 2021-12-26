const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const qdb = require("quick.db");
const db = new qdb.table("tag")

const ayar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    let embed = new MessageEmbed().setAuthor(member.displayName, member.user.displayAvatarURL({dynamic: true})).setColor(message.member.displayHexColor).setFooter("Kyle ❤️ Relly")

   if (!message.member.roles.cache.has("ID") && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin`)).then(x => x.delete({timeout: 10000}));



    let data = db.get(`tagaldı.${member.id}`) || [];
    let listedData = data.length > 0 ? data.map((value, index) => ` \`${index + 1}.\` ${value.guildName} | (\`${value.guildNameid}\`) ${new Date(value.Zaman).toTurkishFormatDate()}`).join("\n") : "Hiç bir taglı üye almamış.";
    
    message.channel.send(embed.setDescription(`Toplam aldığı üye ${data.length || "**0**"} \n \n ${listedData}`))

    
};

exports.conf = {
    enabled:true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
}
exports.help = {
  name: "tagliste",
  description: 'Taglisteeee.',
  usage: 'tagliste'
} 

