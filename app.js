require("dotenv").config();
const movieRoutes = require("./routes/models/modelsRoutes");
const db = require ("./db/index");
const express = require("express");
const app = new express();
const port = process.env.PORT || 8080;
db();
app.use(express.json());
app.use("/model", modelRoutes); 
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});