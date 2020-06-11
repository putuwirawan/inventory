import AsyncStorage from '@react-native-community/async-storage';

export const GetShipping = async ({params: params}) => {
  const token = await AsyncStorage.getItem('userToken');
  let totalFiltered = 0;
  let totalCount = 0;
  let data = [];

  await fetch(
    `http://inventoryapi.planetsurf.id/api/v1/Shippings/GetShippingDocs?store=${params.store}&status=${params.shipping}`,

    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        search: params.search,
        take: params.take,
        skip: params.skip * params.take,
        sort: 'Courier',
        order: 'true',
      }),
    },
  )
    .then((response) => response.json())
    .then(async (datas) => {
      if (datas.data.length) {
        await datas.data.map((item) => {
          data.push(item);
        });
        totalFiltered = datas.totalFiltered;
        totalCount = datas.totalCount;
      }
    })
    .catch((e) => {
      console.log(e.toString());
    });
  const res = {
    data: data,
    totalCount: totalCount,
    totalFiltered: totalFiltered,
  };
  return res;
};
