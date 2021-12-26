module.exports.operate = ({author, msg, args}) => {
  if (!author.permissions.has("ADMINISTRATOR")) return;
  let yazi = args.join(" ");
  if (!yazi) return;
  msg.delete();
  msg.channel.send(yazi, { disableMentions: "everyone" });
};

module.exports.help = {
  name: "yaz",
  alias: ["y"]
};