const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const moment = require('moment')
exports.run = async (client, message, args) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
     let embed = new MessageEmbed().setTimestamp().setColor("RANDOM").setFooter(`RK`);
     if (!message.member.roles.cache.has("ID") && !message.member.hasPermission("ADMINISTRATOR")){ return message.channel.send(embed.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin`)).then(x => x.delete({timeout: 10000}));
     
    }else{
        if(!member) return message.channel.send(embed.setDescription(`Bir üye belirt.`))
        let data = db.fetch(`tagverdi.${member.id}`)
    
        if(data) return message.channel.send(`Bu kişi daha önceden tag almış.`).then(x => x.delete({timeout: 10000}));
            const filter = (reaction, user) => {
                return ["✅"].includes(reaction.emoji.name) && user.id === member.id; 
            };
            message.channel.send(embed.setDescription(`${member}, ${message.author} seni tag aldı olarak bünyesine alıyor kabul ediyor musun?`).setFooter(`Kabul etmek için 15 saniyen mevcut.`)).then(x => {
     x.react("✅");
                x.awaitReactions(filter, {max: 1, time: 15000, error: ['time']}).then(resp => {
                    let response = resp.first();
                    if (response) {
                db.add(`aldı.${message.author.id}.tag`, +1);
                db.push(`tagaldı.${message.author.id}`, {
                    guildName: `${member}`,
                    guildNameid: `${member.id}`,
                    Zaman: Date.now(),
                    Yetkili: message.author.id
                });
                db.set(`tagverdi.${member.id}`,true)
    
                let datas = db.get(`aldı.${message.author.id}.tag`)
        
                message.channel.send(embed.setDescription(`${member} tag aldı listenize kayıt ettim. \n Toplam ${datas}`).setFooter(`Bize desteğinden dolayı teşekkürler.`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))).then(x => x.delete({timeout: 10000}));
            };
        });
            })                
            
            }
    
            };
  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["tagaldı"],
  permLvl: 0,
}

  exports.help = {
  name: 'tagaldı'
}