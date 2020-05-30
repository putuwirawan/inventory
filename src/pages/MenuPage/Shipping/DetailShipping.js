import React from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import styles from './Style';
import moment from 'moment';

export default function DetailShipping({route, navigation}) {
  const {colors} = useTheme();
  const {itemDetail} = route.params;
  const dataDo = itemDetail.DeliveryOrders;
  const nDate = itemDetail.DeliveryDate;

  const ConvertDate = (dateTime) => {
    const date = moment(dateTime)
      .utcOffset('+08:00')
      .format('DD/MM/yyy');
    return date;
  };
  const ConvertDateTime = (dateTime) => {
    const date = moment(dateTime)
      .utcOffset('+08:00')
      .format('DD/MM/yyy hh:mm:ss a');
    return date;
  }; 
  const RenderItemDo = ({item, index}) => {
    return (
      <View key={index}>
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
          <Text style={{fontSize: 14, color: colors.text}}>DeliveryDate :</Text>
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
          <Text style={{fontSize: 14, color: colors.text}}>ReceivedDate:</Text>
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
              <Text style={{fontSize: 14, color: colors.text}}>Courier :</Text>
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
          keyExtractor={(item) => item.name}
        />
      </SafeAreaView>
    </View>
  );
}
