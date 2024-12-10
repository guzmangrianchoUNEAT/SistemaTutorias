import React, { useState } from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import { login } from "../services/auth";
import styles from "../styles/LoginStyles";

export default function LoginScreen({ navigation }: any) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleLogin = async () => {
		setError(""); // Reinicia el error al intentar iniciar sesión

		if (!email || !password) {
			setError("Por favor, completa todos los campos");
			return;
		}

		setLoading(true); // Inicia el estado de carga

		try {
			const result = await login(email, password); // Llama al servicio login
			if (result.success) {
				navigation.replace("MainTabs"); // Navega al Tab Navigator
			} else {
				setError(result.error || "Email o contraseña incorrectos");
			}
		} catch (error) {
			setError("Hubo un problema al iniciar sesión. Intenta de nuevo.");
			console.error("Error en el inicio de sesión:", error);
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
				<Text style={styles.title}>Bienvenido</Text>
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
				{error ? <Text style={styles.errorText}>{error}</Text> : null}
				<Button
					title={loading ? "Cargando..." : "Iniciar Sesión"}
					onPress={handleLogin}
					disabled={loading}
					style={styles.button}
				/>
				<Button
					title="¿No tienes cuenta? Regístrate"
					onPress={() => navigation.navigate("Register")}
					style={styles.linkButton}
				/>
			</View>
		</ImageBackground>
	);
}
