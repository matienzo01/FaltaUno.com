const userRouter = require("express").Router();
const bcrypt = require("bcrypt");

const userModel = require("../models/userModel");

userRouter.get("/all", async (req, res) => {
   
    try {
        const users = await userModel.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(400).send({ error });
    }


});

userRouter.get("/:id", (req, res) => {
    
    userModel.findById(req.params.id).then(user => {
        res.status(302).json(user);
    }).catch((err) => res.status(404).send({ error: err.message }));
});

userRouter.get("/my", (req, res) => { //eslint-disable-line
    // TODO la idea de esta ruta es que devuelva tus propios datos, no se si tiene sentido, quiza tenga mas sentido ser una url del front
});

userRouter.post("/", async (req, res) => {
    const { body } = req;

    try {
        const userToAdd = {
            identificador: body.identificador,
            contrasenia: await bcrypt.hash(body.contrasenia, 10)
        };
        const user = await userModel.create(userToAdd);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
});

userRouter.delete("/:id", async(req, res)=>{
    
    const deleted = await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
});

module.exports = userRouter;