const propousRouter = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const propuestaModel = require("../models/propuestaModel");

propousRouter.get("/", async (req, res) => {
    try {
        const propuestas = await propuestaModel.find({});
        res.status(200).json(propuestas);
    } catch (error) {
        res.status(404).json(error);
    }

});

propousRouter.get("/:id", async (req, res) => {
    //console.log(req.params.id);
    const propuestas = await propuestaModel.findById(req.params.id); //TODO agregar posibilidad de fallo
    res.status(200).json(propuestas);
});

propousRouter.post("/", authMiddleware, async (req, res) => {
    const { body } = req;

    const propousCreated = await propuestaModel.create(body);
    res.status(201).json(propousCreated);
});

propousRouter.delete("/:id", authMiddleware, async (req, res) => {
    await propuestaModel.findByIdAndDelete(req.params.id);
    res.status(200).json({});
});

module.exports = propousRouter;