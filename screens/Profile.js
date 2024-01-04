import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        const storedAddress = await AsyncStorage.getItem('address');
        const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');

        setName(storedName || '');
        setAddress(storedAddress || '');
        setPhoneNumber(storedPhoneNumber || '');
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };

    getData();
  }, []);

  const handleUpdateInfo = () => {
    navigation.navigate('updateinfo');
  };

  return (
    <ImageBackground
      source={require('./img/img1.jpeg')} // Replace with the actual path to your background image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/68.png' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{name}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{address}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.value}>{phoneNumber}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleUpdateInfo}>
            <Text style={styles.buttonText}>Update Info</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black', // Change the color to cyan
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  location: {
    fontSize: 18,
    color: 'purple', // Change the color to cyan
    textAlign: 'center',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: 'black',
    textAlign: 'right',
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: 'black', // Change the color to cyan
    textAlign: 'left',
  },
  content: {
    flex: 1,
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfilePage;
