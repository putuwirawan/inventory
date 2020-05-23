import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useTheme,
  Avatar,
  Title,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {AuthContext} from '../../componets/context';
import AsyncStorage from '@react-native-community/async-storage';

export default function DrawerContent(props) {
  const [userLogin, setUserLogin] = React.useState(null);
  const paperTheme = useTheme();
  const {signOut, toggleTheme} = React.useContext(AuthContext);

  const getUserLogin = async () => {
    const user = await AsyncStorage.getItem('username');
    setUserLogin(user);
  };

  useEffect(() => {
    getUserLogin();
  }, []);
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={[styles.drawerContent]}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={require('../../assets/Icons/User.png')}
                size={50}
              />

              <View style={{marginLeft: 15}}>
                <Title style={styles.title}>{userLogin}</Title>
                {/* <Caption style={styles.caption}>@ajus</Caption> */}
              </View>
            </View>
            {/* <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  80
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>

              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  100
                </Paragraph>
                <Caption style={styles.caption}>Follower</Caption>
              </View>
            </View> */}
          </View>
          <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-box-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />

            <DrawerItem
              icon={({color, size}) => (
                <Icon name="car" color={color} size={size} />
              )}
              label="Shipping"
              onPress={() => {
                props.navigation.navigate('Shipping');
              }}
            />
          </Drawer.Section>

          <Drawer.Section title="Preference">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign-Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {flex: 1},
  userInfoSection: {padding: 20},
  title: {fontSize: 17, marginTop: 3, fontWeight: 'bold'},
  caption: {fontSize: 14, lineHeight: 14},
  row: {marginTop: 20, flexDirection: 'row', alignItems: 'center'},
  section: {flexDirection: 'row', alignItems: 'center', marginRight: 15},
  paragraph: {fontWeight: 'bold', marginRight: 3},
  drawerSection: {marginTop: 15},
  bottomDrawerSection: {
    marginBottom: 15,
    borderBottomColor: '#ACE6D8',
    borderTopWidth: 1,
    borderTopColor: '#A2C6BD',
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
