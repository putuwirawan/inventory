import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './Style';

export default function DatePicker(props) {
  return (
    <View style={styles.container_DropDown}>
      <View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: '#73035c'}}>
            {props.title}
          </Text>
        </View>
        <View style={styles.calenderStyle}>
          <Text style={styles.textCalender}>
            {moment(props.value).format('DD/MM/yyy')}
          </Text>
          <Icon
            name="calendar"
            color="#691654"
            size={20}
            onPress={props.onClickIcon}
          />
        </View>
      </View>

      {props.show && (
        <DateTimePicker
          testID={props.title}
          value={props.value}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={props.onChange}
        />
      )}
    </View>
  );
}
