module.exports.operate = ({client, msg, args, cfg}) => {
    client.beko(msg, cfg.roles.ressam, msg.author, msg.guild, "normal", args[0]);
  };
  module.exports.help = {
    name: "ressam",
    alias: ["artdesigner","art","paint","painter"]
  };