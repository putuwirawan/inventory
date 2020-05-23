/* eslint-disable prettier/prettier */
import React from 'react';
import {Text,View,Button} from 'react-native';

const Detail = ({navigation}) =>{

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>

      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Detail', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Go to First Screen" onPress={() => navigation.popToTop()} />
    </View>
  );
};
export default Detail;
