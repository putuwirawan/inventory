/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import ListItem from './ListItem';
import * as ApiHelper from './ApiHelper';
import {GetStore} from '../../../assets/Helper/GetStore';
import ChangeParameter from './ChangeParameter';
import styles from './Style';

const ShippingPage = ({navigation}) => {
  const [isLoadingShipping, setIsLoadingShipping] = useState(false);
  const [shippingProces, setShippingProces] = useState(1);
  const [storeDatas, setStoreDatas] = useState([]);
  const [shippingDatas, setShippingDatas] = useState([]);
  const [totalFiltered, setTotalFiltered] = useState(0);
  const [selectedStore, setSelectedStore] = useState('Kopi susu');
  const [textSearch, setTextSearch] = useState('');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const take = 10;

  const getStore = async () => {
    let response = await GetStore();
    await setSelectedStore(response[0].value);
    await setStoreDatas(response);
  };
  const getShipping = async () => {
    setIsLoadingShipping(true);
    const param = {
      take: take,
      skip: page,
      store: selectedStore,
      shipping: shippingProces,
      search: textSearch,
    };
    let response = await ApiHelper.GetShipping({params: param});
    setTotalFiltered(response.totalFiltered);
    setTotal(response.totalCount);
    setShippingDatas(response.data);
    setIsLoadingShipping(false);
  };

  function initData() {
    getStore();

    // await getShipping();
  }

  const param = {
    textSearch: textSearch,
    shippingProces: shippingProces,
    storeDatas: storeDatas,
  };
  useEffect(() => {
    getStore();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getShipping();
    }, 1000);
  }, [shippingProces, selectedStore, textSearch, page]);

  return (
    <View style={styles.container}>
      <ChangeParameter
        data={param}
        getData={() => getShipping()}
        onChangeText={(val) => {
          setTextSearch(val);
          setPage(0);
        }}
        onChangeShipping={(itemSelect, itemIndex) => {
          setShippingProces(itemSelect);
        }}
        onChangeStore={(selectValue) => {
          setSelectedStore(selectValue);
        }}
      />

      <View style={styles.container}>
        <ListItem
          data={shippingDatas}
          isLoading={isLoadingShipping}
          viewPage={page}
          totalData={totalFiltered}
          take={take}
          changeUp={() => {
            if (page + 1 < totalFiltered / take) setPage(page + 1);
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
