import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "./api";

// Obtener reservas del usuario autenticado
export async function getReservationsByUser() {
	try {
		const token = await AsyncStorage.getItem("token");
		if (!token) throw new Error("Token no encontrado");

		const response = await fetch(`${API_BASE_URL}/reservations`, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});

		if (response.ok) {
			const reservations = await response.json();
			return { success: true, reservations };
		} else if (response.status === 401 || response.status === 403) {
			return {
				success: false,
				error: "Sesión no autorizada. Por favor, inicia sesión nuevamente.",
			};
		} else {
			return { success: false, error: "Error al obtener reservas" };
		}
	} catch (error) {
		console.error("Error al obtener reservas:", error);
		return { success: false, error: error.message };
	}
}

// Crear una nueva reserva
export async function createReservation(date, time, location, name) {
	try {
		const token = await AsyncStorage.getItem("token");
		if (!token) throw new Error("Token no encontrado");

		const response = await fetch(`${API_BASE_URL}/reservations`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ date, time, location, name }),
		});

		if (response.ok) {
			return { success: true, message: "Reserva creada con éxito" };
		} else if (response.status === 401 || response.status === 403) {
			return {
				success: false,
				error: "Sesión no autorizada. Por favor, inicia sesión nuevamente.",
			};
		} else {
			const error = await response.json();
			console.error("Error del servidor:", error);
			return {
				success: false,
				error: error.message || "Error al crear la reserva",
			};
		}
	} catch (error) {
		console.error("Error al crear reserva:", error);
		return { success: false, error: error.message };
	}
}

// Obtener todas las reservas (sin filtrar por usuario)
export async function getAllReservations() {
	try {
		const response = await fetch(`${API_BASE_URL}/reservations/all`, {
			method: "GET",
		});

		if (response.ok) {
			const reservations = await response.json();
			return { success: true, reservations };
		} else {
			return { success: false, error: "Error al obtener todas las reservas" };
		}
	} catch (error) {
		console.error("Error al obtener todas las reservas:", error);
		return { success: false, error: error.message };
	}
}

// Editar una reserva
export async function editReservation(id, date, time, location, name) {
	try {
		const token = await AsyncStorage.getItem("token");
		if (!token) throw new Error("Token no encontrado");

		const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ date, time, location, name }),
		});

		if (response.ok) {
			const updatedReservation = await response.json();
			return { success: true, reservation: updatedReservation.reservation };
		} else if (response.status === 401 || response.status === 403) {
			return {
				success: false,
				error: "Sesión no autorizada. Por favor, inicia sesión nuevamente.",
			};
		} else {
			const error = await response.json();
			console.error("Error del servidor:", error);
			return {
				success: false,
				error: error.message || "Error al editar la reserva",
			};
		}
	} catch (error) {
		console.error("Error al editar reserva:", error);
		return { success: false, error: error.message };
	}
}

// Eliminar una reserva
export async function deleteReservation(id) {
	try {
		const token = await AsyncStorage.getItem("token");
		if (!token) throw new Error("Token no encontrado");

		const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.ok) {
			return { success: true, message: "Reserva eliminada con éxito" };
		} else if (response.status === 401 || response.status === 403) {
			return {
				success: false,
				error: "Sesión no autorizada. Por favor, inicia sesión nuevamente.",
			};
		} else {
			const error = await response.json();
			console.error("Error del servidor:", error);
			return {
				success: false,
				error: error.message || "Error al eliminar la reserva",
			};
		}
	} catch (error) {
		console.error("Error al eliminar reserva:", error);
		return { success: false, error: error.message };
	}
}
