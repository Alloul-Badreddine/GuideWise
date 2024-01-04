import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginForm from './screens/LoginForm';
import SignUpForm from './screens/SignUpForm';
import Home from './screens/Home';
import TripPage from './screens/TripPage';
import TripsBooked from './screens/TripsBooked';
import Profile from './screens/Profile';
import UpdateInfoPage from './screens/UpdateInfo';
const Stack = createNativeStackNavigator();


export default function app  ()  {
 

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="SignUp" component={SignUpForm} />
       <Stack.Screen name="Trips Booked" component={TripsBooked} />
        <Stack.Screen name="GuideWise" component={Home} />
        <Stack.Screen name="TripPage" component={TripPage} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="updateinfo" component={UpdateInfoPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
 
});


