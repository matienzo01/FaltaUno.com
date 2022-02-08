const mongoose = require("mongoose");
require("dotenv").config();

const propuestasSchema = new mongoose.Schema({
    equipo: { type: String, required: true },
    dia: { type: Date, required: true },
    puesto: { type: String, required: true },
    lugar: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: false },
});

propuestasSchema.set("toJSON", {
    transform: (document, returnedDocument)=>{
        delete returnedDocument.__v;
        returnedDocument.id = returnedDocument._id;
        delete returnedDocument._id;
    }
});

const propuestaModel = mongoose.model("propuesta", propuestasSchema);
module.exports = propuestaModel;
