/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

const ProfilePage = () => {
  const {colors} = useTheme();
  return (
    <View>
      <Text style={{color: colors.text}}>Profile Page baru ne ru</Text>
    </View>
  );
};

export default ProfilePage;
