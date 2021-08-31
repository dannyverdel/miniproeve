const express = require("express");
const app = express();
const mongoose = require('mongoose');
require("dotenv/config");

app.use(express.json());

// ROUTE IMPORTS
const dish_router = require("./routes/dishes_router");

// ROUTE MIDDLEWARES
app.use("/api/dishes", dish_router);

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
