import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Modal,
	FlatList,
	TextInput,
	ScrollView,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import Header from "../components/Header";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MainTabParamList } from "../navigation/MainTabs";
import { Calendar } from "react-native-calendars";
import { getAllReservations } from "../services/reservations";
import ReservationItem from "../components/ReservationItem";

import styles from "../styles/ReservationsStyles";

interface Reservation {
	id: string;
	date: string;
	time: string;
	location: string;
	name: string;
}

type ReservationScreenProps = BottomTabScreenProps<
	MainTabParamList,
	"Reservations"
>;

export default function ReservationScreen({
	navigation,
}: ReservationScreenProps) {
	const [selectedDate, setSelectedDate] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [reservations, setReservations] = useState<Reservation[]>([]);

	useEffect(() => {
		const fetchReservations = async () => {
			const result = await getAllReservations();
			if (result.success) {
				const formattedReservations = result.reservations.map(
					(reservation: Reservation) => {
						const date = new Date(reservation.date);
						const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
						return {
							...reservation,
							date: formattedDate,
						};
					}
				);
				setReservations(formattedReservations);
			} else {
				console.error(result.error);
			}
		};
		fetchReservations();
	}, []);

	const markedDates: {
		[key: string]: {
			marked?: boolean;
			dotColor?: string;
			selected?: boolean;
			selectedColor?: string;
		};
	} = reservations.reduce(
		(acc, curr) => {
			acc[curr.date] = {
				marked: true,
				dotColor: "#FFFFFF",
				selected: selectedDate === curr.date,
				selectedColor: selectedDate === curr.date ? "#007BFF" : "#555555",
			};
			return acc;
		},
		{} as {
			[key: string]: {
				marked?: boolean;
				dotColor?: string;
				selected?: boolean;
				selectedColor?: string;
			};
		}
	);

	const filteredReservations = reservations.filter(
		(item) =>
			item.date === selectedDate ||
			item.time.toLowerCase().includes(searchText.toLowerCase()) ||
			item.location.toLowerCase().includes(searchText.toLowerCase()) ||
			item.name.toLowerCase().includes(searchText.toLowerCase())
	);

	const handleDayPress = (day: { dateString: string }) => {
		setSelectedDate(day.dateString);
		setModalVisible(true);
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
				<Text style={styles.title}>Calendario de Reservas</Text>
				<Calendar
					onDayPress={handleDayPress}
					markedDates={markedDates}
					theme={{
						calendarBackground: "transparent",
						dayTextColor: "#FFFFFF",
						monthTextColor: "#FFFFFF",
						textDisabledColor: "#555",
						todayTextColor: "#007BFF",
						arrowColor: "#FFFFFF",
					}}
				/>

				{/* Lista de todas las reservas con búsqueda */}
				<Text style={styles.subtitle}>Todas las Reservas</Text>
				<TextInput
					style={styles.input}
					placeholder="Buscar por nombre, hora o lugar"
					placeholderTextColor="#888"
					value={searchText}
					onChangeText={setSearchText}
				/>
				<ScrollView style={styles.scrollView}>
					{filteredReservations.map((item) => (
						<ReservationItem
							key={item.id}
							name={item.name}
							location={item.location}
							date={item.date}
							time={item.time}
						/>
					))}
					{filteredReservations.length === 0 && (
						<Text style={styles.emptyText}>No se encontraron reservas.</Text>
					)}
				</ScrollView>

				{/* Modal para mostrar las reservas del día seleccionado */}
				<Modal
					visible={modalVisible}
					animationType="slide"
					transparent={true}
					onRequestClose={() => setModalVisible(false)}
				>
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<Text style={styles.modalTitle}>Reservas del {selectedDate}</Text>
							<FlatList
								data={reservations.filter((item) => item.date === selectedDate)}
								keyExtractor={(item) => item.id}
								renderItem={({ item }) => (
									<ReservationItem
										name={item.name}
										location={item.location}
										date={item.date}
										time={item.time}
									/>
								)}
								ListEmptyComponent={
									<Text style={styles.emptyText}>
										No hay reservas para este día.
									</Text>
								}
							/>
							<TouchableOpacity
								style={styles.closeButton}
								onPress={() => setModalVisible(false)}
							>
								<Text style={styles.closeButtonText}>Cerrar</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</View>
		</ImageBackground>
	);
}
