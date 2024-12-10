import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "./api";

// Login
export async function login(email, password) {
	try {
		const response = await fetch(`${API_BASE_URL}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		if (response.ok) {
			const { token, user } = await response.json();
			await AsyncStorage.setItem("token", token); // Guarda el token en AsyncStorage
			await AsyncStorage.setItem("userName", user.name); // Guarda el nombre del usuario en AsyncStorage
			await AsyncStorage.setItem("userEmail", user.email); // Guarda el correo en AsyncStorage

			return { success: true, token, user };
		} else {
			const errorData = await response.json();
			return {
				success: false,
				error: errorData.error || "Error al iniciar sesión",
			};
		}
	} catch (error) {
		console.error("Error al iniciar sesión:", error);
		return { success: false, error: "Error al conectar con el servidor" };
	}
}

// Registro
export async function register(name, email, password) {
	try {
		const response = await fetch(`${API_BASE_URL}/auth/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password }),
		});

		if (response.ok) {
			return { success: true };
		} else {
			const errorData = await response.json();
			return {
				success: false,
				error: errorData.error || "Error al registrarse",
			};
		}
	} catch (error) {
		console.error("Error al registrarse:", error);
		return { success: false, error: "Error al conectar con el servidor" };
	}
}

// Logout
export async function logout() {
	try {
		await AsyncStorage.removeItem("token"); // Elimina el token almacenado
		return { success: true };
	} catch (error) {
		console.error("Error al cerrar sesión:", error);
		return { success: false, error: "Error al cerrar sesión" };
	}
}
