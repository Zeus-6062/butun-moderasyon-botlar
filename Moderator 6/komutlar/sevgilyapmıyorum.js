module.exports.operate = ({client, msg, args, cfg}) => {
    client.beko(msg, cfg.roles.sevgiliyapmıyorum, msg.author, msg.guild, "normal", args[0]);
  };
  module.exports.help = {
    name: "nosw",
    alias: ["sevgiliyapmam","nosw","sevgiliyapmıyorum"]
  };