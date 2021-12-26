const Discord = require("discord.js"),
client = new Discord.Client();

const db = require("quick.db");
module.exports.run = async (client, message, args) => {

var yetkiliRolID;
var yetkiliIzinIsmi;
var spotifyEngel;

spotifyEngel = await db.fetch("spotifyEngel");

yetkiliRolID = "818488108085149705" || "";
yetkiliIzinIsmi = "ADMINISTRATOR" || "ADMINISTRATOR";

let reawEmbed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Relly", message.guild.iconURL({dynamic: true})).setColor("010000")

if (!message.member.roles.cache.has(yetkiliRolID) && !message.member.hasPermission(yetkiliIzinIsmi)) return message.channel.send(":no_entry_sign: Yeterli izinlere sahip değilsin!");

if (!spotifyEngel) {
db.set("spotifyEngel", true);
message.channel.send(reawEmbed.setDescription(`Spotify engel başarıyla aktif edildi!`));
return;
} else if (spotifyEngel) {
db.delete("spotifyEngel");
message.channel.send(reawEmbed.setDescription(`Spotify engel başarıyla devre dışı bırakıldı!`));
return;
}
};
exports.conf = {
    guildOnly: false,
    aliases: ["partiengel", "partyengel","spoengel"],
    permLevel: 0,
  }
  
  exports.help = {
    name: 'spotifyengel'
    
  }