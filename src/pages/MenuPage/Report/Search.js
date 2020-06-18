import React from 'react';
import {View} from 'react-native';
import {Icon, SearchBar, Button} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';

export default function SearchTemplate(props) {
  const {colors} = useTheme();
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
         backgroundColor:'#363837'
      }}>
      <View style={{flex: 1, padding: 3}}>
        <Button
          icon={<Icon name="cached" color="#8ed9f5" size={25} />}
          onPress={props.onrefresh}
        />
      </View>
      <View style={{flex: 4}}>
        <SearchBar
          placeholder="Search"
          onChangeText={props.onChangeText}
          value={props.value}
          inputContainerStyle={{height:30, backgroundColor:'#575b61'}}
          containerStyle={{backgroundColor:colors.background}}
        />
      </View>
    </View>
  );
}
