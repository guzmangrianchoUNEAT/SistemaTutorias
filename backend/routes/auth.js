const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

// Registro de usuarios
router.post("/register", async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return res
			.status(400)
			.json({ error: "Todos los campos son obligatorios." });
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({ name, email, password: hashedPassword });
		await user.save();
		res.status(201).json({ message: "Usuario registrado" });
	} catch (err) {
		console.error(err);
		if (err.code === 11000 && err.keyPattern?.email) {
			return res.status(409).json({
				error: `El email ${err.keyValue.email} ya está registrado.`,
			});
		}
		res.status(400).json({ error: err.message });
	}
});

// Inicio de sesión
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ error: "Usuario no encontrado" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ error: "Contraseña incorrecta" });
		}

		// Generamos el token con el id del usuario
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h", // El token expirará en 1 hora
		});

		res.json({
			token,
			user: {
				name: user.name,
				email: user.email,
			},
		});
	} catch (err) {
		console.error("Error en el inicio de sesión:", err.message);
		res.status(500).json({ error: "Error interno del servidor" });
	}
});

// Cerrar sesión
router.post("/logout", (req, res) => {
	try {
		// Invalida el token del lado del cliente eliminándolo o ignorándolo.
		res.status(200).json({ message: "Sesión cerrada con éxito." });
	} catch (err) {
		console.error("Error al cerrar sesión:", err.message);
		res.status(500).json({ error: "Error al cerrar la sesión." });
	}
});

module.exports = router;
