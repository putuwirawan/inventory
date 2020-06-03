/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {TextInput} from 'react-native-paper';
import {Dropdown} from 'react-native-material-dropdown';
import {Picker} from '@react-native-community/picker';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import RenderListItem from './Componet';

// import {Button} from 'react-native-elements';
import styles from './Style';

const ShippingPage = ({navigation}) => {
  const [isLoadingShipping, setIsLoadingShipping] = useState(false);

  const {colors} = useTheme();
  const [shippingProces, setShippingProces] = useState(1);
  const [storeDatas, setStoreDatas] = useState([]);
  const [shippingDatas, setShippingDatas] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedStore, setSelectedStore] = useState('');
  const [textSearch, setTextSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

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
          await setSelectedStore(datas[0].Id);
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
          take: '5',
          skip: page * 5,
          sort: 'Courier',
          order: 'true',
        }),
      },
    )
      .then((response) => response.json())
      .then(async (datas) => {
        setTotalCount(datas.totalFiltered);
        setTotal(datas.totalCount);
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

  async function initData() {
    await getStore();
    // await getShipping();
  }
  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    getShipping();
  }, [shippingProces, selectedStore, textSearch, page]);
  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 10,
          borderBottomWidth: 2,
          borderBottomColor: '#82b393',
        }}>
        <View style={styles.action}>
          <View>
            <Button
              icon={<Icon name="refresh" color="#8ed9f5" size={20} />}
              onPress={() => {
                getShipping();
              }}
            />
          </View>
          <View style={styles.section}>
            <Icon
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
                setPage(0);
              }}
            />
          </View>
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
            <Picker.Item label="Arrived" value={2} />
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
        <View
          style={{
            backgroundColor: '#684f8f',
            height: 50,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: '#c9f2bb', fontSize: 20, fontWeight: 'bold'}}>
            Total Record : {total}
          </Text>
          {totalCount <= 0 ? null : (
            <Text
              style={{
                color: '#f2e3b8',
                fontSize: 20,
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}>
              {page * 5 + 1} -{' '}
              {totalCount > (page + 1) * 5 ? (page + 1) * 5 : totalCount} Of{' '}
              {totalCount} Filtered
            </Text>
          )}
        </View>
        <RenderListItem
          data={shippingDatas}
          isLoading={isLoadingShipping}
          viewPage={page}
          totalData={totalCount}
          changeUp={() => {
            if (page + 1 < totalCount / 5) setPage(page + 1);
          }}
          changeDown={() => {
            if (page > 0) setPage(page - 1);
          }}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

export default ShippingPage;
