/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  SectionList,
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
import {Picker} from '@react-native-community/picker';
import {FlatList} from 'react-native-gesture-handler';
import styles from './Style';

const ShippingPage = () => {
  const [isLoadingShipping, setIsLoadingShipping] = useState(true);
  const {colors} = useTheme();
  const [shippingProces, setShippingProces] = useState(1);
  const [storeDatas, setStoreDatas] = useState([]);
  const [shippingDatas, setShippingDatas] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedStore, setSelectedStore] = useState('');
  const [textSearch, setTextSearch] = useState('');

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
      .then(async (datas) => {
        let data = [];
        if (datas.length) {
          await datas.map(
            async (item) => await data.push({value: item.Id, label: item.Code}),
          );
        }
        await setStoreDatas(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getShipping = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setIsLoadingShipping(true);

    await fetch(
      `http://inventoryapi.planetsurf.id/api/v1/Shippings/GetShippingDocs?store=${selectedStore}&status=${shippingProces}`,

      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          search: textSearch,
          take: '10',
          skip: '0',
          sort: 'Courier',
          order: 'true',
        }),
      },
    )
      .then((response) => response.json())
      .then(async (datas) => {
        setTotalCount(datas.totalCount);
        let data = [];
        if (datas.data.length) {
          await datas.data.map((item) => {
            data.push(item);
          });
        }
        setShippingDatas(data);
        setIsLoadingShipping(false);
      })
      .catch((e) => {
        console.log(e.toString());
      });
  };

  const RenderItem = ({item}) => {
    return (
      <View
        style={[
          styles.action,
          {borderBottomWidth: 1, borderBottomColor: '#3db8d1'},
        ]}>
        <View style={{flex:1}}>
          <Text style={[styles.textSubHeader, {color: colors.text, fontStyle:'italic'}]}>
            Shipping : {item.ShippingNumber}
          </Text>
          <Text style={{color: colors.text}}>Sender: {item.Sender}</Text>
          <Text style={{color: colors.text}}>Courir: {item.Courier}</Text>
        </View>
        <View style={{flex:1,backgroundColor:'blue', alignItems:'flex-end'}}>
          <Text style={[styles.textSubHeader, {color: colors.text}]}>
            To:  {item.Store}
          </Text>
          <Text style={{color: colors.text}}> {item.TotalQty} Pcs</Text>
          <Text style={{color: colors.text}}>
            By : {item.StrShipmentMethod}
          </Text>
        </View>
        <View style={{width:20, backgroundColor:'red'}}  >
          <Text>kopi</Text>
        </View>
      </View>
    );
  };
  async function initData() {
    await getStore();
    await getShipping();
  }
  useEffect(() => {
    initData();
  }, []);
  useEffect(() => {
    getShipping();
  }, [shippingProces, selectedStore, textSearch]);
  return (
    <View style={styles.container}>
      <View style={{marginBottom:10, borderBottomWidth:2, borderBottomColor:'#82b393'}}>
        <View style={styles.section}>
          <FontAwesome
            name="search"
            color={colors.text}
            size={15}
            style={{paddingRight: 5, alignContent: 'center'}}
          />

          <TextInput
            placeholder="Search"
            style={[styles.textSearch, {color: colors.text, width: 250}]}
            onChangeText={(val) => {
              setTextSearch(val);
            }}
          />
        </View>
        <View style={styles.action}>
          <Picker
            mode="dropdown"
            selectedValue={shippingProces}
            style={{width: 150, color: colors.text}}
            onValueChange={async (itemSelect, itemIndex) => {
              await setShippingProces(itemSelect);
            }}>
            <Picker.Item label=" On Delivery" value={1} />
            <Picker.Item label="Delivered" value={2} />
          </Picker>
          <Dropdown
            value="Select Store"
            animationDuration={500}
            data={storeDatas}
            fontSize={18}
            dropdownOffset={{top: 0, left: 0}}
            dropdownPosition={-2}
            baseColor={colors.text}
            textColor={colors.text}
            selectedItemColor="#33654C"
            containerStyle={{width: '40%'}}
            onChangeText={(selectValue) => {
              setSelectedStore(selectValue);
            }}
          />
        </View>
      </View>

      <View style={styles.container}>
        <View>
          <Text>{shippingProces}</Text>
          <Text>total Count {totalCount}</Text>
        </View>

        <SafeAreaView style={styles.container}>
          {isLoadingShipping ? (
            <ActivityIndicator
              size="large"
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}></ActivityIndicator>
          ) : (
            <FlatList
              data={shippingDatas}
              renderItem={RenderItem}
              keyExtractor={(item) => item.id}
            />
          )}
        </SafeAreaView>
      </View>
    </View>
  );
};

export default ShippingPage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   section: {flexDirection: 'row', alignItems: 'center', marginRight: 20, justifyContent: 'space-between'},
//   textSearch: {
//     flex: 1,
//     marginTop: Platform.OS === 'ios' ? 0 : 2,
//     paddingLeft: 5,
//     color: '#05375a',
//     height: 25,
//   },
//   textHeader: {
//     fontSize: 17,
//     fontWeight: 'bold',
//   },
//   action: {
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     marginTop: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f2f2f2',
//     padding: 10,

//     borderRadius: 10,
//   },
//   dropdown: {
//     width: '40%',
//   },
// });
