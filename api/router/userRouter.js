const userRouter = require("express").Router();
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

userRouter.get("/all", async (req, res) => {
    try {

        await mongoose.connect(process.env.DB_NAME);
    } catch (error) {

        res.status(400).send({ error });
    }

    try {

        const users = await userModel.find({});
        await mongoose.disconnect();
        res.status(200).json(users);
    } catch (error) {

        res.status(400).send({ error });
    }


});

/*userRouter.get("/:id", (req, res) => {
    mongoose.connect(process.env.DB_NAME)
        .then(() => {
            userModel.findById(req.params.id).then(user => {
                console.log(req.params.id);
                mongoose.disconnect().then(() => res.status(302).json(user));

            }).catch((err) => res.status(404).send({ error: err.message }));
        }

        )
        .catch(err => { res.status(400).send({ error: err.message }); });


});*/

userRouter.get("/my", (req, res) => { //eslint-disable-line
    // TODO la idea de esta ruta es que devuelva tus propios datos, no se si tiene sentido, quiza tenga mas sentido ser una url del front

});

module.exports = userRouter;