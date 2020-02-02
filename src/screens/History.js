import React, { Component } from 'react'
import 
  {
    View, 
    Text, 
    Image,
    ActivityIndicator,
    AsyncStorage,
    StyleSheet,
    TouchableOpacity,
    ScrollView
  } from 'react-native'

import Api from '../../utils/Api'
import constants from '../constants'

import {connect} from 'react-redux'
import OneSignal from 'react-native-onesignal';

import 
  {
    CustomStyle
  } from './Component'


class HistoryScreen extends React.Component {
  constructor(props) {
    super(props)
    
  }
  state = {
    loading: true,
    history: undefined
  }

  componentWillMount() {
    this.loadingHistory()
  }

  async loadingHistory() {
    const history = await AsyncStorage.getItem('History')
    this.setState({history: JSON.parse(history)})
    this.setState({loading: false})
  }

  render() {
    const {history} = this.state
    return (
      <View style = {{width: '100%', flex: 1}}>
        {
          this.state.loading?
          <View style = {{width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color = '#FF5800' size = 'large' />
          </View>
          :
          <View style = {{...styles.container}}>
            <Text style = {{...CustomStyle.splashTitle}}>History</Text>
            {
              history.length > 0 ?
              <ScrollView style = {{...styles.historyView}}>
                {
                  history.map(item => 
                    <View style = {styles.historyRow} key = {item.date}>
                      <Text style = {{...CustomStyle.mainTitle}}>{item.date}</Text>
                      <Text style = {{...CustomStyle.mainTitle}}>{item.uid}</Text>
                    </View>
                  )
                }
              </ScrollView>
              :
              <Text style = {{...CustomStyle.mainTitle, marginTop: 50}}>There is no history data</Text>
            }
            <View style = {styles.BottomView}>
              <TouchableOpacity style = {CustomStyle.longNarrowButton} onPress = {() => this.props.navigation.pop()}>
                <Text style = {CustomStyle.whiteButtonTitle}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
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
)(HistoryScreen);

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    flex: 1, 
    flexDirection: 'column',
    alignItems: 'center', 
    // justifyContent: '',
    marginTop: 30
  },
  historyView: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 12,
  },
  historyRow: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 26,
    paddingHorizontal: 18,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  BottomView: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 28,
    paddingHorizontal: 28
  }
})