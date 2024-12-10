const express = require("express");
const Reservation = require("../models/reservation");
const authenticateToken = require("../middlewares/auth");
const router = express.Router();

// Obtener todas las reservas del usuario autenticado
router.get("/", authenticateToken, async (req, res) => {
	try {
		console.log("Obteniendo reservas para el usuario:", req.user.id);
		const reservations = await Reservation.find({ userId: req.user.id }).sort({
			date: 1,
			time: 1,
		}); // Ordenar por fecha y hora
		res.json(reservations);
	} catch (err) {
		console.error("Error al obtener reservas:", err.message);
		res.status(500).json({ error: "Error al obtener reservas" });
	}
});

// Crear una nueva reserva
router.post("/", authenticateToken, async (req, res) => {
	console.log("Token recibido:", req.headers.authorization);

	const { date, time, location, name } = req.body;

	// Validar los campos requeridos
	if (!date || !time || !location || !name) {
		return res.status(400).json({ error: "Todos los campos son obligatorios" });
	}

	try {
		console.log("Datos recibidos en el backend:", req.body);
		const reservation = new Reservation({
			date: new Date(date),
			time,
			location,
			name,
			userId: req.user.id, // Asociar al usuario autenticado
		});

		await reservation.save();
		res.status(201).json({ message: "Reserva creada con éxito", reservation });
	} catch (err) {
		console.error("Error al crear reserva:", err.message);
		res.status(500).json({ error: "Error al crear la reserva" });
	}
});

// Obtener todas las reservas (sin filtrar por usuario)
router.get("/all", async (req, res) => {
	try {
		console.log("Obteniendo todas las reservas...");
		const reservations = await Reservation.find({}).sort({ date: 1, time: 1 }); // Ordenar por fecha y hora

		res.json(reservations);
	} catch (err) {
		console.error("Error al obtener todas las reservas:", err.message);
		res.status(500).json({ error: "Error al obtener todas las reservas" });
	}
});

// Ruta para eliminar una reserva
router.delete("/:id", authenticateToken, async (req, res) => {
	try {
		console.log("Eliminando reserva con ID:", req.params.id);
		const reservation = await Reservation.findOneAndDelete({
			_id: req.params.id,
			userId: req.user.id, // Asegurarse de que pertenece al usuario autenticado
		});

		if (!reservation) {
			return res.status(404).json({ error: "Reserva no encontrada" });
		}

		res.json({ message: "Reserva eliminada con éxito" });
	} catch (err) {
		console.error("Error al eliminar reserva:", err.message);
		res.status(500).json({ error: "Error al eliminar reserva" });
	}
});

// Editar una reserva
router.put("/:id", authenticateToken, async (req, res) => {
	const { date, time, location } = req.body;

	if (!date || !time || !location) {
		return res.status(400).json({ error: "Todos los campos son obligatorios" });
	}

	try {
		console.log("Editando reserva con ID:", req.params.id);

		// Actualizar la reserva en la base de datos
		const updatedReservation = await Reservation.findOneAndUpdate(
			{ _id: req.params.id, userId: req.user.id }, // Asegurar que la reserva pertenece al usuario autenticado
			{ date: new Date(date), time, location },
			{ new: true } // Devuelve la reserva actualizada
		);

		if (!updatedReservation) {
			return res.status(404).json({ error: "Reserva no encontrada" });
		}

		res.json({
			message: "Reserva actualizada con éxito",
			reservation: updatedReservation,
		});
	} catch (err) {
		console.error("Error al editar reserva:", err.message);
		res.status(500).json({ error: "Error al editar reserva" });
	}
});

module.exports = router;
