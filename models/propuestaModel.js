const mongoose = require("mongoose");

const propuestasSchema = new mongoose.Schema({
	equipo: { type: String, required: true },
	dia: { type: Date, required: true },
	puesto: { type: String, required: true },
	lugar: { type: String, required: true },
	descripcion: { type: String, required: true },
	precio: { type: Number, required: true },
});

const propuestaModel = mongoose.model("propuesta", propuestasSchema);

module.exports = { propuestaModel };
