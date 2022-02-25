const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookie = require("cookie-parser");

const app = express();

const propousRouter = require("./router/propouseRouter");
const userRouter = require("./router/userRouter");
const loginRouter = require("./router/loginRouter");

app.use(express.json());
app.use(cors());
app.use(cookie());
app.use("/api/users", userRouter);
app.use("/api/propuestas", propousRouter);
app.use("/api/login", loginRouter);
mongoose.connect(process.env.DB_NAME);

module.exports = app;