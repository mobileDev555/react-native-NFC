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
    AsyncStorage
  } from 'react-native'
import glamorous from 'glamorous-native';
import {connect} from 'react-redux'
import NfcManager, {Ndef, NfcTech, ByteParser, NfcAdapter} from 'react-native-nfc-manager'

import constants from '../constants'
import CustomStyle from './Component/CustomStyle'
import Api from '../../utils/Api'

import 
  {
    Container,
  } from './Component'

class StandardScan extends React.Component {
  constructor(props){
    super(props)
  }

  state = {
    scanning: true,
    nfcState: true,
    uid: undefined
  }

  componentDidMount() {
    this.nfcControll()
    // this.successed('123')
  }

  async successed(value) {
    const strHistory = await AsyncStorage.getItem('History')
    const history = JSON.parse(strHistory)
    const nowDate = new Date();
    history.push({uid: value, date: `${nowDate.getMonth()} ${nowDate.getDate()} ${nowDate.getFullYear()} ${nowDate.getHours()}:${nowDate.getMonth()}:${nowDate.getSeconds()}`})
    await AsyncStorage.setItem('History', JSON.stringify(history))
    this.setState({uid: value})
    this.setState({scanning: false})
  }

  async nfcControll() {
    try{
      const NFCSupports = await NfcManager.isSupported(NfcTech.MifareClassic)
      console.log('supprot', nfc)
      if(NFCSupports) {
        const NFCStatus = await NfcManager.isEnabled()
        if(NFCStatus) {
          NfcManager.start()
          .then(result => {
              result && alert('start success')
          })
          .catch(error => {
              // this.setState({supported: false});
          })
          
          NfcManager.registerTagEvent(
            tag => {
              // alert('Tag Discovered')
              console.log('tag', tag)
              this.successed(tag.id)
            },
            'Hold your device over the tag',
            {
              invalidateAfterFirstRead: true,
              isReaderModeEnabled: true,
              readerModeFlags:
                NfcAdapter.FLAG_READER_NFC_A | NfcAdapter.FLAG_READER_SKIP_NDEF_CHECK,
            },
          );
        }
        else{
          alert('Please enable the NFC')
        }
      }
      else{
        alert(`This device doesn't supports NFC technology`)
      }
    }
    catch(err){
      alert('Somethings went wrong')
    }
  }

  cancel() {
    this.props.navigation.pop()
  }
  
  render() {
    const {scanning, nfcState} = this.state
    return (
      <Container>
        {
          scanning ?
          <View style = {{flex: 1, width: '100%'}}>
            <View style={{ flex: 1, width: '100%', marginTop: 50}}>
              <View style = {styles.ScanningBoard}>
                {
                  scanning && <ActivityIndicator color = '#FF5800' size = 'large' />
                }
                <Text style = {{paddingTop: 20}}>Scanning</Text>
              </View>
            </View>
            <View style = {styles.BottomView}>
              <TouchableOpacity style = {CustomStyle.longNarrowButton} onPress = {() => this.cancel()}>
                <Text style = {CustomStyle.whiteButtonTitle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
          :
          nfcState ?
          <View style = {{flex: 1, width: '100%'}}>
            <View style={{ flex: 1, width: '100%', marginTop: 50}}>
              <View style = {{...styles.mainView, alignItems: 'center'}}>
                <Text style = {{...CustomStyle.mainTitle, color: constants.Colors.whatsApp}}>Successed !</Text>
              </View>
              <View style = {{...styles.mainView, alignItems: 'flex-start'}}>
                <Text style = {CustomStyle.mainTitle}>Info</Text>
                <View style = {styles.infoRow}>
                  <Text style = {{...styles.infoText}}>UID</Text>
                  <Text>{this.state.uid}</Text>
                </View>
              </View>
            </View>
            <View style = {styles.BottomView}>
              <TouchableOpacity style = {CustomStyle.longNarrowButton} onPress = {() => this.props.navigation.pop()}>
                <Text style = {CustomStyle.whiteButtonTitle}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
          :
          <View style = {{flex: 1, width: '100%'}}>
            <View style={{ flex: 1, width: '100%', marginTop: 50,}}>
              <View style = {{...styles.mainView, alignItems: 'center'}}>
                <Text style = {{...CustomStyle.mainTitle, color: constants.Colors.red}}>Failed</Text>
              </View>
              <View style = {{...styles.mainView, alignItems: 'center'}}>
                <Text style = {CustomStyle.mainTitle}>NFC chip not recognized</Text>
              </View>
            </View>
            <View style = {styles.BottomView}>
              <TouchableOpacity style = {CustomStyle.longNarrowButton} onPress = {() => this.cancel()}>
                <Text style = {CustomStyle.whiteButtonTitle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
          
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
)(StandardScan);

const styles = StyleSheet.create({
  ScanningBoard: {
    width: '100%', 
    flex: 1, 
    paddingBottom: 30, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  BottomView: {
    width: '100%', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 28,
  },
  mainView: {
    paddingVertical: 28,
    width: '100%', 
    flexDirection: 'column',
    justifyContent: 'center',
  },
  infoRow: {
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 28,
    alignItems: 'center',
    marginTop: 28,
  },
  infoText: {
    fontSize: 18,
    color: 'black',
  }
})