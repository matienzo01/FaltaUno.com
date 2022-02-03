const app = require("../app");
const supertest = require("supertest");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

const api = supertest(app);

const baseURL = "/api/users";

describe("Test exitosos relacionados al router de usuarios", () => {

    /*
    La contrasenia para estos usuario es "Hola que tal" en bcrypt con un salto de 10
    */

    const usersInciales = [{
        identificador: "Matienzo",
        contrasenia: "$2b$10$HTVhvBgOCSol1hhRULN8KOpXKAJXfNdzzdjdCQu43vi7RKtXmVd5S"
    }, {
        identificador: "Negrito",
        contrasenia: "$2b$10$HTVhvBgOCSol1hhRULN8KOpXKAJXfNdzzdjdCQu43vi7RKtXmVd5S"
    }
    ];

    beforeAll(async () => {
        try {

            await mongoose.connect(process.env.DB_NAME);
        } catch (err) {
            console.log("El problema es al principo");
        }
    });

    beforeEach(async () => {
        await userModel.deleteMany({});
        for (let usuario of usersInciales)
            await userModel.create(usuario);
    });

    test("GET en ruta /all deberia retornar todos los usuarios", async () => {
        const DBBefore = await userModel.find({});

        const response = await api.get(baseURL + "/all").expect(200);
        const usersAvaliable = response.body;

        const DBAfter = await userModel.find({});
        console.log(DBAfter);

        expect(DBAfter).toHaveLength(DBBefore.length);
        expect(usersAvaliable).toHaveLength(usersInciales.length);
    });

    /*test("GET en ruta con :id deberia devolver el usuario con dicho id", async () => {
        const userParaId = await userModel.findOne({ identificador: "Matienzo" });
        console.log(userParaId);
        const response = await api.get(baseURL + "/" + userParaId.id);
        const usuarioEncontrado = response.body;

        expect(usuarioEncontrado).toHaveProperty("identificador", "Matienzo");
        expect(2).toBe(2);
    });*/

    afterAll(async () => {
        try {

            await mongoose.disconnect();
        } catch (error) {
            console.log("El problema es cerrar");
        }
    });
});


/*describe("Test no exitosos relacionados al router de usuarios", () => {

});*/