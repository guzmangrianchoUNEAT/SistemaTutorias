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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
    textAlign: 'center',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  reservationItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  reservationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reservationDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  reservationTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  reservationLocation: {
    fontSize: 14,
    color: '#AAAAAA',
    marginTop: 4,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  createButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: '#1A1A1D',
    padding: 16,
    borderRadius: 8,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  modalLabel: {
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  pickerContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  picker: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#d6d6d6',
    backgroundColor: '#1A1A1D',
    borderRadius:10
  },
  pickerItem: {
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#636363',
    borderRadius: 8,
    paddingVertical: 10,
    marginRight: 8,
  },
  confirmButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default styles;
