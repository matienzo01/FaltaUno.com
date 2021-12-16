const http = require("http");
const url = require("url");
const fs = require("fs");
const cookie = require("cookie");

const userModel = require("./models/userModel");
const propuestaModel = require("./models/propuestaModel");

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
				propuestaModel.filtrar(search).then((respuesta) => {
					res.end(respuesta);
				});
			} else if (servicio.slice(0, 6) === "login") {
				userModel
					.iniciaSesion(JSON.parse(body))
					.then((respuesta) => {
						let galleta = cookie.serialize("jwt", respuesta, {
							httpOnly: true,
							path: "/",
						});
						res.writeHead(200, {
							"Set-Cookie": galleta,
						});
					})
					.catch((err) => {
						res.statusCode = 406;
					});
				res.end();
			} else if (servicio.slice(0, 14) === "crearPropuesta") {
				propuestaModel.crearPropuesta(JSON.parse(body)).then(res.end());
			} else if (servicio.slice(0, 8) === "register") {
				userModel.registraUsuario(JSON.parse(body)).then(res.end());
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
