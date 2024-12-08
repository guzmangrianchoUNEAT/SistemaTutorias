const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db"); // Importar la conexión a MongoDB

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Importar Rutas
const authRoutes = require("./routes/auth");
const reservationRoutes = require("./routes/reservations");

// Usar Rutas
app.use("/auth", authRoutes);
app.use("/reservations", reservationRoutes);

// Conectar a MongoDB
connectDB();

// Iniciar Servidor
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
