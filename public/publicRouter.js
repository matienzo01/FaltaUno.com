const url = require("url");
const fs = require("fs");

class publicRouter {
	static route = (req, res) => {
		let parsedUrl = new url.URL(req.url, "http://localhost:8080");
		let search = URLsearchToObj(parsedUrl.searchParams);
		//console.log(body);
		//console.log(search);
		let particiones = parsedUrl.pathname.split("/");

		let tipo = particiones[1];

		let query = parsedUrl.search.split("?")[1];
		let extensiones = tipo.split(".");
		let archivo;
		if (extensiones[1] !== undefined) {
			if (extensiones[1] === "css")
				res.writeHead(200, { "Content-Type": "text/css" });
			else if (extensiones[1] === "js")
				res.writeHead(200, {
					"Content-Type": "application/javascript",
				});
			archivo = fs.readFile(
				`./public/${extensiones[0]}/${tipo}`,
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
						"./public/principal/principal.html",
						(err, respuesta) => {
							res.end(respuesta);
						}
					);
				else
					fs.readFile(
						`./public/${extensiones[0]}/${pagina}.html`,
						(err, respuesta) => {
							res.end(respuesta);
						}
					);
			} else {
				fs.readFile(
					"./public/propuesta/propuesta.html",
					(err, data) => {
						res.end(data);
					}
				);
			}
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

module.exports = publicRouter;
