const propuestaModel = require("../models/propuestaModel");
const userModel = require("../models/userModel");
const cookie = require("cookie");
const url = require("url");

class apiRouter {
	static route = (req, res, body) => {
		let parsedUrl = new url.URL(req.url, "http://localhost:8080");
		let search = URLsearchToObj(parsedUrl.searchParams);
		//console.log(body);
		//console.log(search);
		let particiones = parsedUrl.pathname.split("/");

		let tipo = particiones[1];
		const servicio = particiones[2];

		let query = parsedUrl.search.split("?")[1];
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
	};
}

function URLsearchToObj(URL) {
	let params = "{";
	URL.forEach((value, key) => {
		params += ` "${key}": "${value}",`;
	});
	if (params !== "{") params = params.substring(0, params.length - 1);
	params += "}";
	return JSON.parse(params);
}

module.exports = apiRouter;
