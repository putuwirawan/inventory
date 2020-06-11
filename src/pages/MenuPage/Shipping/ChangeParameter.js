import React from 'react';
import {View} from 'react-native';
import {Icon, SearchBar, Button} from 'react-native-elements';
import {Dropdown} from 'react-native-material-dropdown';
import {useTheme} from '@react-navigation/native';
import styles from './Style';
// import {Button} from 'react-native-elements';
export default function ChangeParameter(props) {
  const {colors} = useTheme();
  const shippingTypes = [
    {value: 1, label: 'On Delivery'},
    {value: 2, label: 'Arrived'},
  ];
  return (
    <View
      style={{
        marginBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#82b393',
      }}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
           backgroundColor:'#363837'
        }}>
        <View style={{flex: 1, padding: 3}}>
          <Button
            icon={<Icon name="cached" color="#8ed9f5" size={25} />}
            onPress={props.getData}
          />
        </View>
        <View style={{flex: 4}}>
          <SearchBar
            placeholder="Search"
            onChangeText={props.onChangeText}
            value={props.data.textSearch}
            inputContainerStyle={{height:30, backgroundColor:'#505751'}}
            containerStyle={{backgroundColor:colors.background}}
            
          />
        </View>
      </View>

      <View style={styles.action}>
        <Dropdown
          value="On Delivery"
          animationDuration={500}
          data={shippingTypes}
          fontSize={18}
          dropdownOffset={{top: 0, left: 0}}
          dropdownPosition={-2}
          baseColor={colors.text}
          textColor={colors.text}
          selectedItemColor="#33654C"
          containerStyle={{width: '40%'}}
          onChangeText={props.onChangeShipping}
        />

        <Dropdown
          value="Select Store"
          animationDuration={500}
          data={props.data.storeDatas}
          fontSize={18}
          dropdownOffset={{top: 0, left: 0}}
          dropdownPosition={-2}
          baseColor={colors.text}
          textColor={colors.text}
          selectedItemColor="#33654C"
          containerStyle={{width: '40%'}}
          onChangeText={props.onChangeStore}
        />
      </View>
    </View>
  );
}
