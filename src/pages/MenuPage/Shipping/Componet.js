/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {TextInput} from 'react-native-paper';
import {Dropdown} from 'react-native-material-dropdown';
import {Picker} from '@react-native-community/picker';
import {FlatList} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

// import {Button} from 'react-native-elements';
import styles from './Style';

function RenderListItem(props) {
  const {colors} = useTheme();
  const RenderItem = ({item}) => {
    return (
      <View
        key={item.Id}
        style={[
          styles.action,
          {borderBottomWidth: 1, borderBottomColor: '#3db8d1'},
        ]}>
        <View style={{flex: 1}}>
          <Text
            style={[
              styles.textSubHeader,
              {color: colors.text, fontStyle: 'italic'},
            ]}>
            Shipping : {item.ShippingNumber}
          </Text>
          <Text style={{color: colors.text}}>Sender: {item.Sender}</Text>
          <Text style={{color: colors.text}}>Courir: {item.Courier}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 5}}>
          <Text style={[styles.textSubHeader, {color: colors.text}]}></Text>
          <Text style={{color: colors.text}}> {item.TotalQty} Pcs</Text>
          <Text style={{color: colors.text}}>
            By : {item.StrShipmentMethod}
          </Text>
        </View>
        <View style={{width: 30, justifyContent: 'center', padding: 2}}>
          <TouchableOpacity
            onPress={() => {
             props.navigation.navigate('DetailShipping', {itemDetail: item});
            }}>
            <Icon
              name="caret-right"
              color={colors.text}
              size={40}
              style={{alignItems: 'center'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const FotterComponent = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, marginRight: 5}}>
          <Button
            icon={
              <Icon
                name="angle-double-left"
                size={25}
                style={{marginHorizontal: 10}}
                color="#9ce067"
              />
            }
            title="PreView"
            titleStyle={{fontSize: 20}}
            buttonStyle={{backgroundColor: '#138037'}}
            disabled={props.viewPage <= 0 ? true : false}
            onPress={props.changeDown}
          />
        </View>
        <View style={{flex: 1, marginLeft: 5}}>
          <Button
            icon={
              <Icon
                name="angle-double-right"
                size={25}
                style={{marginHorizontal: 10}}
                color="#9ce067"
              />
            }
            title="Next"
            iconRight
            titleStyle={{fontSize: 20}}
            buttonStyle={{backgroundColor: '#138037'}}
            disabled={props.totalData / 5 > props.viewPage + 1 ? false : true}
            onPress={props.changeUp}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {props.isLoading ? (
        <ActivityIndicator
          size="large"
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}></ActivityIndicator>
      ) : (
        <FlatList
          data={props.data}
          renderItem={RenderItem}
          keyExtractor={(item) => item.Id}
          ListFooterComponent={FotterComponent}
        />
        // ListFooterComponent={FotterComponent}
      )}
    </SafeAreaView>
  );
}
export default RenderListItem;
