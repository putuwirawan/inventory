/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, SafeAreaView, ActivityIndicator, Fle} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {Button, ListItem, Icon} from 'react-native-elements';

import styles from './Style';
import * as GlobalFunction from '../../../assets/Helper/GlobalFunction';
function RenderListItem(props) {
  const {colors} = useTheme();
  const RenderItem = ({item, index}) => {
    return (
      <ListItem
        key={item.Id}
        title={item.ShippingNumber}
        titleStyle={{fontSize:17, fontWeight:'bold',color:colors.text}}
        leftElement={
          <View
            style={{
              backgroundColor: '#03fccf',
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
            }}>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>
              {props.viewPage * props.take + 1 + index}
            </Text>
          </View>
        }
        bottomDivider
        chevron={
          <View>
            <Icon
              name="angle-right"
              size={30}
              type="font-awesome"
              color="#428580"
              onPress={() => {
                // props.navigation.navigate('DetailShipping', {itemDetail: item});
              }}
            />
          </View>
        }
        containerStyle={{backgroundColor: colors.background}}
        onPress={() => {
          props.navigation.navigate('DetailShipping', {itemDetail: item,shippingStatus: props.shippingStatus,navigations:props.navigation});
        }}
        subtitle={
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={{color: colors.text}}>Sender: {item.Sender}</Text>
              <Text style={{color: colors.text}}>Courir: {item.Courier}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 5}}>
              <Text style={{color: colors.text}}> {item.TotalQty} Pcs</Text>
              <Text style={{color: colors.text}}>
                By : {item.StrShipmentMethod}
              </Text>
            </View>
          </View>
        }
      />
    );
  };
  const FotterComponent = () => {
    const numPage = GlobalFunction.roundUp(props.totalData / props.take, 0);
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 3, marginRight: 5}}>
          <Button
            icon={
              <Icon
                name="angle-double-left"
                type="font-awesome"
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
            flex: 4,
            marginLeft: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {props.totalData <= 0 ? null : (
            <View>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Page {props.viewPage + 1} Of ({numPage})
              </Text>
              <Text
                style={{
                  color: '#714ab0',
                  fontSize: 15,
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                }}>
                {props.totalData} Record
              </Text>
            </View>
          )}
        </View>
        <View style={{flex: 3, marginLeft: 5}}>
          <Button
            icon={
              <Icon
                name="angle-double-right"
                type="font-awesome"
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
              props.totalData / props.take > props.viewPage + 1 ? false : true
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
