import React from 'react';
import {View, Text} from 'react-native';
import moment from 'moment';
import * as GlobalFunction from '../../../assets/Helper/GlobalFunction';
import styles from './Style';
import {Image} from 'react-native-elements';
import Barcode from 'react-native-barcode-builder';
export default function Print({route}) {
  const {props} = route.params;
  const {shippingStatus} = route.params;
  return (
    <View style={{flex: 1, backgroundColor: '#000000aa', alignItems: 'center'}}>
      <View
        style={{
          width: 350,
          backgroundColor: '#ffffff',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{alignItems: 'flex-start', marginHorizontal: 10}}>
            {moment(new Date()).local().format('yyyy-MM-DD hh:mm:ss')}
          </Text>
          <Text style={{alignItems: 'flex-end', marginHorizontal: 10}}>
            Document
          </Text>
        </View>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Image
            source={require('../../../assets/Images/tulisanPs.png')}
            useNativeDriver={true}
            resizeMode="stretch"
            style={{width: 200, height: 25}}
          />
          <Text style={styles.textSubHeader}>Received Note</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          {shippingStatus == 1 ? null : (
            <Text style={{fontSize: 20, fontStyle: 'italic'}}>- COPY -</Text>
          )}
        </View>
        <View>
          <View style={styles.action}>
            <Text style={styles.textSubHeader}>Store</Text>
            <Text>{props.store}</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textSubHeader}>Courier</Text>
            <Text>{props.courier}</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textSubHeader}>Shipping Number</Text>
            <Text>{props.shippingNumber}</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textSubHeader}>Receive By</Text>
            <Text>{props.receivedBy}</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textSubHeader}>Date Received</Text>
            <Text>
              {moment
                .utc(props.dateReceived)
                .local()
                .format('yyyy-MM-DD hh:mm:ss')}
            </Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textSubHeader}>Total Pacage Send</Text>
            <Text>{props.totalPackageSent}</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textSubHeader}>Total Pacage Received</Text>
            <Text>{props.totalPackageReceived}</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textSubHeader}>Difference</Text>
            <Text>{props.Difference}</Text>
          </View>
          <View style={styles.action}>
            <Text style={styles.textSubHeader}>Time Dif. From Eta</Text>
            <Text>
              {-GlobalFunction.roundDown(
                props.timeDifferenceFromEta / (60 * 60 * 24),
                0,
              ) - 1}{' '}
              Day
            </Text>
          </View>
          <Barcode
            value={JSON.stringify(props.receivedSalt)}
            format="CODE128"
            width={2}
            height={60}
            text={props.receivedSalt}
          />
        </View>
      </View>
    </View>
  );
}
