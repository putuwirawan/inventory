import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View, ActivityIndicator, YellowBox} from 'react-native';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

import AsyncStorage from '@react-native-community/async-storage';

import {AuthContext} from './componets/context';
import MainTabScreen from './pages/MainTabscreen';
import HomeStackScreen from './pages/Home'
import DrawerContent from './pages/Drawer';
import LoginStackScreen from './pages/Login';
import ProfileStackScreen from './pages/MenuPage/Profile';
import ShippingStackScreen from './pages/MenuPage/Shipping';
import ReportStackScreen from './pages/MenuPage/Report';
import {constant} from 'lodash';

const Drawer = createDrawerNavigator();

function App() {
  YellowBox.ignoreWarnings([
    'Require cycle:',
    'Warning: componentWillUpdate has been renamed',
    'Warning: componentWillReceiveProps has been renamed',
    'Non-serializable values were found in the navigation state',
  ]);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const isCancelled = React.useRef(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );
  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        const userToken = String(foundUser.access_token);
        const userName = String(foundUser.username);
        try {
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('userName', userName);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('userName');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {},

      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    [],
  );

  const checkUser = async () => {
    let userToken = null;

    if (!isCancelled.current) {
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'REGISTER', token: userToken});
    }
  };
  useEffect(() => {
    checkUser();
    return () => {
      isCancelled.current = true;
    };
    // setTimeout(async () => {
    //   let userToken = null;
    //   try {
    //     userToken = await AsyncStorage.getItem('userToken');
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   dispatch({type: 'REGISTER', token: userToken});
    // }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userToken !== null ? (
            <Drawer.Navigator
              drawerContent={(props) => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomePage" component={HomeStackScreen} />
              <Drawer.Screen name="Profile" component={ProfileStackScreen} />
              <Drawer.Screen name="Shipping" component={ShippingStackScreen} />
              <Drawer.Screen name="Report" component={ReportStackScreen} />
            </Drawer.Navigator>
          ) : (
            <LoginStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}

export default App;
