  import React from 'react';
  import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
  import { Feather } from '@expo/vector-icons';
  import { FontAwesome } from '@expo/vector-icons';

  import { TripsData } from './TripInfo';
  import { useNavigation } from '@react-navigation/native';

  const GuideWise = () => {
    const navigation = useNavigation();

    const handleProfilePress = () => {
      navigation.navigate('profile');
      console.log('Profile Pressed');
    };

    const handleCartPress = () => {
      navigation.navigate('Trips Booked');
      console.log('Cart Pressed');
    };

    const handleTripPress = (Trip) => {
      navigation.navigate('TripPage', { Trip });
      console.log('Trip Pressed:', Trip);
    };

    return (
      <ImageBackground
        source={require('./img/img1.jpeg')} // Replace with the actual path to your background image
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
              <Feather name="user" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>GuideWise</Text>
            <TouchableOpacity style={styles.cartButton} onPress={handleCartPress}>
              <FontAwesome name="suitcase" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollView}>
            {TripsData.map((Trip, index) => (
              <TouchableOpacity key={index} style={styles.TripContainer} onPress={() => handleTripPress(Trip)}>
                <Image source={{ uri: Trip.image }} style={styles.image} />
                <View style={styles.fadeContainer}>
                  <Text style={styles.name}>{Trip.name}</Text>
                  <Text style={styles.price}>Price: {Trip.price} MAD</Text>
                  <Text style={styles.description}>{Trip.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  profileButton: {
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
  cartButton: {
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  TripContainer: {
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 16,
    overflow: 'hidden', // Ensure the fade effect stays within the container
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 8,
  },
  fadeContainer: {
    backgroundColor: 'rgba(255, 228, 181, 0.8)', // Add a translucent background color to the fade container
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  price: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555555',
  },
});

export default GuideWise;
