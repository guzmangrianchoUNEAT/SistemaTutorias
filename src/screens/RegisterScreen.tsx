import React, { useState } from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import { register } from "../services/auth";
import styles from "../styles/RegisterStyles";

export default function RegisterScreen({ navigation }: any) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleRegister = async () => {
		setError("");

		if (!name || !email || !password || !confirmPassword) {
			setError("Todos los campos son obligatorios.");
			return;
		}

		if (password !== confirmPassword) {
			setError("Las contraseñas no coinciden.");
			return;
		}

		setLoading(true); // Activa el estado de carga

		try {
			const result = await register(name, email, password); // Llama al servicio de registro
			if (result.success) {
				navigation.navigate("Login"); // Navega a la pantalla de inicio de sesión
			} else {
				setError(result.error || "Hubo un problema al registrarte.");
			}
		} catch (error) {
			setError("No se pudo conectar al servidor.");
			console.error("Error en el registro:", error);
		} finally {
			setLoading(false); // Finaliza el estado de carga
		}
	};

	return (
		<ImageBackground
			source={{
				uri: "https://images.unsplash.com/photo-1557683316-973673baf926",
			}}
			style={styles.background}
		>
			<View style={styles.container}>
				<Image source={require("../../assets/logo.png")} style={styles.logo} />
				<Text style={styles.title}>Crea tu cuenta</Text>
				<FormInput
					placeholder="Nombre"
					value={name}
					onChangeText={setName}
					style={styles.input}
				/>
				<FormInput
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
					style={styles.input}
				/>
				<FormInput
					placeholder="Contraseña"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					style={styles.input}
				/>
				<FormInput
					placeholder="Confirmar contraseña"
					value={confirmPassword}
					onChangeText={setConfirmPassword}
					secureTextEntry
					style={styles.input}
				/>
				{error ? <Text style={styles.errorText}>{error}</Text> : null}{" "}
				<Button
					title={loading ? "Registrando..." : "Registrar"}
					onPress={handleRegister}
					disabled={loading}
					style={styles.button}
				/>
				<Button
					title="¿Ya tienes cuenta? Inicia Sesión"
					onPress={() => navigation.navigate("Login")}
					style={styles.linkButton}
				/>
			</View>
		</ImageBackground>
	);
}
