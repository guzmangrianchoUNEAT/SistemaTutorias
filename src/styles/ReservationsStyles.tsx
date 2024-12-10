import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		width: "100%",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#FFFFFF",
		marginBottom: 16,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 18,
		color: "#FFFFFF",
		marginTop: 20,
		marginBottom: 8,
	},
	input: {
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		color: "#FFFFFF",
		padding: 12,
		borderRadius: 8,
		marginBottom: 16,
	},
	scrollView: {
		flex: 1,
	},
	reservationItem: {
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		padding: 10,
		marginVertical: 8,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#007BFF",
	},
	reservationDate: {
		fontSize: 14,
		color: "#AAAAAA",
		marginBottom: 4,
	},
	reservationName: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#FFFFFF",
	},
	reservationTime: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#007BFF",
	},
	reservationLocation: {
		fontSize: 14,
		color: "#AAAAAA",
		marginTop: 4,
	},
	emptyText: {
		color: "#FFFFFF",
		fontSize: 16,
		textAlign: "center",
		marginTop: 16,
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
	closeButton: {
		marginTop: 16,
		backgroundColor: "#007BFF",
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: "center",
	},
	closeButtonText: {
		color: "#FFFFFF",
		fontWeight: "bold",
		fontSize: 16,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	leftColumn: {
		alignItems: "flex-start",
	},
	rightColumn: {
		alignItems: "flex-end",
	},
});

export default styles;
