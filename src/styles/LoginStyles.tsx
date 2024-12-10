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
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		width: "100%",
	},
	logo: {
		width: 100,
		height: 100,
		marginBottom: 16,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#fff",
		textAlign: "center",
		marginBottom: 24,
	},
	input: {
		width: "100%",
		marginBottom: 16,
	},
	button: {
		width: "100%",
		marginBottom: 12,
	},
	linkButton: {
		backgroundColor: "transparent",
		marginTop: 12,
	},
	errorText: {
		color: "red",
		fontSize: 14,
		textAlign: "center",
		marginTop: -10,
		marginBottom: 10,
	},
});

export default styles;
