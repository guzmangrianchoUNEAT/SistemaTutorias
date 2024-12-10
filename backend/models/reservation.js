const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
	date: { type: Date, required: true },
	time: { type: String, required: true },
	location: { type: String, required: true },
	name: { type: String, required: true },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Reservation", reservationSchema);
