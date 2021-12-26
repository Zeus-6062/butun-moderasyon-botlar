module.exports.operate = ({client, msg, args, cfg}) => {
    client.beko(msg, cfg.roles.voiceactor, msg.author, msg.guild, "normal", args[0]);
  };
  module.exports.help = {
    name: "voiceactor",
    alias: ["actor","voiceact","voiceactor","vcact"]
  };