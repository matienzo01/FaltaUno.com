const mongoose = require("mongoose");
const fs = require("fs");
const { promisify } = require("util");
require("dotenv").config();

const fakefs = {
    readAsyn: promisify(fs.readFile),
};
const propuestasSchema = new mongoose.Schema({
    equipo: { type: String, required: true },
    dia: { type: Date, required: true },
    puesto: { type: String, required: true },
    lugar: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: false },
});

propuestasSchema.statics.filtrar = async function (params) {
    await mongoose.connect(process.env.DB_NAME);
    let documentos = await propuestaModel.find(params);
    await mongoose.disconnect();
    return JSON.stringify(documentos);
};

propuestasSchema.statics.crearPropuesta = async function (params) {
    await mongoose.connect(process.env.DB_NAME);
    await propuestaModel.create(params);
    await mongoose.disconnect();
};

propuestasSchema.statics.muestraPropuesta = async function (search) {
    let propuesta = JSON.parse(await this.filtrar(search));
    let archivo = await fakefs.readAsyn("./propuesta/propuesta.html");
    let respuesta = { propuesta: propuesta, html: archivo };
    return JSON.stringify(respuesta);
};

const propuestaModel = mongoose.model("propuesta", propuestasSchema);
module.exports = propuestaModel;
