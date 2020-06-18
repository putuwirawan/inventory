import React from 'react';
import {View, Text} from 'react-native';
import * as GlobalFunction from '../../../assets/Helper/GlobalFunction';
import {useTheme} from '@react-navigation/native';

const ListStyle = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#9582bf',
        paddingHorizontal: 5,
      }}>
      <Text
        style={{
          fontSize: 17,
          fontStyle: 'italic',
          fontWeight: '600',
          color: props.textColors,
        }}>
        {props.name}
      </Text>
      <Text style={{fontWeight: '600', color: props.textColors}}>
        {props.value}
      </Text>
    </View>
  );
};

export default function DetailReport({route}) {
  const {itemDetail} = route.params;
  const {colors} = useTheme();
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          fontSize: 20,
          fontStyle: 'italic',
          fontWeight: 'bold',
          color: colors.text,
        }}>
        {itemDetail.ShippingNumber}
      </Text>
      <ListStyle
        name="Store"
        value={itemDetail.Store}
        textColors={colors.text}
      />
      <ListStyle
        name="Brand"
        value={itemDetail.Brand}
        textColors={colors.text}
      />
      <ListStyle
        name="Delivery OrderDoc"
        value={itemDetail.DeliveryOrderDoc}
        textColors={colors.text}
      />
      <ListStyle
        name="Purchase OrderDoc"
        value={itemDetail.PurchaseOrderDoc}
        textColors={colors.text}
      />
      <ListStyle
        name="Sales OrderDoc"
        value={itemDetail.SalesOrderDoc}
        textColors={colors.text}
      />
      <ListStyle
        name="DeliveryDate"
        value={GlobalFunction.toLocalDate(itemDetail.DeliveryDate)}
        textColors={colors.text}
      />
      <ListStyle
        name="EstArrivalDate"
        value={GlobalFunction.toLocalDate(itemDetail.EstArrivalDate)}
        textColors={colors.text}
      />
      <ListStyle
        name="Courier"
        value={itemDetail.Courier}
        textColors={colors.text}
      />
      <ListStyle
        name="ShipmentMethod"
        value={itemDetail.ShipmentMethod == 1 ? 'Air' : 'Land'}
        textColors={colors.text}
      />
      <ListStyle
        name="Qty"
        value={`${itemDetail.Qty} Pcs`}
        textColors={colors.text}
      />
      <Text style={{padding: 10, color: colors.text}}>Remark :</Text>

      <View style={{flex: 1, paddingHorizontal: 15, color: colors.background}}>
        <Text style={{color: colors.text}}>{itemDetail.DocumentRemarks}</Text>
      </View>
    </View>
  );
}
