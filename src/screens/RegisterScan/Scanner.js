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

import constants from '../../constants'
import CustomStyle from '../Component/CustomStyle'
import Api from '../../../utils/Api'

import 
  {
    Container,
  } from '../Component'


class Scanner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scanning: true,
      uid: undefined
    }
  }

  componentWillMount() {
    console.log('start')
    this.nfcControll()
    // setTimeout(() => {
    //   this.successed('adsfsd')
    // }, 3000);
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
      console.log('register start')
      const NFCSupports = await NfcManager.isSupported(NfcTech.MifareClassic)
      if(NFCSupports) {
        const NFCStatus = await NfcManager.isEnabled()
        if(NFCStatus) {
          NfcManager.start()
          .then(result => {
              // result && alert('start success')
          })
          .catch(error => {
              // this.setState({supported: false});
          })
          console.log('registerTagEvent')
          NfcManager.registerTagEvent(
            tag => {
              console.log('Tag Discovered', tag);
              // alert('Tag Discovered')
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

  changeGender(gender) {
    this.props.changeGender(gender)
  }

  changeDuration(duration) {
    this.props.changeDuration(duration)
  }

  scanning() {

  }

  nextStep() {
    this.props.nextStep(1)
    this.props.getUID(this.state.uid)
  }

  cancel() {
    this.props.navigation.pop()
  }

  render() {
    const {gender, duration} = this.props
    const durationArray = ['00:30','01:00','01:30','02:00','02:30','03:00']
    return (
      <View style = {{width: '100%', flex: 1}}>
        <View style={{ flex: 1, width: '100%', marginTop: 30}}>
          <View style = {styles.mainView}>
            <Text style = {CustomStyle.mainTitle}>Temporary register</Text>
            <View style = {styles.selectView}>
              <View style = {styles.selectRow}>
                <Text style = {{...CustomStyle.mainTitle, fontSize: 16}}>Type</Text>
                <Picker
                  selectedValue={gender}
                  style={{height: 30, width: 150, borderWidth: 1, borderColor: 'black'}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.changeGender(itemValue)
                  }>
                  <Picker.Item label="Male" value="M" />
                  <Picker.Item label="Female" value="F" />
                </Picker>
              </View>
              <View style = {styles.selectRow}>
                <Text style = {{...CustomStyle.mainTitle, fontSize: 16}}>Duration</Text>
                <Picker
                  selectedValue={duration}
                  style={{height: 30, width: 150, borderWidth: 1, borderColor: 'black'}}
                  onValueChange={(itemValue, itemIndex) =>{
                    this.changeDuration(itemValue)
                  }
                  }>
                  {
                    durationArray.map((item) => 
                      <Picker.Item label = {item} value = {item} key = {item} />
                    )
                  }
                </Picker>
              </View>
              <View style = {styles.selectRow}>
                <Text style = {{...CustomStyle.mainTitle, fontSize: 16}}>UID</Text>
                {
                  this.state.scanning ?
                  <View style = {styles.scanView}>
                    <ActivityIndicator color = '#FF5800' size = 'large' />
                    <Text style = {{marginTop: 12}}>NFC Ongoing...</Text>
                  </View>
                  :
                  <View style = {styles.scanView}>
                    <Text style = {{marginTop: 12}}>NFC tag discovered</Text>
                  </View>
                }
              </View>
            </View>
          </View>
        </View>
        <View style = {styles.BottomView}>
          <TouchableOpacity style = {CustomStyle.middleNarrowButton} onPress = {() => this.cancel()}>
            <Text style = {CustomStyle.whiteButtonTitle}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style = {this.state.scanning ? {...CustomStyle.middleNarrowButton, backgroundColor: 'grey'} : {...CustomStyle.middleNarrowButton}} 
            onPress = {() => this.nextStep()}
            disabled = {this.state.scanning}
          >
            <Text style = {CustomStyle.whiteButtonTitle}>OK</Text>
          </TouchableOpacity>
        </View>
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
)(Scanner);

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
    paddingHorizontal: 12
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