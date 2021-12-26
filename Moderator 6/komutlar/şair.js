module.exports.operate = ({client, msg, args, cfg}) => {
    client.beko(msg, cfg.roles.şair, msg.author, msg.guild, "normal", args[0]);
  };
  module.exports.help = {
    name: "şair",
    alias: ["şair","sair","poet"]
  };