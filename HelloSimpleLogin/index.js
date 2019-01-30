/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry,BackHandler,Platform} from 'react-native';
import {name as appName} from './app.json';
import NaviModule from './NaviModule.js';

AppRegistry.registerComponent(appName, () => NaviModule);
