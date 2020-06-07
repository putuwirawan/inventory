import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Dropdown} from 'react-native-material-dropdown';
import moment from 'moment';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-paper';
// Import Data
import {GetStore} from '../../../assets/Helper/GetStore';
import {GetCourier} from '../../../assets/Helper/GetCourier';
import {GetBrand} from '../../../assets/Helper/GetBrand';
import {GetReport} from './Helper';
import RenderListItem from './ListItem';

import styles from './Style';
import RadioButton from './RadioButton';
import DatePicker from './DatePicker';

export default function Report({navigation}) {
  const {colors} = useTheme();
  const dateBy = [
    {label: 'Delivery', value: 0},
    {label: 'Est Arrival', value: 1},
  ];

  const status = [
    {label: 'On Delivery', value: 0},
    {label: 'Arrived', value: 1},
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  //dateTime
  const [showEnd, setShowEnd] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const [dateBySelect, setDateBySelect] = useState(0);
  //Collection Data
  const [statusShipping, setStatus] = useState(1);
  const [search, setSearch] = useState('');
  const [store, setStore] = useState('');
  const [courier, setCourier] = useState('');
  const [brand, setBrand] = useState('');
  const [stores, setStores] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [reports, setReports] = useState('');
  const [page, setPage] = useState(0);

  const take = 10;
  // const katul = async () => {
  //   let xx = await Helper.NgalihToken();
  //   setToken(xx);
  // };
  const getStores = async () => {
    let response = await GetStore();
    setStores(response);
    setStore(response[0].value);
  };
  const getCouriers = async () => {
    let response = await GetCourier({search: '', take: '', skip: 0});

    setCouriers(response);
  };
  const getBrands = async () => {
    let response = await GetBrand({search: '', take: '', skip: 0});

    setBrands(response);
  };
  const getReport = async () => {
    setIsLoading(true);
    let params = {
      startDate: moment(startDate).format('yyyy-MM-DD'),
      endDate: moment(endDate).format('yyyy-MM-DD'),
      dateBy: dateBySelect,
      courier: courier,
      brand: brand,
      status: statusShipping,
      store: store,
    };
    let body = {
      search: search,
      take: take,
      skip: page * take,
      sort: 'store',
      order: 'true',
    };
    try {
      let response = await GetReport({params: params, body: body});
      setReports(response);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };
  const showEndPicker = () => {
    setShowEnd(true);
  };

  const showStartPicker = () => {
    setShowStart(true);
  };
  const onChangeStartdate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStart(Platform.OS === 'ios');
    setStartDate(currentDate);
  };
  const onChangeEnddate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEnd(Platform.OS === 'ios');
    setEndDate(currentDate);
  };
  useEffect(() => {
    getStores();
    getCouriers();
    getBrands();
  }, []);
  useEffect(() => {
    getReport();
  }, [
    startDate,
    endDate,
    store,
    dateBySelect,
    statusShipping,
    store,
    courier,
    brand,
    page,
    search,
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <RadioButton
          data={dateBy}
          title="Date By"
          onPress={(val) => {
            setDateBySelect(val);
          }}
          selected={dateBySelect}
        />
        <RadioButton
          data={status}
          title="Status"
          onPress={(val) => {
            setStatus(val + 1);
          }}
          selected={statusShipping - 1}
        />
        <View style={styles.section_DatePicker}>
          <DatePicker
            title="Start Date"
            onClickIcon={() => {
              showStartPicker();
            }}
            show={showStart}
            value={startDate}
            onChange={onChangeStartdate}
          />
          <DatePicker
            title="End Date"
            onClickIcon={() => {
              showEndPicker();
            }}
            show={showEnd}
            value={endDate}
            onChange={onChangeEnddate}
          />
        </View>
        <View style={styles.section_DropDown}>
          <Dropdown
            value="Select Store"
            animationDuration={500}
            data={stores}
            fontSize={15}
            dropdownOffset={{top: 0, left: 0}}
            dropdownPosition={0}
            baseColor={colors.text}
            textColor={colors.text}
            selectedItemColor="#33654C"
            containerStyle={[styles.dropDownStyle, {borderColor: colors.text}]}
            onChangeText={(selectValue) => {
              setStore(selectValue);
            }}
          />
          <Dropdown
            value="Select Courier"
            animationDuration={500}
            data={couriers}
            fontSize={15}
            dropdownOffset={{top: 0, left: 0}}
            dropdownPosition={0}
            baseColor={colors.text}
            textColor={colors.text}
            selectedItemColor="#33654C"
            containerStyle={[styles.dropDownStyle, {borderColor: colors.text}]}
            onChangeText={(selectValue) => {
              setCourier(selectValue);
            }}
          />
          <Dropdown
            value="Select Brand"
            animationDuration={500}
            data={brands}
            fontSize={15}
            dropdownOffset={{top: 0, left: 0}}
            dropdownPosition={0}
            baseColor={colors.text}
            textColor={colors.text}
            selectedItemColor="#33654C"
            containerStyle={[styles.dropDownStyle, {borderColor: colors.text}]}
            onChangeText={(selectValue) => {
              setBrand(selectValue);
            }}
          />
        </View>
      </View>
      <View style={{flex: 5}}>
        <View style={styles.section}>
          <View
            style={{
              paddingVertical: 3,
              paddingHorizontal: 5,
              borderBottomWidth: 2,
              marginBottom: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <View>
                <Text style={{color: colors.text}}>
                  Total Count: {reports.totalCount}
                </Text>
                <Text style={{color: colors.text}}>
                  Total Filter: {reports.totalFiltered}
                </Text>
              </View>
              <View>
                <Text style={{color: colors.text}}>
                  Total Package: {reports.totalPackage}
                </Text>
                <Text style={{color: colors.text}}>
                  Total Qty: {reports.totalQty}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 3,
              }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Button
                  icon={<Icon name="refresh" color="#8ed9f5" size={20} />}
                  onPress={() => {
                    getReport();
                    setPage(0);
                  }}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="search"
                  color={colors.text}
                  size={20}
                  style={{
                    padding: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />

                <TextInput
                  placeholder="Search"
                  style={[styles.textSearch, {color: colors.text, width: 250}]}
                  onChangeText={(val) => {
                    setSearch(val);
                    setPage(0);
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <RenderListItem
            data={reports}
            isLoading={isLoading}
            viewPage={page}
            take={take}
            changeUp={() => {
              if (page + 1 < reports.totalFiltered / take) setPage(page + 1);
            }}
            changeDown={() => {
              if (page > 0) setPage(page - 1);
            }}
            navigation={navigation}
          />
        </View>
      </View>
    </View>
  );
}
