const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true }, // Campo para el nombre del usuario
		email: { type: String, required: true, unique: true }, // Campo obligatorio y único
		password: { type: String, required: true }, // Contraseña obligatoria
	},
	{ timestamps: true }
); // Agrega automáticamente createdAt y updatedAt

module.exports = mongoose.model("User", userSchema);
