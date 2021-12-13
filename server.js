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
		//console.log(parsedUrl);

		let particiones = parsedUrl.pathname.split("/");
		const tipo = particiones[1];
		const servicio = particiones[2];
		if (tipo === "api") {
			if (servicio.slice(0, 6) === "filter") {
				filtrar(search).then((respuesta) => {
					res.end(respuesta);
				});
			} else if (servicio.slice(0, 6) === "login") {
				iniciaSesion(JSON.parse(body)).then((respuesta) => {
					if (respuesta === null) res.statusCode = 406;
					else res.statusCode = 200;
					res.end();
				});
			}
		} else {
			if (tipo === "") {
				let html = fs.readFileSync("./principal/principal.html");
				res.writeHead(200, {
					"Content-Type": "text/html",
					"Content-Length": html.length,
				});
				res.write(html);
				res.end();
			} else if (tipo === "principal.css") {
				let css = fs.readFileSync("./principal/principal.css");
				res.writeHead(200, { "Content-Type": "text/css" });
				res.write(css);
				res.end();
			} else if (tipo === "index.js") {
				let js = fs.readFileSync("./index.js");
				res.writeHead(200, {
					"Content-Type": "application/javascript",
				});
				res.write(js);
				res.end();
			} else if (tipo === "login") {
				let html = fs.readFileSync("./login/login.html");
				res.writeHead(200, {
					"Content-Type": "text/html",
					"Content-Length": html.length,
				});
				res.write(html);
				res.end();
			}
		}
	});
});

server.listen(8080, () => {
	console.log("Conectado satisfactoriamente");
});

async function filtrar(params) {
	await client.connect();
	const db = client.db(myDb);
	const collection = db.collection("propuestas");
	let busqueda = {};
	if (!params.keys().next().done) {
		//! Es la unica forma que encontre de chequear que este vacio
		const tipo = params.get("tipo");
		if (tipo === "posicionInput") busqueda.puesto = params.get("filtro");
		else busqueda.lugar = params.get("filtro");
	}
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
	if (document === null) {
		return null;
	} else {
		if (document.contrasenia !== body.contrasenia) return null;
	}
}
