const express = require("express");
const connectDb = require("./config/connect_db");
const dotenv = require("dotenv");
const initRouters = require("./routers");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
/// connect db

connectDb();

initRouters(app);

app.listen(process.env.PORT);
