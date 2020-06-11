import React from 'react';
import {View, Text} from 'react-native';
import * as GlobalFunction from '../../../assets/Helper/GlobalFunction'
const ListStyle = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#9582bf',
        paddingHorizontal:5
      }}>
      <Text style={{fontSize:17, fontStyle:'italic',fontWeight:'600',color:colosrs.Text}}>{props.name}</Text>
      <Text style={{fontWeight:'600',color:colosrs.Text}}>{props.value}</Text>
    </View>
  );
};
export default function DetailReport({route}) {
  const {itemDetail} = route.params;
  return (
    <View style={{flex:1}}>
      <Text style={{fontSize:20, fontStyle:'italic',fontWeight:'bold',color:colosrs.Text}}>{itemDetail.ShippingNumber}</Text>
      <ListStyle name="Store" value={itemDetail.Store} />
      <ListStyle name="Brand" value={itemDetail.Brand} />
      <ListStyle name="Delivery OrderDoc" value={itemDetail.DeliveryOrderDoc} />
      <ListStyle name="Purchase OrderDoc" value={itemDetail.PurchaseOrderDoc} />
      <ListStyle name="Sales OrderDoc" value={itemDetail.SalesOrderDoc} />
      <ListStyle name="DeliveryDate" value={GlobalFunction.toLocalDate(itemDetail.DeliveryDate)} />
      <ListStyle name="EstArrivalDate" value={GlobalFunction.toLocalDate(itemDetail.EstArrivalDate)} />
      <ListStyle name="Courier" value={itemDetail.Courier} />
      <ListStyle name="ShipmentMethod" value={itemDetail.ShipmentMethod==1 ? 'Air' : 'Land'} />
      <ListStyle name="Qty" value={`${itemDetail.Qty} Pcs`}  />
      <Text style={{padding:10,color:colosrs.Text}}>Remark :</Text>
      <View style={{flex:1, paddingHorizontal:15,color:colosrs.Text}} >
        <Text  numberOfLines={3} style={{color:colosrs.Text}}>{itemDetail.DocumentRemarks} </Text>
      </View>

    </View>
  );
}
