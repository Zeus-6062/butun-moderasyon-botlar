module.exports.event = (uye, client = global.client, db = require("quick.db"), cfg = require("../config.json")) => {
  if (cfg.roles.jail === "") {} else {
    if (uye.roles.cache.get(cfg.roles.jail)) {
      client.cezalilar.add(uye.id);
    };
  };
};

module.exports.help = { name: "guildMemberRemove" };