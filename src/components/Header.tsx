import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  onLeftPress?: () => void; // Función opcional para manejar el botón izquierdo
  onRightPress?: () => void; // Función opcional para manejar el botón derecho
  leftIcon?: keyof typeof Ionicons.glyphMap; // Nombre del icono izquierdo
  rightIcon?: keyof typeof Ionicons.glyphMap; // Nombre del icono derecho
}

const Header= ({
}) => {
  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1557683316-973673baf926" }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
      </View>
    </ImageBackground>
  );
};

export default Header;

const styles = StyleSheet.create({
  background: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Fondo oscuro si falla la carga de imagen
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Fondo semitransparente más oscuro
    height: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  logo: {
    width: 90,
    height: 30,
    resizeMode: "contain",
  },
});
