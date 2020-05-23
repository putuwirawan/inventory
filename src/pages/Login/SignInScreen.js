/* eslint-disable prettier/prettier */
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from '../../componets/context';
import Users from '../../models/Users';
import qs from 'qs';
import {useTheme} from '@react-navigation/native';

const SignInScreen = ({navigation}) => {
    const {colors} = useTheme();
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const {signIn} = React.useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };
  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };
  const handlePasswordChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const loginHandle = async (username, password) => {
    const foundUser = Users.filter((item) => {
      return username === item.username && password === item.password;
    });

    // 'http://inventoryapi.planetsurf.id/token
    await fetch('http://inventoryapi.planetsurf.id/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body: 'grant_type=password&username=administrator&password=Omnamahshiv4y@',
      body: qs.stringify({
        grant_type: 'password',
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((responJson) => {
        if (responJson.access_token) {
          signIn(responJson);
        } else {
          Alert.alert('Wrong Input!', responJson.error_description.toString(), [
            {text: 'Okay'},
          ]);
          return;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    if (data.username.length === 0 && data.password.length === 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or Password field cannot be empty',
        [{text: 'Okay'}],
      );
      return;
    }

    // if (foundUser.length === 0) {
    //   Alert.alert('Invalid User!', 'Username or Password is incorrect', [
    //     {text: 'Okay'},
    //   ]);
    //   return;
    // }
    // signIn(foundUser);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="Light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}> WelCome </Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={[styles.footer,{backgroundColor:colors.background}]} useNativeDriver={true}>
        <Text style={[styles.text_fotter,{color:colors.text}]}> Username </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Your Username"
            style={[styles.textInput,{color:colors.text}]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long
            </Text>
          </Animatable.View>
        )}
        <Text style={[styles.text_fotter, {marginTop: 35, color:colors.text}]}> Password </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            secureTextEntry={data.secureTextEntry ? true : false}
            placeholder="Your Password"
            style={[styles.textInput,{color:colors.text}]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>

            {data.secureTextEntry ? (
              <Feather name="eye-off" color="green" size={20} />
            ) : (
              <Feather name="eye" color="red" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 6 characters long
            </Text>
          </Animatable.View>
        )}
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle(data.username, data.password);
            }}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text style={[styles.textSign, {color: '#fff'}]}> Sign In </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={[
              styles.signIn,
              {borderColor: '#009387', borderWidth: 1, marginTop: 15},
            ]}>
            <Text style={[styles.textSign, {color: '#009387'}]}> Sign Up </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 60,
  },
  text_fotter: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {color: '#05375a', fontSize: 30, fontWeight: 'bold'},
  text: {color: 'grey', marginTop: 5},
  button: {alignItems: 'center', marginTop: 50},
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {fontSize: 18, fontWeight: 'bold'},
  errorMsg: {fontSize: 13, color: 'red'},
});
