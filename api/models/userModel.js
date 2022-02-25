const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    identificador: { type: String, required: true },
    contrasenia: { type: String, required: true },
    propuestas: { type: [mongoose.Schema.Types.ObjectId], required: false }
});

userSchema.set("toJSON", {
    transform: (document, returnedDocument) => {
        returnedDocument.id = returnedDocument._id;
        delete returnedDocument._id;
        delete returnedDocument.__v;
        delete returnedDocument.contrasenia;
    }
});

const userModel = mongoose.model("usuario", userSchema);

module.exports = userModel;
