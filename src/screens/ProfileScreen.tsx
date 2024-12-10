import React, { useEffect, useState } from "react";
import { View, Text, Image, ImageBackground, Alert } from "react-native";
import Header from "../components/Header";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/ProfileStyles";

type ProfileScreenProps = {
	navigation: any;
};

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
	const [userProfile, setUserProfile] = useState({
		name: "",
		email: "",
		avatar:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AJM9wkP__z2M-hovSAWcTb_9XJ6smy3NKw&s",
	});

	// Cargar datos del usuario desde AsyncStorage
	useEffect(() => {
		const loadUserProfile = async () => {
			try {
				const userName = await AsyncStorage.getItem("userName");
				const name = await AsyncStorage.getItem("userName");
				const email = await AsyncStorage.getItem("userEmail");

				if (name && email) {
					setUserProfile((prevProfile) => ({
						...prevProfile,
						name,
						email,
					}));
				} else {
					Alert.alert("Error", "No se pudo cargar la información del perfil.");
				}
			} catch (error) {
				console.error("Error al cargar el perfil:", error);
				Alert.alert("Error", "Hubo un problema al cargar el perfil.");
			}
		};

		loadUserProfile();
	}, []);

	// Función de cierre de sesión
	const handleLogout = async () => {
		try {
			await AsyncStorage.removeItem("userName");
			await AsyncStorage.removeItem("userEmail");
			await AsyncStorage.removeItem("token");
			navigation.replace("Login"); // Redirigir al inicio de sesión
		} catch (error) {
			console.error("Error al cerrar sesión:", error);
			Alert.alert("Error", "Hubo un problema al cerrar sesión.");
		}
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
				{/* Foto de Perfil */}
				<Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
				{/* Nombre y Correo */}
				<Text style={styles.name}>{userProfile.name || "Cargando..."}</Text>
				<Text style={styles.email}>{userProfile.email || "Cargando..."}</Text>
				{/* Botón de Cerrar Sesión */}
				<Button
					title="Cerrar Sesión"
					onPress={handleLogout}
					style={styles.logoutButton}
					textStyle={styles.logoutButtonText}
				/>
			</View>
		</ImageBackground>
	);
}
