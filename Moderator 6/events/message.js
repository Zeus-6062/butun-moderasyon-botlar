module.exports.event = (msg, client = global.client, cfg = require("../config.json")) => {
  if (msg.content.toLowerCase().startsWith("!tag")) return msg.channel.send(cfg.tag.taglıTag);
  if (msg.content.toLowerCase().startsWith("!link")) return msg.channel.send(cfg.link);
  let prefixMention = new RegExp(`^<@!${client.user.id}>`);
  let pref = msg.content.match(prefixMention) ? msg.content.match(prefixMention)[0] : cfg.prefix.toLowerCase();
  if (!msg.content.toLowerCase().startsWith(cfg.prefix)) return;
  if (msg.author.bot || msg.guild.id !== cfg.sunucu || msg.channel.type === "dm") return;
  let args = msg.content.slice(cfg.prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();
  let cmd;
  let author = msg.guild.member(msg.author);
  let uye = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args[0]);
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  };
  if (cmd) {
    cmd.operate({ client: client, msg: msg, args: args, author: author, uye: uye, cfg: cfg, db: require("quick.db") });
  };
};

module.exports.help = { name: "message" };