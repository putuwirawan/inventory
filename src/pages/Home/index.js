/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, Button, View, StyleSheet, StatusBar} from 'react-native';
import {useTheme} from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Home = ({navigation}) => {
  const {colors} = useTheme();
  const theme = useTheme();
  return (
    <View style={style.container}>
      <StatusBar
        backgroundColor="#009387"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <Text style={{color: colors.text}}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Detail');
        }}
      />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Home;
