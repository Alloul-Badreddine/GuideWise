import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TripsBooked = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const cartItemsString = await AsyncStorage.getItem('cartItems');
      const items = cartItemsString ? JSON.parse(cartItemsString) : [];
      setCartItems(items);

      // Calculate total sum
      let sum = 0;
      items.forEach(item => {
        sum += item.price * item.quantity;
      });
      setTotalSum(sum);
    } catch (error) {
      console.log('Error fetching trips:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Price: ${item.price}</Text>
        <Text style={styles.itemQuantity}>Spots reserved: {item.quantity}</Text>
        <Text style={styles.itemContact}>Contact: {item.contact}</Text>
        <Text style={styles.itemTotal}>Total: ${item.quantity * item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
      setCartItems([]);
      setTotalSum(0);
      Alert.alert('List Cleared', 'Your Trips list has been cleared.');
    } catch (error) {
      console.log('Error clearing cart:', error);
    }
  };

  const BookTrip = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
      setCartItems([]);
      setTotalSum(0);
      Alert.alert('The Guide Will Contact You in The Next 24 Hours', 'Thank you for your reservation!');
    } catch (error) {
      console.log('Error Booking Trip:', error);
    }
  };

  return (
    <ImageBackground
      source={require('./img/img1.jpeg')} // Replace with the actual path to your background image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your trips</Text>
        </View>
        <View style={styles.content}>
          {cartItems.length > 0 ? (
            <FlatList
              data={cartItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <Text style={styles.emptyText}>Your Booking list is empty</Text>
          )}
          {cartItems.length > 0 && (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
                <Feather name="trash" size={18} color="#fff" style={styles.clearButtonIcon} />
                <Text style={styles.clearButtonText}>Clear Trip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.finalizeButton} onPress={BookTrip}>
                <Text style={styles.finalizeButtonText}>Book trip</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
  backButton: {
    marginRight: 8,
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
    padding: 24,
  },
  listContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#FFE4B5',
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  itemContact: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  itemQuantity: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  itemTotal: {
    fontSize: 16,
    color: '#888',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  summaryContainer: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#f44336',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 8,
  },
  finalizeButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 8,
    paddingHorizontal: 26,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  finalizeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 8,
  },
});

export default TripsBooked;
