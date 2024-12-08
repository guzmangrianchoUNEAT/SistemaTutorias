import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

interface FormInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: object;
}

const FormInput: React.FC<FormInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888" // Color del placeholder
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
      <View style={styles.underline} /> {/* Línea debajo del input */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16, // Separación entre los inputs
    width: '100%', // Asegura que se adapte al ancho del contenedor
  },
  input: {
    color: '#FFFFFF', // Texto blanco
    paddingVertical: 12, // Altura consistente con el botón
    paddingHorizontal: 8, // Espaciado interno
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fondo semitransparente más oscuro
    borderRadius: 8, // Bordes suaves para coherencia con los botones
  },
  underline: {
    height: 2, // Línea baja
    backgroundColor: '#1E90FF', // Azul vibrante para destacar
    marginTop: 4, // Espaciado entre el input y la línea
  },
});

export default FormInput;
