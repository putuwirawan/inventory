import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

import styles from './Style';

export default function RadioButtonx(props) {
    const {colors} = useTheme();
  return (
    <View style={{height:35}}>
      <View
        style={[styles.section_Radio,{borderColor: colors.text,}]}>
        <View
          style={{
            alignItems: 'flex-start',
            height: 15,
            justifyContent: 'center',
            flex: 1,
          }}>
          <Text
            style={[
              styles.textSubHeader,
              {alignContent: 'center', color: colors.text},
            ]}>
            {props.title}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            height: 15,
            justifyContent: 'center',
          }}>
          <RadioForm
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={colors.text}
            buttonSize={10}
            buttonOuterSize={20}
            animation={true}>
            {props.data.map((obj, index) => (
              <RadioButton key={index}>
                <RadioButtonInput
                  obj={obj}
                  index={index}
                  isSelected={props.selected === index}
                  buttonSize={10}
                  buttonOuterSize={20}
                  buttonInnerColor={colors.text}
                  buttonOuterColor={
                    props.selected === index ? '#2196f3' : colors.text
                  }
                  buttonWrapStyle={{marginLeft: 20}}
                  buttonStyle={{}}
                  onPress={props.onPress}
                />
                <RadioButtonLabel
                  obj={obj}
                  onPress={props.onPress}
                  index={index}
                  labelStyle={{fontSize: 15, color: colors.text}}
                  labelWrapStyle={{marginLeft: 5}}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>
      </View>
    </View>
  );
}
