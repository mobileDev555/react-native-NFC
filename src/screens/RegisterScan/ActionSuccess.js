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

import constants from '../../constants'
import CustomStyle from '../Component/CustomStyle'
import Api from '../../../utils/Api'
import NfcManager, {Ndef, NfcTech, ByteParser, NfcAdapter} from 'react-native-nfc-manager'

class ActionSuccess extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.registore !== this.props.registore) {
      this.cancel()
    }
  }

  changeGender(gender) {
    this.props.changeGender(gender)
  }

  cancel() {
    this.props.navigation.pop()
  }

  render() {
    const {gender} = this.props
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
              <View style = {styles.successView}>
                <Text style = {{fontSize: 24, fontWeight: '700', color: constants.Colors.whatsApp}}>Action success !</Text>
              </View>
            </View>
          </View>
        </View>
        <View style = {styles.BottomView}>
          <TouchableOpacity style = {CustomStyle.middleNarrowButton} onPress = {() => this.cancel()}>
            <Text style = {CustomStyle.whiteButtonTitle}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {CustomStyle.middleNarrowButton} onPress = {() => this.props.navigation.pop()}>
            <Text style = {CustomStyle.whiteButtonTitle}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    registore: state.dataReducer.registore
  }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActionSuccess);

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
  },
  successView: {
    width: '100%',
    paddingVertical: 28,
    justifyContent: 'center',
    alignItems: 'center',
  }
})