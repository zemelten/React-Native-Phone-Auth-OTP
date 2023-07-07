import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React, {useEffect} from 'react';
import { LoginScreen } from './src/LoginScreen';
import Home from './src/Home';
import { Text, View } from 'react-native';
const Stack = createNativeStackNavigator();

export const SignedOutStack = () => (
   <LoginScreen/>
  );
  export const SignedInStack = () => (
  <Home/>
  );
