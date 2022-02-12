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
    const propuestasIniciales = [{
        equipo: "Bokita",
        puesto: "Delantero",
        lugar: "Otro estadio",
        dia,
        descripcion: "esta es otra propuesta",
        precio: 800
    }];

    beforeEach(async () => {
        await propuestaModel.deleteMany({});
        for(let propuesta of propuestasIniciales)
            await propuestaModel.create(propuesta);
    }, 10000);

    test("GET de la ruta /all devuelve todas las propuestas", async () => {
        const DBBefore = await propuestaModel.find({});

        const response = await api.get(baseURL).expect(200);

        expect(response.body).toHaveLength(DBBefore.length);
        expect(response.body).toHaveLength(propuestasIniciales.length);

    });
    
    test("GET de la ruta /:id devuelve una propuesta en particular", async () => {
        const {id} = await propuestaModel.findOne({ equipo: "Bokita" });
        const response = await api.get(baseURL + "/" + id);
        
        const usuarioEncontrado = response.body;

        expect(usuarioEncontrado).toHaveProperty("equipo", "Bokita");

    });

    test("POST / deberia crear una nueva propuesta", async()=>{
        const {body} = await api.post(baseURL).send(propuesta).expect(201);

        const DBAfter = await propuestaModel.find({});

        expect(DBAfter).toHaveLength(propuestasIniciales.length + 1);
        expect(body).toHaveProperty("id");
    });

    test("DELETE /:id deberia eliminar una propuesta en particular", async()=>{
        const {id} = await propuestaModel.findOne({ equipo: "Bokita" });
        
        await api.delete(baseURL + "/" + id).expect(200);

        const DBAfter = await propuestaModel.find({});

        expect(DBAfter).toHaveLength(propuestasIniciales.length - 1);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });
});