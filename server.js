const http = require("http");
const url = require("url");
const fs = require("fs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const myDb = "mongodb://localhost:27017/faltaUno";
const { userModel } = require("./models/userModel");
const { propuestaModel } = require("./models/propuestaModel");

const server = http.createServer(function (req, res) {
	let body = "";

	res.setHeader("Access-Control-Allow-Origin", "localhost:8080");
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader("Access-Control-Expose-Headers", "Set-Cookie");

	req.on("data", (chunk) => {
		body += chunk;
	});

	req.on("end", () => {
		let parsedUrl = new url.URL(req.url, "http://localhost:8080");
		let search = parsedUrl.searchParams;
		//console.log(parsedUrl);
		//console.log(body);
		let particiones = parsedUrl.pathname.split("/");
		let tipo = particiones[1];
		const servicio = particiones[2];
		if (tipo === "api") {
			if (servicio.slice(0, 6) === "filter") {
				filtrar(search).then((respuesta) => {
					res.end(respuesta);
				});
			} else if (servicio.slice(0, 6) === "login") {
				iniciaSesion(JSON.parse(body))
					.then((respuesta) => {
						let galleta = cookie.serialize("jwt", respuesta, {
							httpOnly: true,
							path: "/",
						});
						res.writeHead(200, {
							"Set-Cookie": galleta,
						});
						res.end();
					})
					.catch((err) => {
						res.statusCode = 406;
						res.end();
					});
			} else if (servicio.slice(0, 14) === "crearPropuesta") {
				crearPropuesta(JSON.parse(body)).then(res.end());
			} else if (servicio.slice(0, 8) === "register") {
				registraUsuario(JSON.parse(body)).then(res.end());
			}
		} else {
			let extensiones = tipo.split(".");
			if (extensiones[1] !== undefined) {
				if (extensiones[1] === "css")
					res.writeHead(200, { "Content-Type": "text/css" });
				else if (extensiones[1] === "js")
					res.writeHead(200, {
						"Content-Type": "application/javascript",
					});
			} else {
				res.writeHead(200, { "Content-Type": "text/html" });
				if (tipo !== "") tipo += ".html";
			}

			let archivo;
			if (tipo === "")
				archivo = fs.readFileSync("./principal/principal.html");
			else archivo = fs.readFileSync(`./${extensiones[0]}/${tipo}`);

			res.write(archivo);
			res.end();
		}
	});
});

server.listen(8080, () => {
	console.log("Conectado satisfactoriamente");
});

async function filtrar(params) {
	await mongoose.connect(myDb);
	let busqueda = {};
	if (!params.keys().next().done) {
		//! Es la unica forma que encontre de chequear que no este vacio
		const tipo = params.get("tipo");
		if (tipo === "posicionInput") busqueda.puesto = params.get("filtro");
		else busqueda.lugar = params.get("filtro");
	}
	let documentos = await propuestaModel.find(busqueda);
	await mongoose.disconnect();
	return JSON.stringify(documentos);
}

async function registraUsuario(params) {
	let salt = await bcrypt.genSalt(10);
	console.log(params);
	params.contrasenia = await bcrypt.hash(params.contrasenia, salt);
	await mongoose.connect(myDb);
	await userModel.create(params);
	await mongoose.disconnect();
}

async function iniciaSesion(body) {
	//TODO implementar autentificacion
	await mongoose.connect(myDb);
	let usuario = body.identificador;
	let document = await userModel
		.findOne({})
		.where("identificador")
		.equals(usuario);
	//console.log(document.contrasenia, "    ", body.contrasenia);
	await mongoose.disconnect();
	if (document === null) throw Error("Identificador no coincidente");
	else if (!(await bcrypt.compare(body.contrasenia, document.contrasenia)))
		throw Error("Contraseña incorrecta");
	else {
		console.log("llegue al final");
		let id = document._id;
		let token = await jwt.sign({ id }, "estoy probando");
		return token;
	}
}

async function crearPropuesta(params) {
	await mongoose.connect(myDb);
	await propuestaModel.create(params);
	await mongoose.disconnect();
}
