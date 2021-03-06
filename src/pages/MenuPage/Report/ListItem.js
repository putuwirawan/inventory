/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as GlobalFunction from '../../../assets/Helper/GlobalFunction';
// import {Button} from 'react-native-elements';
import styles from '../Shipping/Style';

function RenderListItem(props) {
  const {colors} = useTheme();


  const RenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('DetailReport', {itemDetail: item});
      }}>
 
      <View
        style={[
          styles.action,
          {borderBottomWidth: 1, borderBottomColor: '#3db8d1'},
        ]}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: '#7edbf2',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight:10
          }}>
          <Text style={{color: '#7609db', fontSize:17, fontWeight:'800'}}>
            {props.viewPage * props.take + 1 + index}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text
            style={[
              styles.textSubHeader,
              {color: colors.text, fontStyle: 'italic'},
            ]}>
            Shipping : {item.ShippingNumber}
          </Text>

          <Text style={{color: colors.text}}>Courir: {item.Courier}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 5}}>
          <Text style={[styles.textSubHeader, {color: colors.text}]}>
            {item.Brand}
          </Text>
          <Text style={{color: colors.text}}>{item.Qty} Pcs</Text>
        </View>
        <View style={{width: 20, justifyContent: 'center', padding: 2}}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('DetailReport', {itemDetail: item});
            }}>
            <Icon
              name="angle-right"
              color={colors.text}
              size={40}
              style={{alignItems: 'center'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      </TouchableOpacity>
    );
  };
  const FotterComponent = () => {
    const numPage = GlobalFunction.roundUp(props.data.totalFiltered / props.take, 0);
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
        <View
          style={{
            flex: 1,
            marginLeft: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>

          {numPage>0? <Text style={{textAlign: 'center', fontSize: 17, color: colors.text}}>
            Page {props.viewPage+1} of ({numPage})
          </Text> : null}
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
            disabled={
              props.data.totalFiltered / props.take > props.viewPage + 1
                ? false
                : true
            }
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
          data={props.data.data}
          renderItem={RenderItem}
          keyExtractor={(item, index) => `${item.ShippingNumber}_${index}`}
          ListFooterComponent={FotterComponent}
        />
        // ListFooterComponent={FotterComponent}
      )}
    </SafeAreaView>
  );
}
export default RenderListItem;
