/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Picker,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
// import {Dropdown} from 'react-native-material-dropdown';
import {TextInput} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Dropdown} from 'react-native-material-dropdown';

const ShippingPage = () => {
  const {colors} = useTheme();
  const [shippngProces, setShippingProces] = useState(1);

  const data = [];
  const [storeState, setStoreState] = useState(data[0]);

  const getStore = async () => {
    const token = await AsyncStorage.getItem('userToken');
    await fetch(
      'http://inventoryapi.planetsurf.id/api/v1/Locations/GetLocationCodes',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + token,
        },
        body: null,
      },
    )
      .then((response) => response.json())
      .then((datas) => {
        datas.map(
          async (item) => await data.push({value: item.Id, label: item.Code}),
        );
      });
  };
  useEffect(() => {
    getStore();
 
    
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'flex-end',
          marginBottom: 5,
        }}>
        <View style={{alignContent: 'center', justifyContent: 'center'}}>
          <FontAwesome
            name="search"
            color={colors.text}
            size={15}
            style={{paddingRight: 5, alignContent: 'center'}}
          />
        </View>
        <View style={{height: 30}}>
          <TextInput
            placeholder="Search"
            style={[styles.textSearch, {color: colors.text, width: 250}]}
            onChangeText={() => {}}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Picker
          mode="dropdown"
          selectedValue={shippngProces}
          style={{width: 150, color: colors.text}}
          onValueChange={(itemValue) => setShippingProces(itemValue.value)}>
          <Picker.Item label=" On Delivery" value={1} />
          <Picker.Item label="Delivered" value={2} />
        </Picker>
        {storeState === null ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <Dropdown
            value={storeState}
            data={data}
            fontSize={18}
            dropdownOffset={{top: 0, left: 0}}
            baseColor="#66E7A7"
            textColor={colors.text}
            selectedItemColor="#33654C"
            containerStyle={{width: '40%'}}
            onChangeText={(selectValue) => {
             console.log(selectValue)
              setStoreState(selectValue);
            }}
          />
        )}
      </View>
      <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
        <Text style={{color: 'red'}}>Kopi ne ru </Text>
      </View>
    </View>
  );
};

export default ShippingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {flexDirection: 'row', alignItems: 'center', marginRight: 20},
  textSearch: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : 2,
    paddingLeft: 5,
    color: '#05375a',
    height: 25,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  dropdown: {
    width: '40%',
  },
});
