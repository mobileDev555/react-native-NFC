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
    ActivityIndicator,
  } from 'react-native'
import glamorous from 'glamorous-native';
import {connect} from 'react-redux'
import NfcManager, {Ndef, NfcTech, ByteParser, NfcAdapter} from 'react-native-nfc-manager'

import constants from '../../constants'
import CustomStyle from '../Component/CustomStyle'
import Api from '../../../utils/Api'

import 
  {
    Container,
  } from '../Component'
import Scanner          from './Scanner'
import UIDController    from './UID'
import ActionSuccess    from './ActionSuccess'
import ActionFailed    from './ActionFailed'

class RegisterScan extends React.Component {

  state = {
    gender: 'Male',
    duration: '00:30',
    scanning: true,
    step: 0,
    uid: undefined
  }

  changeGender(value) {
    this.setState({gender: value})
  }

  changeDuration(value) {
    this.setState({duration: value})
  }

  nextStep(value) {
    this.setState({step: value})
  }

  getUID(value) {
    this.setState({uid: value})
  }

  cancel() {
    this.props.navigation.pop()
  }

  render() {
    const {gender, duration, scanning, uid, step} = this.state
    return (
      <Container>
        {
          step === 0 ?
            <Scanner 
              gender = {gender} duration = {duration} scanning = {scanning} 
              changeDuration = {(value) => this.changeDuration(value)}
              changeGender = {(value) => this.changeGender(value)}
              nextStep = {(value) => this.nextStep(value)}
              getUID = {(value) => this.getUID(value)}
              navigation = {this.props.navigation}
            />
            :
            step === 1 ?
            <UIDController 
              gender = {gender} duration = {duration} uid = {uid}
              changeDuration = {(value) => this.changeDuration(value)}
              changeGender = {(value) => this.changeGender(value)}
              nextStep = {(value) => this.nextStep(value)}
            />
            :step === 2?
            <ActionSuccess 
              gender = {gender}
              changeDuration = {(value) => this.changeDuration(value)}
              nextStep = {(value) => this.nextStep(value)}
              navigation = {this.props.navigation}
            />
            :
            <ActionFailed 
              gender = {gender}
              changeDuration = {(value) => this.changeDuration(value)}
              nextStep = {(value) => this.nextStep(value)}
              navigation = {this.props.navigation}
            />
        }
      </Container>
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
)(RegisterScan);

const styles = StyleSheet.create({
  mainView: {
    width: '100%', 
    flex: 1, 
    paddingBottom: 30, 
    flexDirection: 'column', 
    justifyContent: 'flex-start', 
    alignItems: 'center'
  },
  BottomView: {
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 28,
  },
  selectView: {
    width: '100%',
    flexDirection: 'column',
    marginTop: 50,
  },
  selectRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  scanView: {
    width: '50%',
    paddingVertical: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  }
})