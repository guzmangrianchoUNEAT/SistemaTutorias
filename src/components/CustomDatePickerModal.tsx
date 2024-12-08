import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { WheelPicker } from "react-native-infinite-wheel-picker";

interface CustomDatePickerModalProps {
  visible: boolean;
  onConfirm: (data: { date: Date; room: string }) => void;
  onCancel: () => void;
}

const CustomDatePickerModal: React.FC<CustomDatePickerModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  const today = new Date();
  const initialHour = 0;
  const initialMinute = 0;
  const initialRoomIndex = 0;

  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [selectedHour, setSelectedHour] = useState<number>(initialHour);
  const [selectedMinute, setSelectedMinute] = useState<number>(initialMinute);
  const [selectedRoom, setSelectedRoom] = useState<number>(initialRoomIndex);

  const roomsArray: string[] = ["Sala 1", "Sala 2", "Sala 3", "Sala 4", "Sala 5"];

  const resetPickerValues = (): void => {
    setSelectedDateIndex(0);
    setSelectedHour(initialHour);
    setSelectedMinute(initialMinute);
    setSelectedRoom(initialRoomIndex);
  };

  useEffect(() => {
    if (visible) {
      resetPickerValues();
    }
  }, [visible]);

  const formatDateLabel = (date: Date, index: number): string => {
    if (index === 0) return "Hoy";
    const days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}`;
  };

  const datesArray: string[] = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return formatDateLabel(date, i);
  });

  const hoursArray: string[] = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
  const minutesArray: string[] = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, "0"));

  const handleConfirm = () => {
    const selectedDate = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() + selectedDateIndex);
    selectedDate.setFullYear(date.getFullYear());
    selectedDate.setMonth(date.getMonth());
    selectedDate.setDate(date.getDate());
    selectedDate.setHours(selectedHour);
    selectedDate.setMinutes(selectedMinute);

    console.log('Datos seleccionados:', {
        date: selectedDate,
        room: roomsArray[selectedRoom],
    });

    if (selectedDate < new Date(today)) {
        resetPickerValues();
        return;
    }

    onConfirm({
        date: selectedDate,
        room: roomsArray[selectedRoom],
    });
};

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Selecciona Fecha, Hora y Sala</Text>

          <View style={styles.pickerContainer}>
            <WheelPicker
              data={datesArray}
              selectedIndex={selectedDateIndex}
              onChangeValue={(index: number) => setSelectedDateIndex(index)}
              elementHeight={40}
              restElements={2}
              infiniteScroll={false}
              containerStyle={[styles.wheelPicker, styles.datePicker]}
              elementTextStyle={styles.elementTextStyle}
            />
            <Text style={styles.separator}>,</Text>
            <WheelPicker
              data={hoursArray}
              selectedIndex={selectedHour}
              onChangeValue={(index: number) => setSelectedHour(Number(index))}
              elementHeight={40}
              restElements={2}
              infiniteScroll={true}
              containerStyle={[styles.wheelPicker, styles.hourPicker]}
              elementTextStyle={styles.elementTextStyle}
            />
            <Text style={styles.separator}>:</Text>
            <WheelPicker
              data={minutesArray}
              selectedIndex={selectedMinute / 5}
              onChangeValue={(index: number) => setSelectedMinute(Number(index) * 5)}
              elementHeight={40}
              restElements={2}
              infiniteScroll={true}
              containerStyle={[styles.wheelPicker, styles.minutePicker]}
              elementTextStyle={styles.elementTextStyle}
            />
          </View>

          <View style={styles.roomPickerContainer}>
            <WheelPicker
              data={roomsArray}
              selectedIndex={selectedRoom}
              onChangeValue={(index: number) => setSelectedRoom(Number(index))}
              elementHeight={40}
              restElements={2}
              infiniteScroll={false}
              containerStyle={[styles.wheelPicker, styles.roomPicker]}
              elementTextStyle={styles.elementTextStyle}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => {
              onCancel();
              resetPickerValues();
            }}>
              <Text style={styles.textStyle}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.textStyle}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomDatePickerModal;

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalView: {
		width: "90%",
		backgroundColor: "#1A1A1D",
		borderRadius: 10,
		padding: 20,
		alignItems: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		fontSize: 18,
		color: "#FFFFFF",
		fontWeight: "bold",
	},
	pickerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		width: "100%",
		marginBottom: 16,
	},
	roomPickerContainer: {
        alignItems: "center", // Centrado vertical
        justifyContent: "center", // Centrado horizontal
        width: "100%",
        marginBottom: 16,
    },
    roomPicker: {
        width: "60%", // Ajuste ancho para centrar
    },
	wheelPicker: {
		height: 150,
	},
	datePicker: {
		width: "50%",
	},
	hourPicker: {
		width: "20%",
	},
	minutePicker: {
		width: "20%",
	},
	separator: {
		fontSize: 18,
		color: "#FFFFFF",
	},
	elementTextStyle: {
		fontSize: 14,
		color: "#FFFFFF",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginTop: 16,
	},
	cancelButton: {
		flex: 1,
		borderRadius: 10,
		padding: 12,
		marginRight: 8,
		backgroundColor: "#4f4f4f",
	},
	confirmButton: {
		flex: 1,
		borderRadius: 10,
		padding: 12,
		marginLeft: 8,
		backgroundColor: "#007BFF",
	},
	textStyle: {
		color: "#FFFFFF",
		textAlign: "center",
		fontWeight: "bold",
	},
});
