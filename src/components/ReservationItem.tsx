import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

interface ReservationItemProps {
  name: string;
  location: string;
  date: string;
  time: string;
}

const ReservationItem: React.FC<ReservationItemProps> = ({ name, location, date, time }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 12,
        marginVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#007BFF',
        width: '100%',
      },
      topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
      },
      bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6,
      },
      name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
      },
      location: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007BFF',
        textAlign: 'right',
      },
      date: {
        fontSize: 14,
        color: '#AAAAAA',
      },
      time: {
        fontSize: 14,
        color: '#FFFFFF',
        textAlign: 'right',
      },
  });


export default ReservationItem;
