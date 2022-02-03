const userRouter = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userModel = require("../models/userModel");

userRouter.get("/all", async (req, res) => {
    try {
        await mongoose.connect(process.env.DB_NAME);
    } catch (error) {
        res.status(500).send({ error });
    }

    try {
        const users = await userModel.find({});
        await mongoose.disconnect();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).send({ error });
    }


});

userRouter.get("/:id", (req, res) => {
    mongoose.connect(process.env.DB_NAME)
        .then(() => {
            userModel.findById(req.params.id).then(user => {
                mongoose.disconnect().then(() => res.status(302).json(user));

            }).catch((err) => res.status(404).send({ error: err.message }));
        })
        .catch(err => { res.status(500).send({ error: err.message }); });
});

userRouter.get("/my", (req, res) => { //eslint-disable-line
    // TODO la idea de esta ruta es que devuelva tus propios datos, no se si tiene sentido, quiza tenga mas sentido ser una url del front
});

userRouter.post("/", async (req, res) => {
    const { body } = req;

    try {
        await mongoose.connect(process.env.DB_NAME);
        const userToAdd = {
            identificador: body.identificador,
            contrasenia: await bcrypt.hash(body.contrasenia, 10)
        };
        const user = await userModel.create(userToAdd);
        console.log(user);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = userRouter;