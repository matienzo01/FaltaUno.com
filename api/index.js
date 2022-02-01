const http = require("http");
const url = require("url");
const fs = require("fs");
const express = require('express');
const app = express();

const cookie = require("cookie");
/*const apiRouter = require("./api/apiRouter");
const publicRouter = require("./public/publicRouter");



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
		let particiones = parsedUrl.pathname.split("/");
		let tipo = particiones[1];
		if (tipo === "api") {
			apiRouter.route(req, res, body);
		} else {
			publicRouter.route(req, res);
		}
	});
});*/

app.listen(8080, () => {
	console.log("Conectado al nuevo server");
})