import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	FlatList,
	ImageBackground,
	TouchableOpacity,
	Modal,
	Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	getReservationsByUser,
	createReservation,
} from "../services/reservations";

import styles from "../styles/HomeStyles";
import Header from "../components/Header";
import ReservationItem from "../components/ReservationItem"; // Importa el nuevo componente

export default function HomeScreen() {
	const [reservations, setReservations] = useState<any[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedTime, setSelectedTime] = useState("");
	const [selectedSala, setSelectedSala] = useState("");
	const [loading, setLoading] = useState(false);

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

	const [dateOptions, setDateOptions] = useState<
		{ label: string; value: string }[]
	>([]);

	useEffect(() => {
		// Genera las opciones de fechas al montar el componente
		const options = Array.from({ length: 30 }, (_, i) => {
			const date = new Date();
			date.setDate(date.getDate() + i);
			return {
				label: date.toLocaleDateString("es-ES", {
					weekday: "long",
					day: "numeric",
					month: "long",
					year: "numeric",
				}),
				value: date.toISOString(),
			};
		});
		setDateOptions(options);
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
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<ReservationItem
								name={item.name}
								location={item.location}
								date={formatDate(item.date)}
								time={item.time}
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

				<Modal
					visible={modalVisible}
					animationType="slide"
					transparent={true}
					onRequestClose={() => setModalVisible(false)}
				>
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<Text style={styles.modalTitle}>Crear Nueva Reserva</Text>

							<Text style={styles.modalLabel}>Fecha:</Text>
							<Picker
								selectedValue={selectedDate}
								onValueChange={(itemValue: string) =>
									setSelectedDate(itemValue)
								}
								style={styles.picker}
								itemStyle={styles.pickerItem}
							>
								<Picker.Item label="Selecciona una fecha" value="" />
								{dateOptions.map((option, index) => (
									<Picker.Item
										key={index}
										label={option.label}
										value={option.value}
									/>
								))}
							</Picker>
							<Text style={styles.modalLabel}>Hora:</Text>
							<Picker
								selectedValue={selectedTime}
								onValueChange={(itemValue: string) =>
									setSelectedTime(itemValue)
								}
								style={styles.picker}
							>
								<Picker.Item label="Selecciona una hora" value="" />
								{Array.from({ length: 9 * 4 }, (_, i) => {
									const hour = Math.floor((9 * 60 + i * 15) / 60); // Calcula la hora
									const minutes = (9 * 60 + i * 15) % 60; // Calcula los minutos
									const formattedTime = `${hour}:${minutes === 0 ? "00" : minutes}`;
									return (
										<Picker.Item
											key={i}
											label={formattedTime}
											value={formattedTime}
										/>
									);
								})}
							</Picker>

							<Text style={styles.modalLabel}>Sala:</Text>
							<Picker
								selectedValue={selectedSala}
								onValueChange={(itemValue: string) =>
									setSelectedSala(itemValue)
								}
								style={styles.picker}
							>
								<Picker.Item label="Selecciona una sala" value="" />
								{salas.map((sala, index) => (
									<Picker.Item key={index} label={sala} value={sala} />
								))}
							</Picker>

							<View style={styles.modalButtons}>
								<TouchableOpacity
									style={styles.cancelButton}
									onPress={() => setModalVisible(false)}
								>
									<Text style={styles.buttonText}>Cancelar</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.confirmButton}
									onPress={handleCreateReservation}
								>
									<Text style={styles.buttonText}>Confirmar</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		</ImageBackground>
	);
}
