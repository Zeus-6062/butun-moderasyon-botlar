module.exports.operate = ({client, msg, args, cfg}) => {
    client.beko(msg, cfg.roles.alone, msg.author, msg.guild, "normal", args[0]);
  };
  module.exports.help = {
    name: "alone",
    alias: ["single","sp","sevgilimyok"]
  };