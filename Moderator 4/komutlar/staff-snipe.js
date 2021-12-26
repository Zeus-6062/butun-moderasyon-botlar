const { MessageEmbed, MessageAttachment } = require("discord.js");
const cdb = require("quick.db");
const moment = require("moment");
const fs = require("fs");
moment.locale("tr");

exports.run = async (client, message, args) => {

    const snipedata = await cdb.get(`snipe.${message.guild.id}`);
    const snipe_db = await cdb.get(`snipedb.${message.guild.id}`);
    const sayı = args[0];

    if (!snipedata) return message.channel.send(
        new MessageEmbed()
            .setDescription(`Daha önceden hiç mesaj silinememiş!`)
            .setColor("RED"))

    if (isNaN(sayı)) return message.channel.send(
        new MessageEmbed()
            .setDescription(`Bir sayı belirtmelisin!`)
            .setColor("RED"))

    const liste = snipedata.map((x, sleax) => `\`${sleax + 1}. Silinen Mesaj\` \nMesajı Atan Üye: **${x.authors}** \nMesajın İçeriği: ${x.contents} \nMesaj Silme Tarihi: **${moment(x.tarih).format('LLL')}**`).slice(0, sayı);

    const embed = new MessageEmbed()
        .setAuthor(`${message.guild.name}`, message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
        .setDescription(liste)
        .setColor("GREEN")
        .setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
        .setFooter(`${message.author.username}`, message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
        .setTimestamp()
    message.channel.send(embed).catch(x => {

        const listex = snipedata.map((x, index) => `\n\n${index + 1}. Silinen Mesaj \nMesajı Atan Üye: ${x.authors} \nMesajın İçeriği: ${x.contents} \nMesaj Silme Tarihi: ${moment(x.tarih).format('LLL')}`).slice(0, sayı);

        const files = "./snipe.txt";
        const content = '\u200B'
        if (!snipe_db) {
            fs.writeFileSync(files, content);
            cdb.set(`snipedb.${message.guild.id}`, "snipe");
        }

        const cs = fs.readFileSync('snipe.txt', 'utf-8');
        fs.writeFileSync('snipe.txt', listex + cs)
        const uwu = fs.readFileSync('snipe.txt');
        const attachment = new MessageAttachment(uwu, 'snipe.txt');

        message.channel.send(`${message.author}, mesaj sığmadığı için dosya olarak gönderdim!`, attachment);

        setTimeout(() => {
            fs.unlinkSync("snipe.txt")
            cdb.delete(`snipedb.${message.guild.id}`)
        }, 1000);
    })
}
exports.conf = {
    aliases: []
};

exports.help = {
    name: "snipe"
};