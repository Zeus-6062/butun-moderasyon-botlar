module.exports.operate = async ({client, msg, args, cfg, author}) => {
  if (!author.hasPermission("ADMINISTRATOR")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(x => x.delete({timeout: 5000}));
  function ortalama(array) {
    if(array.length <= 0) return 0;
    const average = list => list.reduce((prev, curr) => prev + curr) / list.length;
    return Math.floor(average(array));
  };
  let members = msg.guild.members.cache;
  let genel = members.filter(member => member.nickname && member.nickname.includes('|') && !isNaN(member.nickname.split('| ')[1])).map(member => Number(member.nickname.split('| ')[1]));
  let erkek = members.filter(member => cfg.roles.erkek.some(rol => member.roles.cache.has(rol)) && member.nickname && member.nickname.includes('|') && !isNaN(member.nickname.split('| ')[1] || "")).map(member => Number(member.nickname.split('| ')[1]));
  let kiz = members.filter(member => cfg.roles.kız.some(rol => member.roles.cache.has(rol)) && member.nickname && member.nickname.includes('|') && !isNaN(member.nickname.split('| ')[1] || "")).map(member => Number(member.nickname.split('| ')[1]));
  let tagli = members.filter(member => member.roles.cache.has(cfg.tagrol) && member.nickname && member.nickname.includes('|') && !isNaN(member.nickname.split('| ')[1] || "")).map(member => Number(member.nickname.split('| ')[1]));
  let ses = members.filter(member => member.voice.channel && member.nickname && member.nickname.includes('|') && !isNaN(member.nickname.split('| ')[1] || "")).map(member => Number(member.nickname.split('| ')[1]));
  msg.channel.send({
   embed: { 
     description: `\`Sunucu Yaş Ortalaması:\` ${client.emojili(`${ortalama(genel)}`)}\n\`Erkek:\` ${client.emojili(`${ortalama(erkek)}`)}\n\`Kız:\` ${client.emojili(`${ortalama(kiz)}`)}\n\`Ekip:\` ${client.emojili(`${ortalama(tagli)}`)}\n\`Ses:\` ${client.emojili(`${ortalama(ses)}`)}`, 
     color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],
     timestamp: new Date(), 
     author: { name: msg.guild.name, icon_url: msg.guild.iconURL({dynamic:true})}
   } 
  });
};

module.exports.help = {
  name: "yaş-ortalaması",
  alias: ["yaşortalaması", "yas-ortalamasi", "yasortalamasi"]
};