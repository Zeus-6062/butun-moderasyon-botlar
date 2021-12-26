const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  Tag: { type: String, default: "" },
  Reason: { type: Array, default: [] },
  Roles: { type: String, default: "" },
  date:  { type: Number, default: Date.now() }
});

module.exports = model("britaBannedTag", schema);