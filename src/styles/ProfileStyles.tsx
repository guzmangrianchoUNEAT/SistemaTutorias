import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo semitransparente
      width: '100%',
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60, // Hace la imagen circular
      marginBottom: 16,
      borderWidth: 2,
      borderColor: '#FFFFFF', // Borde blanco alrededor de la imagen
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 4,
      textAlign: 'center',
    },
    email: {
      fontSize: 16,
      color: '#AAAAAA',
      marginBottom: 24,
      textAlign: 'center',
    },
    logoutButton: {
      width: '80%',
      marginTop: 20,
    },
    logoutButtonText: {
      fontSize: 16,
    },
  });
  

export default styles;