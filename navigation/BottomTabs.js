import React, { Component } from 'react'
import {createBottomTabNavigator, createAppContainer} from 'react-navigation'

import constants from '../src/constants'

import 
  { 
    HomeScreen,
    AboutUs,
  } from '../src/screens/BottomTabs';

const DrawerNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    AboutUs: AboutUs,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;
        } else if (routeName === 'AboutUs') {
          iconName = `info-circle`;
        }
        

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

export default DrawerNavigator;