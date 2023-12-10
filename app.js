const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");

const auth = require("./routes/auth");
const product = require("./routes/product");
const app = express();
const { mongoose } = require("./model/connection");
const { verify } = require("./middleware/auth");
mongoose();

const public = path.join(process.cwd(), "public");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static(public));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/auth", auth);
app.use("/product",verify, product);

app.listen(3000);
