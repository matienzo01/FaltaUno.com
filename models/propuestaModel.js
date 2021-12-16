const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const propuestasSchema = new mongoose.Schema({
	equipo: { type: String, required: true },
	dia: { type: Date, required: true },
	puesto: { type: String, required: true },
	lugar: { type: String, required: true },
	descripcion: { type: String, required: true },
	precio: { type: Number, required: true },
});

propuestasSchema.statics.filtrar = async function (params) {
	await mongoose.connect(process.env.DB_NAME);
	let busqueda = {};
	if (!params.keys().next().done) {
		//! Es la unica forma que encontre de chequear que no este vacio
		const tipo = params.get("tipo");
		if (tipo === "posicionInput") busqueda.puesto = params.get("filtro");
		else busqueda.lugar = params.get("filtro");
	}
	let documentos = await propuestaModel.find(busqueda);
	await mongoose.disconnect();
	return JSON.stringify(documentos);
};

propuestasSchema.statics.crearPropuesta = async function (params) {
	await mongoose.connect(process.env.DB_NAME);
	await propuestaModel.create(params);
	await mongoose.disconnect();
};

const propuestaModel = mongoose.model("propuesta", propuestasSchema);
module.exports = propuestaModel;
