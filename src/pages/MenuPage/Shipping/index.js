/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Shipping from './ShippingPage';
import DetailShipping from './DetailShipping';


const ShippingStack = createStackNavigator();

const ShippingStackScreen = ({navigation}) => {
  return (
    <ShippingStack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#009387'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <ShippingStack.Screen
        name="Shipping"
        component={Shipping}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={30}
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <ShippingStack.Screen
        name="DetailShipping"
        component={DetailShipping}
        options={{ title:'Detail Shipping'}}
        />
    </ShippingStack.Navigator>
  );
};

export default ShippingStackScreen;
