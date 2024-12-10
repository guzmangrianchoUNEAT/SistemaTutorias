import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import Button from "./Button";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de tener esta librería instalada

interface ReservationItemProps {
	name: string;
	location: string;
	date: string;
	time: string;
	editable?: boolean; // Campo para saber si debe mostrar el botón
	onEdit?: () => void; // Callback para la acción de editar
	onDelete?: () => void; // Callback para la acción de eliminar
}

const ReservationItem: React.FC<ReservationItemProps> = ({
	name,
	location,
	date,
	time,
	editable = false,
	onEdit,
	onDelete,
}) => {
	const [modalVisible, setModalVisible] = useState(false);

	const handleEdit = () => {
		setModalVisible(false);
		if (onEdit) onEdit();
	};

	const handleDelete = () => {
		setModalVisible(false);
		if (onDelete) onDelete();
	};

	const handleCancel = () => {
		setModalVisible(false);
	};

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: "row" }}>
				<View style={{ flex: 9 }}>
					<View style={styles.topRow}>
						<Text style={styles.name}>{name}</Text>
						<Text style={styles.location}>{location}</Text>
					</View>
					<View style={styles.bottomRow}>
						<Text style={styles.date}>{date}</Text>
						<Text style={styles.time}>{time}</Text>
					</View>
				</View>
				{editable && (
					<View
						style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
					>
						<TouchableOpacity onPress={() => setModalVisible(true)}>
							<Ionicons name="ellipsis-vertical" size={30} color="#007BFF" />
						</TouchableOpacity>
					</View>
				)}
			</View>

			{/* Modal de opciones */}
			<Modal
				visible={modalVisible}
				animationType="slide"
				transparent={true}
				onRequestClose={handleCancel}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Opciones</Text>

						<TouchableOpacity style={styles.modalButton} onPress={handleEdit}>
							<Text style={styles.modalButtonText}>Editar</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.modalButton} onPress={handleDelete}>
							<Text style={styles.modalButtonText}>Eliminar</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.modalButton, styles.cancelButton]}
							onPress={handleCancel}
						>
							<Text style={styles.modalButtonText}>Cancelar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		padding: 12,
		marginVertical: 8,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#007BFF",
		width: "100%",
	},
	topRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 6,
	},
	bottomRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 6,
	},
	name: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#FFFFFF",
	},
	location: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#007BFF",
		textAlign: "right",
	},
	date: {
		fontSize: 14,
		color: "#AAAAAA",
	},
	time: {
		fontSize: 14,
		color: "#FFFFFF",
		textAlign: "right",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.8)",
	},
	modalContent: {
		backgroundColor: "#1A1A1D",
		padding: 16,
		borderRadius: 8,
		width: "90%",
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#FFFFFF",
		marginBottom: 16,
	},
	modalButton: {
		backgroundColor: "#007BFF",
		borderRadius: 10,
		paddingVertical: 12,
		paddingHorizontal: 20,
		marginBottom: 10,
		width: "100%",
		alignItems: "center",
	},
	modalButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	cancelButton: {
		backgroundColor: "#AAAAAA",
	},
});

export default ReservationItem;
