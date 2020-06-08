import AsyncStorage from '@react-native-community/async-storage';
import qs from 'qs';

export const GetReport = async ({params: params, body: body}) => {
  const token = await AsyncStorage.getItem('userToken');
  let data = [];
  let totalCount = 0;
  let totalFiltered = 0;
  let totalPackage = 0;
  let totalQty = 0;

 await  fetch(
    // `http://inventoryapi.planetsurf.id/api/v1/Reports/GetReports?startDate=2020-03-24&endDate=2020-03-24&dateBy=${params.dateBy}&courier=${params.courier}&brand=${params.brand}&status=${params.statusShipping}&store=${params.store}`,
    `http://inventoryapi.planetsurf.id/api/v1/Reports/GetReports?startDate=${params.startDate}&endDate=${params.endDate}&dateBy=${params.dateBy}&courier=${params.courier}&brand=${params.brand}&status=${params.status}&store=${params.store}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    },
  )
    .then((response) => response.json())
    .then( (datas) => {
      if (datas.data.length) {
        (totalCount = datas.totalCount),
          (totalFiltered = datas.totalFiltered),
          (totalPackage = datas.totalPackage),
          (totalQty = datas.totalQty),
           datas.data.map( (item) =>  data.push(item));
      }
    })

    .catch((e) => {
      console.log(e);
    });
  let responseData = {
    data: data,
    totalCount: totalCount,
    totalFiltered: totalFiltered,
    totalPackage: totalPackage,
    totalQty: totalQty,
  };
  
  return responseData;
};
