import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	FlatList,
	ImageBackground,
	TouchableOpacity,
	Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	getReservationsByUser,
	createReservation,
	editReservation,
	deleteReservation,
} from "../services/reservations";
import styles from "../styles/HomeStyles";
import Header from "../components/Header";
import ReservationItem from "../components/ReservationItem";
import CustomDatePickerModal from "../components/CustomDatePickerModal"; // Importar el componente

export default function HomeScreen() {
	interface Reservation {
		_id: string;
		date: string;
		time: string;
		location: string;
		name: string;
	}

	const [reservations, setReservations] = useState<any[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedTime, setSelectedTime] = useState("");
	const [selectedSala, setSelectedSala] = useState("");
	const [loading, setLoading] = useState(false);
	const [editingReservation, setEditingReservation] =
		useState<Reservation | null>(null);

	const salas = ["Sala 1", "Sala 2", "Sala 3", "Sala 4", "Sala 5"];

	useEffect(() => {
		const fetchReservations = async () => {
			setLoading(true);
			const result = await getReservationsByUser();
			if (result.success) {
				setReservations(result.reservations);
			} else {
				Alert.alert("Error", result.error);
			}
			setLoading(false);
		};

		fetchReservations();
	}, []);

	const handleCreateReservation = async () => {
		if (!selectedDate || !selectedTime || !selectedSala) {
			alert("Por favor selecciona todos los campos.");
			return;
		}

		setLoading(true);

		const userName = await AsyncStorage.getItem("userName");
		const result = await createReservation(
			selectedDate,
			selectedTime,
			selectedSala,
			userName
		);

		if (result.success) {
			setReservations((prevReservations) => [
				...prevReservations,
				{
					id: Math.random().toString(),
					date: selectedDate,
					time: selectedTime,
					location: selectedSala,
					name: userName,
				},
			]);
			setModalVisible(false);
			setSelectedDate("");
			setSelectedTime("");
			setSelectedSala("");
		} else {
			Alert.alert("Error", result.error);
		}

		setLoading(false);
	};

	const handleEditReservation = async () => {
		if (
			!selectedDate ||
			!selectedTime ||
			!selectedSala ||
			!editingReservation ||
			!editingReservation._id
		) {
			alert(
				"Por favor selecciona todos los campos o asegúrate de que la reserva esté correctamente seleccionada."
			);
			return;
		}

		setLoading(true);

		const result = await editReservation(
			editingReservation._id,
			selectedDate,
			selectedTime,
			selectedSala
		);

		if (result.success) {
			const updatedReservations = reservations.map((reservation) =>
				reservation._id === editingReservation._id
					? {
							...reservation,
							date: selectedDate,
							time: selectedTime,
							location: selectedSala,
						}
					: reservation
			);
			setReservations(updatedReservations);
			setModalVisible(false);
			setSelectedDate("");
			setSelectedTime("");
			setSelectedSala("");
			setEditingReservation(null);
		} else {
			Alert.alert("Error", result.error);
		}

		setLoading(false);
	};

	const handleDeleteReservation = async (id: string) => {
		const confirmDelete = window.confirm(
			"¿Estás seguro de que deseas eliminar esta reserva?"
		);
		if (confirmDelete) {
			setLoading(true);

			const result = await deleteReservation(id);
			if (result.success) {
				const updatedReservations = reservations.filter(
					(reservation) => reservation._id !== id
				);
				setReservations(updatedReservations);
				Alert.alert("Éxito", "Reserva eliminada con éxito");
			} else {
				Alert.alert("Error", result.error);
			}

			setLoading(false);
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("es-ES", {
			weekday: "long",
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};

	return (
		<ImageBackground
			source={{
				uri: "https://images.unsplash.com/photo-1557683316-973673baf926",
			}}
			style={styles.background}
		>
			<Header />
			<View style={styles.container}>
				<Text style={styles.title}>Mis Reservas</Text>

				{loading ? (
					<Text style={styles.loadingText}>Cargando reservas...</Text>
				) : (
					<FlatList
						data={reservations}
						keyExtractor={(item) => item._id}
						renderItem={({ item }) => (
							<ReservationItem
								name={item.name}
								location={item.location}
								date={formatDate(item.date)}
								time={item.time}
								editable={true}
								onEdit={() => {
									setEditingReservation(item);
									setModalVisible(true);
									setSelectedDate(item.date);
									setSelectedTime(item.time);
									setSelectedSala(item.location);
								}}
								onDelete={() => handleDeleteReservation(item._id)}
							/>
						)}
						ListEmptyComponent={
							<Text style={styles.emptyText}>
								No tienes reservas recientes.
							</Text>
						}
						style={styles.list}
					/>
				)}

				<TouchableOpacity
					style={styles.createButton}
					onPress={() => setModalVisible(true)}
				>
					<Text style={styles.createButtonText}>Crear Reserva</Text>
				</TouchableOpacity>

				{/* Reemplazar el Modal por CustomDatePickerModal */}
				<CustomDatePickerModal
					visible={modalVisible}
					onConfirm={({ date, room }) => {
						setSelectedDate(date.toISOString());
						setSelectedTime(`${date.getHours()}:${date.getMinutes()}`);
						setSelectedSala(room);
						editingReservation
							? handleEditReservation()
							: handleCreateReservation();
					}}
					onCancel={() => setModalVisible(false)}
				/>
			</View>
		</ImageBackground>
	);
}
