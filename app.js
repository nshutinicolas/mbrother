const express = require("express");
const app = express();
const routes = require("./api/routes/routes");
const cors = require("cors");
const PORT = process.env.PORT || 2000;
app.use(express.json());
app.use(cors());
require("dotenv").config();

// API ROUTES
app.use("/api/v1/", routes);

app.listen(PORT, () => console.log("port up..."));

