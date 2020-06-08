import AsyncStorage from '@react-native-community/async-storage';
import qs from 'qs';

export const GetBrand = async ({search: search, take: take, skip: skip}) => {
  const token = await AsyncStorage.getItem('userToken');
  let data = [{value:'', label:'All'}];

  await fetch(
    'http://inventoryapi.planetsurf.id/api/v1/Brands/GetBrandCodes',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + token,
      },
      body: qs.stringify({
        search: search,
        take: take,
        skip: skip,
        sort: 'code',
        order: 'true',
      }),
    },
  )
    .then((response) => response.json())
    .then(async (datas) => {
      if (datas.length) {
        await datas.map(
          async (item) =>
            await data.push({
              value: item.Id,
              label: item.Code,             
              name: item.Name,
            }),
        );
      }
    })

    .catch((e) => {
      console.log(e);
    });
  return data;
};
