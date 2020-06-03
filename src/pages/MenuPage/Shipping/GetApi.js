import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';

export default function GetApi() {
  const GetShipping = async (store, shipping, skip, search) => {
    const token = await AsyncStorage.getItem('userToken');

    await fetch(
      `http://inventoryapi.planetsurf.id/api/v1/Shippings/GetShippingDocs?store=${store}&status=${shipping}`,

      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          search: search,
          take: '5',
          skip: skip * 5,
          sort: 'Courier',
          order: 'true',
        }),
      },
    )
      .then((response) => response.json())
      .then(async (datas) => {
        let data = [];
        if (datas.data.length) {
          await datas.data.map((item) => {
            data.push(item);
          });
          return data;
        } else {
          return null;
        }
      })
      .catch((e) => {
        console.log(e.toString());
      });
  };

  const GetStore = async () => {
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
          console.log(data);
          return data;
        } else {
          return null;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
}


