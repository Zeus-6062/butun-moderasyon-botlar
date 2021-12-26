module.exports.operate = ({client, msg, args, cfg}) => {
    client.beko(msg, cfg.roles.lgbt, msg.author, msg.guild, "normal", args[0]);
  };
  module.exports.help = {
    name: "lgbt",
    alias: ["lgbt","lgb","legebete","lbgt"]
  };