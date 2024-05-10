//* Routes Import
const authRoutes = require("./routes/authRoute.js");
const productRoutes = require("./routes/productsRoute.js");
const categoriesRoutes = require("./routes/categoryRoute.js");

const colors = require("colors");
require("dotenv/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

//* Middleware to parse JSON
app.use(express.json());
app.use(cors());

const api = process.env.API_URL;

//* Routes
app.use(`${api}/auth`, authRoutes);
app.use(`${api}/products`, productRoutes);
app.use(`${api}/category`, categoriesRoutes);
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log(`Database Connection is Established....`.bgMagenta);
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Database connection error:", err));
