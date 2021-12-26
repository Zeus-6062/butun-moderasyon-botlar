const { Schema, model } = require("mongoose");

const schema = Schema({
  id: { type: Number, default: 0 },
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  ceza: { type: Array, default: [] }
});

module.exports = model("britaCeza", schema);
