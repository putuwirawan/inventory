import AsyncStorage from '@react-native-community/async-storage';

export const GetStore = async () => {
  const token = await AsyncStorage.getItem('userToken');
  let data = [];

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
      if (datas.length) {
        await datas.map(
          async (item) => await data.push({value: item.Id, label: item.Code}),
        );
      }
    })

    .catch((e) => {
      console.log(e);
    });
  return data;
};