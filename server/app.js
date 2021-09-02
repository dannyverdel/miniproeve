const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(express.json());
app.use(cors());

// ROUTE IMPORTS
const dish_router = require("./routes/dishes_router");
const questions_router = require("./routes/questions_router");

// ROUTE MIDDLEWARES
app.use("/api/dishes", dish_router);
app.use("/api/questions", questions_router);

// CONNECT TO DB
const mongoUri = process.env.DB_CONNECTION;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
