const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const acar = client.veri.kayıtRolleri;
const acarveri = client.veri;
module.exports = {
    Isim: "avatar",
    Komut: ["av", "pp"],
    Kullanim: "pp @acar/ID",
    Aciklama: "Etiketlenen üyenin avatarını büyültür.",
    Kategori: "Üye",
    TekSunucu: true,
  /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @param {Guild} guild
   */
  onRequest: async function (client, message, args, guild) {
    let victim = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
	let avatar = victim.avatarURL({ dynamic: true, size: 2048 });
    let embed = new MessageEmbed()
	.setColor("#2F3136")
    .setAuthor(victim.tag, avatar)
    .setFooter(`${message.member.displayName} tarafından istendi!`, message.author.avatarURL({ dynamic: true }))
	.setDescription(`[Resim Adresi](${avatar})`)
	.setImage(avatar)
	message.channel.send(embed);

}
};
