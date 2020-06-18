import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

export const GetDashboard = async (store) => {
  const token = await AsyncStorage.getItem('userToken');
  const dateNow = moment.utc(new Date()).format('YYYY/MM/DD');
  const dateYesterday = moment
    .utc(new Date())
    .subtract(1, 'day')
    .format('YYYY/MM/DD');
  const dateTomorro = moment.utc(new Date()).add(1, 'day').format('YYYY/MM/DD');

  let dataNow = null;
  let dataYesterday = null;
  let dataTomorro = null;
  const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  await fetch(
    `http://inventoryapi.planetsurf.id/api/v1/Dashboards/GetTotalByDate`,

    {
      method: 'POST',
      headers: header,
      body: JSON.stringify({
        dateby: 1,
        date: dateNow,
        store: store,
      }),
    },
  )
    .then((response) => response.json())
    .then((datas) => (dataNow = datas))
    .catch((e) => {
      console.log(e.toString());
    });
  await fetch(
    `http://inventoryapi.planetsurf.id/api/v1/Dashboards/GetTotalByDate`,

    {
      method: 'POST',
      headers: header,
      body: JSON.stringify({
        dateby: 1,
        date: dateYesterday,
        store: store,
      }),
    },
  )
    .then((response) => response.json())
    .then((datas) => (dataYesterday = datas))
    .catch((e) => {
      console.log(e.toString());
    });

  await fetch(
    `http://inventoryapi.planetsurf.id/api/v1/Dashboards/GetTotalByDate`,

    {
      method: 'POST',
      headers: header,
      body: JSON.stringify({
        dateby: 1,
        date: dateTomorro,
        store: store,
      }),
    },
  )
    .then((response) => response.json())
    .then((datas) => (dataTomorro = datas))
    .catch((e) => {
      console.log(e.toString());
    });
  const res = {
    dataNow: dataNow,
    dataYesterday: dataYesterday,
    dataTomorro: dataTomorro,
  };
  return res;
};
