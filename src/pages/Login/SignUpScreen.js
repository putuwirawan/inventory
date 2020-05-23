/* eslint-disable react-native/no-inline-styles */
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
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useTheme} from '@react-navigation/native';

const SignUpScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [data, setData] = React.useState({
    email: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };
  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };
  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar backgroundColor="#009387" barStyle="Light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Register</Text>
        </View>

        <Animatable.View animation="bounceIn" style={[styles.footer,{backgroundColor:colors.background}]}>
          <Text style={[styles.text_fotter,{color:colors.text}]}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Email"
              style={[styles.textInput,{color:colors.text}]}
              autoCapitalize="none"
              onChange={(val) => textInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : null}
          </View>
          <Text style={[styles.text_fotter, {marginTop: 35, color:colors.text}]}>Password</Text>
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
          <Text style={[styles.text_fotter, {marginTop: 35,color:colors.text}]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={colors.text} size={20} />
            <TextInput
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              placeholder="Your Confirm Password"
              style={[styles.textInput,{color:colors.text}]}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            {data.password === data.confirm_password && data.password.length !== 0 ? (
              <Feather
                name="check-circle"
                color="green"
                size={20}

                style={{marginRight: 15}}
              />
            ) : null}
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.confirm_secureTextEntry ? (
                <Feather name="eye-off" color="green" size={20} />
              ) : (
                <Feather name="eye" color="red" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text style={[styles.textSign, {color: '#fff'}]}>Register</Text>
            </LinearGradient>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}
              style={[
                styles.signIn,
                {borderColor: '#009387', borderWidth: 1, marginTop: 15},
              ]}>
              <Text style={[styles.textSign, {color: '#009387'}]}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

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
    flex: 4,
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
});
