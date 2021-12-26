module.exports.operate = ({client, msg, args, cfg}) => {
    client.beko(msg, cfg.roles.lovers, msg.author, msg.guild, "normal", args[0]);
  };
  module.exports.help = {
    name: "lovers",
    alias: ["couple","sw","sevgilimvar"]
  };