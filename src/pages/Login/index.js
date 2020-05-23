/* eslint-disable prettier/prettier */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';

const LoginStack = createStackNavigator();
const LoginStackScreen = () => {
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <LoginStack.Screen name="SplashScreen" component={SplashScreen} />
      <LoginStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <LoginStack.Screen name="SignInScreen" component={SignInScreen} />
    </LoginStack.Navigator>
  );
};

export default LoginStackScreen;
