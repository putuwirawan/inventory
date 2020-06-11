import moment from 'moment';
import {DeviceInfo} from 'react-native-device-info';

function roundUp(num, precision) {
  precision = Math.pow(10, precision);
  var number = Math.ceil(num * precision) / precision;
  return number;
}
function toLocalDateTime(date) {
  const stilUtc = moment.utc(date);
  var local = moment(stilUtc).local().format('DD/MM/YYYY HH:mm:ss');
  return local;
}
function toLocalDate(date) {
  const stilUtc = moment.utc(date);
  var local = moment(stilUtc).local().format('DD/MM/YYYY');

  return local;
}
const utcDateTime = (dateTime) => {
  const date = moment.utc(dateTime).format('DD/MM/YYYY');
  return date;
};
export {roundUp, toLocalDateTime, toLocalDate, utcDateTime};
