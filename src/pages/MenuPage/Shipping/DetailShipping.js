import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {useTheme} from '@react-navigation/native';
import styles from './Style';
import moment from 'moment';

import * as ApiHelper from './ApiHelper';

export default function DetailShipping({route}) {
  const {colors} = useTheme();
  const {itemDetail} = route.params;
  const {shippingStatus} = route.params;
  const {navigations} = route.params;
  const dataDo = itemDetail.DeliveryOrders;
  const nDate = itemDetail.DeliveryDate;

  const [data, setData] = useState({
    showModal: false,
    koli: 0,
    isvalidInput: true,
    errorMessage: '',
    disableConfirm: true,
  });

  const ConvertDate = (dateTime) => {
    const date = moment(dateTime).utcOffset('+08:00').format('DD/MM/yyy');
    return date;
  };
  const ConvertDateTime = (dateTime) => {
    const date = moment(dateTime)
      .utcOffset('+08:00')
      .format('DD/MM/yyy hh:mm:ss a');
    return date;
  };

  const textInputChange = (val) => {
    let newVal = '';
    let msg = '';
    let numbers = '0123456789';

    for (var i = 0; i < val.length; i++) {
      if (numbers.indexOf(val[i]) > -1) {
        newVal = newVal + val[i];
      } else {
        // your call back function
        msg = 'Enter Valid Number';
      }
    }
    if (msg == '' && Number(val) > 0) {
      setData({
        ...data,
        koli: Number(val),
        isvalidInput: true,
        disableConfirm: false,
      });
    } else {
      setData({
        ...data,
        koli: 0,
        isvalidInput: false,
        errorMessage: msg,
        disableConfirm: true,
      });
    }
  };
  const handleValidInput = (val) => {
    newText = '';
    let msg = '';
    let numbers = '0123456789';

    for (var i = 0; i < val.length; i++) {
      if (numbers.indexOf(val[i]) > -1) {
        newText = newText + val[i];
      } else {
        // your call back function
        setData({
          ...data,
          isvalidInput: false,
          errorMessage: msg,
        });
      }
    }
    setData({
      ...data,
      koli: Number(newText),
    });
  };

  const getDataPrint = async (koli) => {
    try {
      let response = await ApiHelper.ReceiveShipping({
        params: {id:itemDetail.Id,koli:koli}
      });
      if (response.message == 'Success') {
        setData({
          ...data,
          koli: 0,
          showModal: false,
          isvalidInput: true,
          errorMessage: '',
          disableConfirm: true,
        });

        navigations.navigate('PrintPage', {props: response,shippingStatus:shippingStatus});
      }
    } catch (error) {
      Alert.alert('Internal Error, Data Not Save');
    }
  };
  const RePrint = () => {
    getDataPrint(itemDetail.TotalPackageReceived)
  };
  const RenderItemDo = ({item, index}) => {
    return (
      <View key={item.Id}>
        <View style={[styles.action]}>
          <View style={{flex: 1}}>
            <Text style={{color: colors.text}}>Package : {index + 1}</Text>
            <Text style={{color: colors.text}}>SO: {item.SalesOrderDoc}</Text>
            <Text style={{color: colors.text}}>
              DO: {item.DeliveryOrderDoc}
            </Text>
            <Text style={{color: colors.text}}>
              PO: {item.PurchaseOrderDoc}
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 5}}>
            <Text
              style={[
                styles.textSubHeader,
                {color: colors.text, fontStyle: 'italic'},
              ]}>
              {item.Brand}
            </Text>

            <Text style={{color: colors.text}}> {item.Qty} Pcs</Text>
            <Text style={{color: colors.text}}>{item.Weight} Kg</Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#3db8d1',
            marginBottom: 5,
            paddingBottom: 5,
          }}>
          <Text
            style={{
              color: '#369FF0',
              fontWeight: 'bold',
              fontSize: 17,
              fontStyle: 'italic',
            }}>
            {' '}
            Remark :{' '}
          </Text>
          <Text style={{color: colors.text}}> {item.DocumentRemarks}</Text>
        </View>
      </View>
    );
  };
  const ShowDetail = () => {
    return (
      <View style={styles.container} key={itemDetail.Id}>
        <View style={{padding: 10}}>
          <View style={styles.listDetail}>
            <Text style={[styles.textHeader, {color: colors.text}]}>
              Shipping Number :
            </Text>
            <Text style={[styles.textHeader, {color: colors.text}]}>
              {itemDetail.ShippingNumber}
            </Text>
          </View>
          <View style={styles.listDetail}>
            <Text style={[styles.textSubHeader, {color: colors.text}]}>
              To Store :
            </Text>
            <Text style={[styles.textSubHeader, {color: colors.text}]}>
              {itemDetail.Store}
            </Text>
          </View>
          <View style={styles.listDetail1}>
            <Text style={{fontSize: 14, color: colors.text}}>
              DeliveryDate :
            </Text>
            <Text style={{fontSize: 14, color: colors.text}}>
              {ConvertDate(itemDetail.DeliveryDate)}
            </Text>
          </View>
          <View style={styles.listDetail1}>
            <Text style={{fontSize: 14, color: colors.text}}>
              Est ArrivalDate:
            </Text>
            <Text style={{fontSize: 14, color: colors.text}}>
              {ConvertDate(itemDetail.EstArrivalDate)}
            </Text>
          </View>
          <View style={styles.listDetail1}>
            <Text style={{fontSize: 14, color: colors.text}}>
              ReceivedDate:
            </Text>
            <Text style={{fontSize: 14, color: colors.text}}>
              {itemDetail.ReceivedDateTime
                ? ConvertDateTime(itemDetail.ReceivedDateTime)
                : null}
            </Text>
          </View>
          <View style={styles.listDetail1}>
            <Text style={{fontSize: 14, color: colors.text}}>Lead Time:</Text>
            <Text style={{fontSize: 14, color: colors.text}}>
              {itemDetail.LeadTime} Day
            </Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={styles.box}>
              <View style={styles.listDetail1}>
                <Text style={{fontSize: 14, color: colors.text}}>
                  Courier :
                </Text>
                <Text style={{fontSize: 14, color: colors.text}}>
                  {itemDetail.Courier}
                </Text>
              </View>
              <View style={styles.listDetail1}>
                <Text style={{fontSize: 14, color: colors.text}}>Sender :</Text>
                <Text style={{fontSize: 14, color: colors.text}}>
                  {itemDetail.Sender}
                </Text>
              </View>
              <View style={styles.listDetail1}>
                <Text style={{fontSize: 14, color: colors.text}}>
                  Shipment Method :
                </Text>
                <Text style={{fontSize: 14, color: colors.text}}>
                  {itemDetail.StrShipmentMethod}
                </Text>
              </View>
              <View style={styles.listDetail1}>
                <Text style={{fontSize: 14, color: colors.text}}>
                  ReceivedBy :
                </Text>
                <Text style={{fontSize: 14, color: colors.text}}>
                  {itemDetail.ReceivedBy}
                </Text>
              </View>
            </View>
            <View style={styles.box}>
              <View style={styles.listDetail1}>
                <Text style={{fontSize: 14, color: colors.text}}>Qty:</Text>
                <Text style={{fontSize: 14, color: colors.text}}>
                  {itemDetail.TotalQty} Pcs
                </Text>
              </View>
              <View style={styles.listDetail1}>
                <Text style={{fontSize: 14, color: colors.text}}>Weigh:</Text>
                <Text style={{fontSize: 14, color: colors.text}}>
                  {itemDetail.TotalWeight} Kg
                </Text>
              </View>
              <View style={styles.listDetail1}>
                <Text style={{fontSize: 14, color: colors.text}}>
                  Total Package:
                </Text>
                <Text style={{fontSize: 14, color: colors.text}}>
                  {itemDetail.TotalPackage}
                </Text>
              </View>
              <View style={styles.listDetail1}>
                <Text style={{fontSize: 14, color: colors.text}}>
                  Package Received :
                </Text>
                <Text style={{fontSize: 14, color: colors.text}}>
                  {itemDetail.TotalPackageReceived}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <SafeAreaView style={styles.container}>
          <FlatList
            data={dataDo}
            renderItem={RenderItemDo}
            keyExtractor={(item) => item.Id}
          />
        </SafeAreaView>
        {shippingStatus == 1 ? (
          <Button
            title="Receive"
            onPress={() => {
              setData({...data, showModal: true});
            }}
          />
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Button
              stl
              title="Update Receive"
              onPress={() => {
                setData({...data, showModal: true});
              }}
            />
            <Button
              title="Reprint"
              onPress={() => RePrint()}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ShowDetail />
      <Modal visible={data.showModal} transparent={true}>
        <View style={{backgroundColor: '#000000aa', flex: 1}}>
          <View
            style={{
              backgroundColor: colors.background,
              margin: 50,
              padding: 40,
              borderRadius: 15,
            }}>
            <View style={{alignItems: 'center'}}>
              <Input
                placeholder="Enter Koli Receive"
                style={[{color: colors.text}]}
                autoCapitalize="none"
                onChangeText={(val) => textInputChange(val)}
                onEndEditing={(e) => handleValidInput(e.nativeEvent.text)}
                placeholderTextColor={colors.text}
                keyboardType={'numeric'}
                inputStyle={{color: colors.text}}
              />
              <Text
                style={{
                  color: '#eb5e34',
                  fontStyle: 'italic',
                  marginBottom: 10,
                }}>
                {data.isvalidInput ? '' : data.errorMessage}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Button
                type="outline"
                title="Close"
                onPress={() => {
                  setData({
                    ...data,
                    koli: 0,
                    showModal: false,
                    isvalidInput: true,
                    errorMessage: '',
                    disableConfirm: true,
                  });
                }}
              />
              <Button
                disabled={data.disableConfirm}
                type="outline"
                title="Confirm"
                onPress={() => {
                  getDataPrint(data.koli);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
