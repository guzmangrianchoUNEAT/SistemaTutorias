const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
	date: { type: Date, required: true }, // Cambiado a tipo Date
	time: { type: String, required: true },
	location: { type: String, required: true }, // Nueva propiedad para la ubicación
	name: { type: String, required: true }, // Nueva propiedad para el nombre de la persona
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Referencia al usuario
});

module.exports = mongoose.model("Reservation", reservationSchema);
