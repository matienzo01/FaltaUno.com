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

        expect(DBAfter).toHaveLength(DBBefore.length);
        expect(usersAvaliable).toHaveLength(usersInciales.length);
    });

    test("GET en ruta con :id deberia devolver el usuario con dicho id", async () => {
        const userParaId = await userModel.findOne({ identificador: "Matienzo" });
        const response = await api.get(baseURL + "/" + userParaId.id);
        
        const usuarioEncontrado = response.body;

        expect(usuarioEncontrado).toHaveProperty("identificador", "Matienzo");
    });

    test("POST en ruta / debe agregar un usuario", async () => {
        const newUser = { identificador: "Usuario nuevo", contrasenia: "Hola que tal" };

        const response = await api.post(baseURL).send(newUser).expect(201);
        const userCreated = response.body;

        const userInDB = await userModel.findOne({ identificador: "Usuario nuevo" });

        expect(userCreated).toHaveProperty("identificador", "Usuario nuevo");
        expect(userCreated).not.toHaveProperty("contrasenia");
        expect(userInDB).toHaveProperty("contrasenia");
    });

    test("DELETE /:id deberia eliminar el usuario con dicho id ", async () => {
        const userParaId = await userModel.findOne({ identificador: "Matienzo" });
        const {body} = await api.delete(baseURL + "/" + userParaId.id).expect(200);

        const DBAfter = await userModel.find({});
        const userDeleted = await userModel.findOne({identificador: "Matienzo"});

        expect(DBAfter).toHaveLength(usersInciales.length - 1);
        expect(userDeleted).toBeNull();
        expect(body).toHaveProperty("identificador", "Matienzo");
    });

    afterAll(async () => {
        try {
            await mongoose.connection.close();
        } catch (error) {
            console.log("El problema es cerrar");
        }
    });
});


/*describe("Test no exitosos relacionados al router de usuarios", () => {

});*/