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
		let search = URLsearchToObj(parsedUrl.searchParams);
		//console.log(body);
		//console.log(search);
		let particiones = parsedUrl.pathname.split("/");

		let tipo = particiones[1];
		const servicio = particiones[2];

		let query = parsedUrl.search.split("?")[1];

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
						res.end();
					})
					.catch((err) => {
						console.log(err.message);
						res.statusCode = 406;
						res.end();
					});
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
				archivo = fs.readFile(
					`./${extensiones[0]}/${tipo}`,
					(err, respuesta) => {
						res.end(respuesta);
					}
				);
			} else {
				let pagina = extensiones[0];
				if (query === undefined) {
					res.writeHead(200, { "Content-Type": "text/html" });
					if (pagina === "")
						fs.readFile(
							"./principal/principal.html",
							(err, respuesta) => {
								res.end(respuesta);
							}
						);
					else
						fs.readFile(
							`./${extensiones[0]}/${pagina}.html`,
							(err, respuesta) => {
								res.end(respuesta);
							}
						);
				} else {
					/*propuestaModel
						.muestraPropuesta(search)
						.then((respuesta) => {
							console.log(typeof respuesta);
							res.writeHead(200, { "Content-Type": "text/html" });
							res.write(respuesta);
							res.end();
						});*/
					fs.readFile("./propuesta/propuesta.html", (err, data) => {
						res.end(data);
					});
				}
			}
		}
	});
});

server.listen(8080, () => {
	console.log("Conectado satisfactoriamente");
});

function URLsearchToObj(URL) {
	let params = "{";
	URL.forEach((value, key) => {
		params += ` "${key}": "${value}",`;
	});
	if (params !== "{") params = params.substring(0, params.length - 1);
	params += "}";
	return JSON.parse(params);
}
