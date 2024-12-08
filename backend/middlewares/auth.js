const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1]; // Extrae el token del encabezado Authorization

	if (!token) {
		console.error("Token no proporcionado");
		return res.status(401).json({ error: "Acceso no autorizado" });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			console.error("Error al verificar el token:", err.message);
			return res.status(403).json({ error: "Token inválido" });
		}

		req.user = user; // Adjunta los datos del token decodificado a req.user
		console.log("Usuario autenticado:", user); // Log para verificar el contenido de req.user
		next();
	});
}

module.exports = authenticateToken;
