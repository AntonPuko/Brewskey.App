import * as React from 'react';
import {
  DrawerNavigator,
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';

import HomeScreen from './screens/HomeScreen';
import MyLocationsScreen from './screens/MyLocationsScreen';

// todo login should be own stacknavigator with login/register screens
/* eslint-disable sorting/sort-object-props */
const rootRouter = StackNavigator(
  {
    splash: { screen: SplashScreen },
    login: { screen: LoginScreen },
    main: {
      screen: DrawerNavigator({
        home: { screen: HomeScreen },
        myLocations: { screen: MyLocationsScreen },
      }),
    },
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);

export default rootRouter;
