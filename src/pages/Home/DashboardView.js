import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function DashboardView(props) {
  return (
    <View
      style={{
        width: '30%',
        height: 140,
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : '#285751',
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'center',
        paddingTop:5
      }}>
      <View
        style={{
          height: 50,
          marginBottom: 5,
          paddingBottom: 5,
          borderBottomWidth: 1,
          borderBottomColor: '#f8674d',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontFamily: 'arial-black',
          }}>
          {props.name}
        </Text>
        <Text>{props.date}</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View
          style={{
            flex: 1,
            padding: 5,
            borderWidth: 1,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: props.color ? props.color : '#a1f088',
          }}>
          <LinearGradient colors={['#8acfc2', '#01ab9d']} style={styles.signIn}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {props.qty} PCS
            </Text>
          </LinearGradient>
        </View>
        <View
          style={{
            flex: 1,
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#e0ef86', fontWeight: 'bold', fontSize: 17}}>
            {props.koli} Koli
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signIn: {
    width: 100,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
});
