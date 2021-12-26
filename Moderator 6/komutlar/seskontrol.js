module.exports.operate = ({client, msg, args, author, uye}) => {
  
  if (!author.permissions.has("ADMINISTRATOR")) return;
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**");
  
  if (!uye.voice.channel) {
  msg.channel.send(client.nrmlembed(`**${uye} adlı üye herhangi bir ses kanalında bulunmuyor.**`)).then(m => m.delete({ timeout: 7000 }));
  } else { 
    msg.channel.send(client.nrmlembed(`${uye} adlı üyenin bulunduğu sesli kanal: ${uye.voice.channel}\nKulaklık Durumu: **${uye.voice.selfDeaf ? "Kulaklığı Kapalı" : "Kulaklığı Açık"}**\nMikrofon Durumu: **${uye.voice.selfMute ? "Mikrofonu Kapalı" : "Mikrofunu Açık"}**`)).then(m => m.delete({ timeout: 3000 }));
  };
};

module.exports.help = {
  name: "seskontrol",
  alias: ["skontrol", "kanalkontrol"],
  description: ""
};