const express = require("express");
const app = express();
//const cookie = require("cookie");
const userRouter = require("./router/userRouter");

app.use(express.json());
app.use("/api/users", userRouter);

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

module.exports = app;