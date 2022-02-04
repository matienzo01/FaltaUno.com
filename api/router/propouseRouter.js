const propousRouter = require("express").Router();
const propuestaModel = require("../models/propuestaModel");
const mongoose = require("mongoose");

propousRouter.get("/", async (req, res) => {
    await mongoose.connect(process.env.DB_NAME);
    const propuestas = await propuestaModel.find({});
    res.status(200).json(propuestas);
});

module.exports = propousRouter;