/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Navigator from './navigation/index'
import {Provider} from 'react-redux'

import store from './store/store'

export default class App extends Component{
  render() {
    return (
      <Provider store = {store}>
        <Navigator />
      </Provider>
    );
  }
}
