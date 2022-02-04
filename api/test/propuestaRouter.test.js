const supertest = require("supertest");
const mongoose = require("mongoose");
const propuestaModel = require("../models/propuestaModel");
const app = require("../app");

const api = supertest(app);

const baseURL = "/api/propuestas";

describe("Test del router de propuestas", () => {

    const dia = new Date().toISOString();
    const propuesta = {
        equipo: "Sacachispas",
        puesto: "Volante",
        lugar: "La bombonera",
        dia,
        descripcion: "Hola que tal",
        precio: 1000
    };
    const propuestasIniciales = [propuesta, {
        equipo: "Bokita",
        puesto: "Delantero",
        lugar: "Otro estadio",
        dia,
        descripcion: "esta es otra propuesta",
        precio: 800
    }];

    beforeAll(async () => {
        await mongoose.connect(process.env.DB_NAME);
        
    });

    beforeEach(async () => {
        await propuestaModel.deleteMany({});
        for(let propuesta of propuestasIniciales)
            await propuestaModel.create(propuesta);
    });

    test("GET de la ruta /all devuelve todas las propuestas", async () => {
        const DBBefore = await propuestaModel.find({});

        const response = await api.get(baseURL).expect(200);
        await mongoose.connect(process.env.DB_NAME);

        expect(response.body).toHaveLength(DBBefore.length);
        expect(response.body).toHaveLength(propuestasIniciales.length);

    });  

    afterAll(async () => {
        await mongoose.disconnect();
    });
});