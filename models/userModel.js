const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();

const userSchema = new mongoose.Schema({
	identificador: { type: String, required: true },
	contrasenia: { type: String, required: true },
});

userSchema.statics.iniciaSesion = async function (body) {
	await mongoose.connect(process.env.DB_NAME);
	let usuario = body.identificador;
	let document = await userModel
		.findOne({})
		.where("identificador")
		.equals(usuario);
	await mongoose.disconnect();
	if (document === null) throw Error("Identificador no coincidente");
	else if (!(await bcrypt.compare(body.contrasenia, document.contrasenia)))
		throw Error("Contraseña incorrecta");
	else {
		let id = document._id;
		let token = await jwt.sign({ id }, "estoy probando");
		return token;
	}
};

userSchema.statics.registraUsuario = async function (params) {
	let salt = await bcrypt.genSalt(10);
	params.contrasenia = await bcrypt.hash(params.contrasenia, salt);
	await mongoose.connect(process.env.DB_NAME);
	await userModel.create(params);
	await mongoose.disconnect();
};

const userModel = mongoose.model("usuario", userSchema);

module.exports = userModel;
