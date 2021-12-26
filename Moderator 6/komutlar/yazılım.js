module.exports.operate = ({client, msg, args, cfg}) => {
    client.beko(msg, cfg.roles.yazılım, msg.author, msg.guild, "normal", args[0]);
  };
  module.exports.help = {
    name: "yazılım",
    alias: ["software","soft","sfw"]
  };