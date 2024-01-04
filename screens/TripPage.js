import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Button, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

const TripPage = ({ route, navigation }) => {
  const { Trip } = route.params;
  const [Trips, setTrips] = useState([]);
  const [quantityModalVisible, setQuantityModalVisible] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState('');

  useEffect(() => {
    fetchTrips();
  }, []);



  const fetchTrips = async () => {
    try {
      const TripsString = await AsyncStorage.getItem('Trips');
      const TripsData = TripsString ? JSON.parse(TripsString) : [];
      setTrips(TripsData);
    } catch (error) {
      console.log('Error fetching Trips:', error);
    }
  };

  const handleOrderPress = () => {
    setQuantityModalVisible(true);
  };

  const handleOrderConfirm = async () => {
    const quantity = parseInt(orderQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      console.log('Invalid quantity');
      return;
    }

    if (quantity > Trip.quantity) {
      Alert.alert('Oops, Sorry', 'Not Enough Spots Available!');
      return;
    }

    try {
      const cartItemsString = await AsyncStorage.getItem('cartItems');
      const cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];
      const updatedCartItems = [...cartItems];
      const existingItem = updatedCartItems.find(item => item.id === Trip.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        updatedCartItems.push({ ...Trip, quantity });
      }

      const updatedTrip = { ...Trip, quantity: Trip.quantity - quantity };
      const updatedTrips = Trips.map(item => (item.id === Trip.id ? updatedTrip : item));

      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      await AsyncStorage.setItem('Trips', JSON.stringify(updatedTrips));
      setQuantityModalVisible(false);

      Alert.alert('Trip Reserved', 'Your Trip is reserved successfully.');

      setTrips(updatedTrips); // Update the state to reflect the new quantity on hand
    } catch (error) {
      console.log('Error updating Trip List:', error);
    }
  };

  return (
    <ImageBackground
      source={require('./img/img1.jpeg')} // Replace with the actual path to your background image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Trip information</Text>
        </View>
        <View style={styles.content}>
          <Image source={{ uri: Trip.image }} style={styles.image} />
          <Text style={styles.name}>{Trip.name}</Text>
          <Text style={styles.price}>Price: ${Trip.price}</Text>
          <Text style={styles.quantity}>Spots Left: {Trip.quantity}</Text>
          <Text style={styles.description}>{Trip.description}</Text>
          <TouchableOpacity style={styles.button} onPress={handleOrderPress} disabled={Trip.quantity === 0}>
            <Text style={styles.buttonText}>Book the trip</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={quantityModalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Number of spots:</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Spots"
                keyboardType="numeric"
                value={orderQuantity}
                onChangeText={text => setOrderQuantity(text)}
              />
              <TouchableOpacity style={styles.confirmButton} onPress={handleOrderConfirm}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginLeft: 8,
    color: '#333333',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  quantity: {
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    width: '70%',
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFEFD5',
    padding: 24,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  confirmButton: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TripPage;
