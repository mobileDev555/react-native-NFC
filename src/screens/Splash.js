import React, { Component } from 'react'
import 
  {
    View, 
    Text, 
    Image,
    ActivityIndicator,
    AsyncStorage
  } from 'react-native'

import Api from '../../utils/Api'
import constants from '../constants'

import {connect} from 'react-redux'
import OneSignal from 'react-native-onesignal';

import 
  {
    CustomStyle
  } from './Component'


class SplashScreen extends React.Component {
  constructor(props) {
    super(props)
    OneSignal.init("308fa56a-c0fb-41d1-bcaf-816656cfdab5");
    OneSignal.configure(); 	// triggers the ids event
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('ids', this.onIds);
  }
  state = {

  }

  componentWillUnmount() {
    // OneSignal.removeEventListener('received', this.onReceived);
    // OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {

  }

  onIds(device) {

  }

  async loading() {
    const history = await AsyncStorage.getItem('History')
    history === null && AsyncStorage.setItem('History', JSON.stringify([]))
    setTimeout(() => {
      this.props.navigation.navigate('NFCController')
    }, 500);
  }

  componentWillMount() {
    this.loading()
  }

  render() {
    return (
      <View style = {{width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style = {CustomStyle.splashTitle}>NFC</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {

  }
}

const mapDispatchToProps = dispatch => ({
  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashScreen);