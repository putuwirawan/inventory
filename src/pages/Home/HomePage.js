import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import {Dropdown} from 'react-native-material-dropdown';
import Header from './Header';
import DashboardView from './DashboardView';
import {GetStore} from '../../assets/Helper/GetStore';
import * as ApiHelper from './ApiHelper';
import moment from 'moment';

export default function HomePage() {
  const [stores, setStores] = useState([]);
  const [store, setStore] = useState('');
  const [dataDashboard, setDashboard] = useState(null);

  const [isCanceled, setIsCanceled] = useState(false);

  const getDashboard = async (store) => {
    let response = null;

    if (store != '') {
      response = await ApiHelper.GetDashboard(store);
     
      await setDashboard(response);
    }
  };
  const getStore = async () => {
    let response = [];
    if (!isCanceled) {
      response = await GetStore();
      await setStores(response);
    }
  };
  useEffect(() => {
    getStore();
    return () => {
      setIsCanceled(true);
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header />

      <View
        style={{
          flex: 2,
          backgroundColor: '#676b67',
        }}>
        <View style={{height: 35, margin: 5}}>
          <Dropdown
            value="Select Store"
            animationDuration={500}
            data={stores}
            fontSize={18}
            dropdownOffset={{top: 0, left: 0}}
            selectedItemColor="#33654C"
            containerStyle={{width: '40%'}}
            onChangeText={async (val) => {
              await setStore(val);
              await getDashboard(val);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
            paddingTop: 10,
          }}>
          <DashboardView
            name="Yesterday"
            date={
              dataDashboard
                ? moment
                    .utc(dataDashboard.dataYesterday.date)
                    .local()
                    .format('YYYY-MM-DD')
                : ''
            }
            qty={dataDashboard?dataDashboard.dataYesterday.totalQty:0}
            koli={dataDashboard?dataDashboard.dataYesterday.totalPackage:0}
            backgroundColor="#a19d9b"
          />
          <DashboardView
            name="Today"
            date={
              dataDashboard
                ? moment
                    .utc(dataDashboard.dataNow.date)
                    .local()
                    .format('YYYY-MM-DD')
                : ''
            }
            qty={dataDashboard?dataDashboard.dataNow.totalQty:0}
            koli={dataDashboard?dataDashboard.dataNow.totalPackage:0}
          />
          <DashboardView
            name="Tomorrow"
            date={
              dataDashboard
                ? moment
                    .utc(dataDashboard.dataTomorro.date)
                    .local()
                    .format('YYYY-MM-DD')
                : ''
            }
            qty={dataDashboard?dataDashboard.dataTomorro.totalQty:0}
            koli={dataDashboard?dataDashboard.dataTomorro.totalPackage:0}
            backgroundColor="#a19d9b"
          />
        </View>
      </View>
    </View>
  );
}
