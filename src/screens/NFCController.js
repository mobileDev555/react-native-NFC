import React, { Component } from 'react'
import 
  {
    View, 
    TouchableOpacity, 
    Text, 
    ScrollView, 
    Image,
    Picker,
    StyleSheet,
  } from 'react-native'
import glamorous from 'glamorous-native';
import {connect} from 'react-redux'
import OneSignal from 'react-native-onesignal';

import constants from '../constants'
import CustomStyle from './Component/CustomStyle'
import Api from '../../utils/Api'

import 
  {
    Container,
  } from './Component'

import {changeResistor} from '../../store/action/index'

class NFCController extends React.Component {
  constructor(props) {
    super(props)
    OneSignal.addEventListener('opened', this.onOpened);
  }

  onOpened = (openResult) => {

    this.props.changeResistor(false)
  }

  render() {
    const {registore} = this.props
    return (
      <Container>
        <View style={{ flex: 1, width: '100%', marginTop: 50}}>
          <View style = {styles.NFCDashBoard}>
            <TouchableOpacity style = {CustomStyle.middleNarrowButton} onPress = {() => this.props.navigation.navigate('StandardScan')}>
              <Text style = {{...CustomStyle.whiteButtonTitle, textAlign: 'center'}}>Standard Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {CustomStyle.middleNarrowButton} onPress = {() => this.props.navigation.navigate('RegisterScan')}>
              <Text style = {{...CustomStyle.whiteButtonTitle, textAlign: 'center'}}>Temporary register</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style = {styles.history}>
          <TouchableOpacity style = {CustomStyle.longNarrowButton} onPress = {() => this.props.navigation.navigate('HistoryScreen')}>
            <Text style = {CustomStyle.whiteButtonTitle}>History</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    registore: state.dataReducer.registore
  }
}

const mapDispatchToProps = dispatch => ({
  changeResistor: (data) => dispatch(changeResistor(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NFCController);

const styles = StyleSheet.create({
  NFCDashBoard: {
    width: '100%', 
    flex: 1, 
    paddingBottom: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-end'
  },
  history: {
    width: '100%', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 28,
  },
})