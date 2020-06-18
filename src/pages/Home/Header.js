import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {Image} from 'react-native-elements';

export default function Header() {
  return (
    <View style={styles.container_header}>
      <View style={styles.container_logo}>
        <Image
          source={require('../../assets/Images/logo.png')}
          resizeMode="stretch"
          style={{width: 100, height: 110}}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View style={styles.container_text}>
        <Image
          resizeMode="stretch"
          source={require('../../assets/Images/tulisanPs.png')}
          style={{width: 300, height: 30}}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_header: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#303630',
    justifyContent: 'space-between',
  },
  container_logo: {flex: 2, justifyContent: 'flex-end', paddingTop: 10},
  container_text:{flex: 1, justifyContent: 'center'}
});
