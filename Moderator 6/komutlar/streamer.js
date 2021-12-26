module.exports.operate = ({client, msg, args, cfg}) => {
    client.beko(msg, cfg.roles.streamer, msg.author, msg.guild, "normal", args[0]);
  };
  module.exports.help = {
    name: "streamer",
    alias: ["streamerr","stream","yayıncı","youtube"]
  };