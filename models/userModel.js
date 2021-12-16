const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	usuario: { type: String, required: true },
	contrasenia: { type: String, required: true },
});

const userModel = mongoose.model("usuario", userSchema);

module.exports = { userModel };
