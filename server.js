const http = require("http");
const url = require("url");
const qs = require("querystring");
const fs = require("fs");

const server = http.createServer(function (req, res) {
	let body = "";

	req.on("data", (chunk) => {
		body += chunk;
	});

	req.on("end", () => {});
});

server.listen(8080, () => {
	console.log("Conectado satisfactoriamente");
});
