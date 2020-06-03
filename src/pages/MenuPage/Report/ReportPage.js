import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';


import styles from './Style';
import RadioButtonx from './RadioButton'

export default function Report() {
  const {colors} = useTheme();
  const dateBy = [
    {label: 'Delivery', value: 0},
    {label: 'Est Arrival', value: 1},
  ];
  const [startDate, setStartDate] = useState(new Date(1598051730000));
  const [endtDate, setEndDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [dateBySelect, setDateBySelect] = useState(0);  

  return (
    <View style={styles.container}>
      <RadioButtonx
        data={dateBy}
        title="Date By"
        onPress={(val) => {
          setDateBySelect(val);
        }}
        selected={dateBySelect}
      />
      <View style={{flex:1}}>
        <Text style={{color: colors.text}}>{dateBySelect}</Text>
      </View>
    </View>
  );
}
