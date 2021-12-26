const { Schema, model } = require("mongoose");

const schema = Schema({
	userID: { type: String, default: "" },
	guildID: { type: String, default: "" },
	top: { type: Number, default: 0 },
    tarih: { type: Number, default: Date.now() },
	erkek: { type: Number, default: 0 },
	kız: { type: Number, default: 0 },
    name : { type: Array, default: [] },
    _id: String,
    teyitler: Array
});

module.exports = model("britaRegister", schema);
