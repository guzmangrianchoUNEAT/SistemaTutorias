import React from "react";
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	ViewStyle,
	TextStyle,
} from "react-native";

interface ButtonProps {
	title: string;
	onPress: () => void;
	style?: ViewStyle | ViewStyle[];
	textStyle?: TextStyle | TextStyle[];
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	title,
	onPress,
	style,
	textStyle,
	disabled = false,
}) => {
	return (
		<TouchableOpacity
			style={[styles.button, style, disabled && styles.disabledButton]}
			onPress={!disabled ? onPress : undefined}
			disabled={disabled}
		>
			<Text
				style={[
					styles.buttonText,
					textStyle,
					disabled && styles.disabledButtonText,
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#1E90FF",
		paddingVertical: 14,
		paddingHorizontal: 24,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
	},
	buttonText: {
		color: "#FFFFFF",
		fontWeight: "600",
		fontSize: 16,
		textTransform: "uppercase",
	},
	disabledButton: {
		backgroundColor: "#B0C4DE",
		shadowOpacity: 0,
		elevation: 0,
	},
	disabledButtonText: {
		color: "#D3D3D3",
	},
});

export default Button;
