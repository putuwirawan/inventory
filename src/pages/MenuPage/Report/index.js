/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Report from './ReportPage';
import DetailReport from './DetailReport';

const ReportStack = createStackNavigator();

const ReportStackScreen = ({navigation}) => {
  return (
    <ReportStack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#009387'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <ReportStack.Screen
        name="Report"
        component={Report}
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
      <ReportStack.Screen
        name="DetailReport"
        component={DetailReport}
        options={{ title:'Detail Shipping'}}
        />
    </ReportStack.Navigator>
  );
};

export default ReportStackScreen;
