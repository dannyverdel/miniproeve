const express = require("express");
const app = express();
require("dotenv/config");

app.use(express.json());

// ROUTE IMPORTS
const menu_router = require("./routes/menu");

// ROUTE MIDDLEWARES
app.use("/api/menu", menu_router);

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
