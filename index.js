/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {YellowBox} from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings([
  'componentWillReceiveProps',
  'componentWillUpdate',
  'Require cycle',
]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf('componentWillReceiveProps') <= -1) {
    _console.warn(message);
  }
  if (message.indexOf('componentWillUpdate') <= -1) {
    _console.warn(message);
  }
  if (message.indexOf('Require cycle') <= -1) {
    _console.warn(message);
  }
};

AppRegistry.registerComponent(appName, () => App);
