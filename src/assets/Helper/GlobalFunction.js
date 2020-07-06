import moment from 'moment';
import {DeviceInfo} from 'react-native-device-info';

function roundUp(num, precision) {
  precision = Math.pow(10, precision);
  var number = Math.ceil(num * precision) / precision;
  return number;
}
function roundDown(number, decimals) {
  decimals = decimals || 0;
  return ( Math.floor( number * Math.pow(10, decimals) ) / Math.pow(10, decimals) );
}
function toLocalDateTime(date) {
  const stilUtc = moment.utc(date);
  var local = moment(stilUtc).local().format('DD/MM/YYYY HH:mm:ss');
  return local;
}
function toLocalDate(date) {
  const stilUtc = moment(date);
  var local = moment(stilUtc).format('DD/MM/YYYY');
  return local;
}
function toLocalDateOffset(date, offset) {
  const local = moment(date).format('YYYY/MM/DD');
  let nDate = moment(local).format('YYYY/MM/DD');
  if (offset >= 0) {
    nDate = moment(local, 'YYYY/MM/DD')
      .add(offset, 'days')
      .format('YYYY/MM/DD');
  } else {
    nDate = moment(local, 'YYYY/MM/DD')
      .subtract(Math.abs(offset), 'days')
      .format('YYYY/MM/DD');
  }
  return nDate;
}
const utcDateTime = (dateTime) => {
  const date = moment.utc(dateTime).format('DD/MM/YYYY');
  return date;
};
export {roundUp, toLocalDateTime, toLocalDate, utcDateTime, toLocalDateOffset,roundDown};
