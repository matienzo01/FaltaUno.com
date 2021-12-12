const http = require("http");
const url = require("url");
const fs = require("fs");
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");
const myDb = "faltaUno";

const server = http.createServer(function (req, res) {
	let body = "";

	res.setHeader("Access-Control-Allow-Origin", "*");

	req.on("data", (chunk) => {
		body += chunk;
	});

	req.on("end", () => {
		let parsedUrl = new url.URL(req.url, "http://localhost:8080");
		let search = parsedUrl.searchParams;
		console.log(parsedUrl);
		if (parsedUrl.pathname === "/") {
			inicializa().then((respuesta) => {
				res.end(respuesta);
			});
		} else if (parsedUrl.pathname.slice(0, 8) === "/filter") {
			filtrar(search).then((respuesta) => {
				res.end(respuesta);
			});
		} else if (parsedUrl.pathname.slice(0, 6) === "/login") {
			iniciaSesion(JSON.parse(body)).then((respuesta) => {
				if (respuesta === null) res.statusCode = 406;
				else res.statusCode = 200;
				res.end();
			});
		}
	});
});

server.listen(8080, () => {
	console.log("Conectado satisfactoriamente");
});

async function inicializa() {
	await client.connect();
	const db = client.db(myDb);
	const collection = db.collection("propuestas");
	let documentos = await collection.find({}).toArray();
	let respuesta = JSON.stringify(documentos);
	await client.close();
	return respuesta;
}

async function filtrar(params) {
	await client.connect();
	const db = client.db(myDb);
	const collection = db.collection("propuestas");
	const tipo = params.get("tipo");
	let busqueda = {};
	if (tipo === "posicionInput") {
		busqueda.puesto = params.get("filtro");
	} else busqueda.lugar = params.get("filtro");
	let documentos = await collection.find(busqueda).toArray();
	console.log(documentos);
	await client.close();
	return JSON.stringify(documentos);
}

async function iniciaSesion(body) {
	let usuario = body.identificador;
	await client.connect();
	const db = client.db(myDb);
	const collection = db.collection("usuarios");
	let document = await collection.findOne({ usuario: usuario });
	console.log(document);
	console.log(usuario);
	if (document === null) {
		return null;
	} else {
		console.log(document.contrasenia);
		if (document.contrasenia !== body.contrasenia) return null;
	}
}
