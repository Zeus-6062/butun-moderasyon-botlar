module.exports.operate = ({client, msg, args, cfg}) => {
    client.beko(msg, cfg.roles.instrumental, msg.author, msg.guild, "normal", args[0]);
  };
  module.exports.help = {
    name: "instrumental",
    alias: ["enstürman","musician","sanatçı","sanat"]
  };