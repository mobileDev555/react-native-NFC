import React, { Component } from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation'

import constants from '../src/constants'

import 
  { 
    SplashScreen,
    NFCController,
    StandardScan,
    RegisterScan,
    HistoryScreen,
  } from '../src/screens';
import BottomTabs from './BottomTabs'

export default createAppContainer(
  createStackNavigator(
    {
      SplashScreen: SplashScreen,
      NFCController: NFCController,
      StandardScan: StandardScan,
      RegisterScan: RegisterScan,
      HistoryScreen: HistoryScreen,
      
      BottomTabs: BottomTabs
    },
    {
      initialRouteName: 'SplashScreen',
      headerMode: 'none'
    }
  )
)