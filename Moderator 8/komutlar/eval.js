const { MessageEmbed } = require("discord.js");
const cfg = require("../config.js");

module.exports.run = async(client, message, args) => {
  
let Vegas = ["812248313507741696","750167769055625267"] 
if(!Vegas.includes(message.member.id)) return;
if (!args[0]) return 
let code = args.join(' ');
function clean(text) {
if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
return text;
};
try { 
var evaled = clean(await eval(code));
if(evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace("token", "Yasaklı komut").replace(client.token, "Yasaklı komut");
message.channel.send(`${evaled.replace(client.token, "Yasaklı komut")}`, {code: "js", split: true});
} catch(err) { message.channel.send(err, {code: "js", split: true}) };
  
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['eval'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'eval'
  };