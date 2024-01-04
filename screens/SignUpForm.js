import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Authentication } from '../FireBaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const auth = Authentication;
  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);

      await AsyncStorage.setItem('name', name);

      navigation.navigate('GuideWise');
      console.log(response);
    } catch (error) {
      console.log('SignUp error:', error);
      setError('Sign up error');
    }
  };

  return (
    <ImageBackground
      source={require('./img/img1.jpeg')} // Replace with the actual path to your background image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Add your logo image here */}
        <Image
          source={require('./img/logo.png')} // Replace with the actual path to your logo image
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Sign Up</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={text => setName(text)}
            value={name}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={[styles.signUpButton, { width: windowWidth * 0.7 }]} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Move content to the top of the screen
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 200, // Adjust the width to make the logo bigger
    height: 200, // Adjust the height to maintain the aspect ratio
    marginTop: 50, // Add margin to move the logo higher
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#fff', // You can customize the text color to make it visible on the background
  },
  inputContainer: {
    width: windowWidth * 0.7, // Adjust the value to control the width of the input container
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#a9a9a9',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff', // You can customize the background color of the input fields
  },
  signUpButton: {
    height: 50, // Increase the height to make it thicker
    borderRadius: 8,
    backgroundColor: 'orange', // Change the background color to orange
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16, // Add horizontal padding to make it visually more prominent
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});

export default SignUpScreen;
