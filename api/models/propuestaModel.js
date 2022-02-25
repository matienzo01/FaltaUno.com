const mongoose = require("mongoose");
require("dotenv").config();

const propuestasSchema = new mongoose.Schema({
    equipo: { type: String, required: true },
    dia: { type: Date, required: true },
    puesto: { type: String, required: true, enum: ["arquero", "defensor", "volante", "delantero"] },
    lugar: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: false },
    //duenio: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    propuestos: { type: [mongoose.Schema.Types.ObjectId] }
});

propuestasSchema.set("toJSON", {
    transform: (document, returnedDocument) => {
        delete returnedDocument.__v;
        returnedDocument.id = returnedDocument._id;
        delete returnedDocument._id;
        returnedDocument.va;
    }
});

const propuestaModel = mongoose.model("propuesta", propuestasSchema);
module.exports = propuestaModel;
