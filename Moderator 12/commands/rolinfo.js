const Discord = require('discord.js');

module.exports = {
    name: "rolinfo",
    aliases: ["rol-info","rol-bilgi","rolbilgi"],
    run: async(client, message, args) => {
    
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter('Ducky Was Here!').setColor('2F3136').setTimestamp().setThumbnail(message.author.avatarURL);

        if (!client.config.mutehammer.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }  

 const filter = (reaction, user) => {
        return ["✅"].includes(reaction.emoji.name) && user.id === message.author.id; 
    };
    if (!args[0]) return message.channel.send(embed.setDescription("Lütfen bir rol belirtiniz. \n `.rol-bilgi @Rol-adı`")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
        if (!role) return message.channel.send("Lütfen geçerli bir rol belirtiniz. \n `.rol-bilgi @Rol-adı`").then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        let membersWithRole = message.guild.members.cache.filter(member => {
            return member.roles.cache.find(r => r.name === role.name);
        }).map(member => {
            return member.user;
        })

        const status = {
            false: "Hayır",
            true: "Evet"
        }
    let sesteolmayan = message.guild.members.cache.filter(s => s.roles.cache.has(role.id)).filter(s => s.presence.status !== "offline").filter(s => !s.voice.channel).map(s => s).join(' ')
    let sesteolan = message.guild.members.cache.filter(s => s.roles.cache.has(role.id)).filter(s => s.voice.channel).map(s => s).join(', ')

        message.channel.send(`
Rolde  **${role.members.size}** kişi var.

Roldeki üyeler: 
\`\`\`${membersWithRole.join(",")}\`\`\`
       
`).then(message.react(client.config.tik)).then(x => {
x.react("✅");  
x.awaitReactions(filter, {max: 1, time: 10000, error: ['time']}).then(z => {
            let donut = z.first();
            if (donut) {
				
			  x.edit(`Seste olanlar:\n ${sesteolan} \n Seste olmayan: \n ${sesteolmayan}`);
            };
        });
	    });		
        
    

}
  };
