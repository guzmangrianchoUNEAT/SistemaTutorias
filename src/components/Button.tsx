import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[]; // Soporta un estilo o un arreglo de estilos
  textStyle?: TextStyle | TextStyle[]; // Nueva propiedad para personalizar el estilo del texto
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
      style={[
        styles.button,
        style,
        disabled && styles.disabledButton, // Aplica estilo de deshabilitado si es necesario
      ]}
      onPress={!disabled ? onPress : undefined}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          textStyle,
          disabled && styles.disabledButtonText, // Cambia el texto si el botón está deshabilitado
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1E90FF', // Azul vibrante
    paddingVertical: 14, // Más espacio vertical
    paddingHorizontal: 24, // Espaciado horizontal generoso
    borderRadius: 5, 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Sombra para darle profundidad
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Sombra en Android
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    textTransform: 'uppercase', // Texto en mayúsculas para destacar
  },
  disabledButton: {
    backgroundColor: '#B0C4DE', // Color deshabilitado más suave
    shadowOpacity: 0, // Sin sombra cuando está deshabilitado
    elevation: 0,
  },
  disabledButtonText: {
    color: '#D3D3D3', // Texto claro para botón deshabilitado
  },
});

export default Button;
