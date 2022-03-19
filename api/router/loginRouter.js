const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");


loginRouter.post("/", async (req, res) => {
    const { body } = req;
    console.log(req.headers);
    const user = await userModel.findOne({ identificador: body.identificador });
    if (user === null || !(await bcrypt.compare(body.contrasenia, user.contrasenia))) res.status(404).json({ error: "Usuario o contraseñia incorrecta" });
    else {
        const id = user._id;
        const token = await jwt.sign({ id }, process.env.SECRET);
        res.status(200).send({ token });
    }
});

module.exports = loginRouter;
