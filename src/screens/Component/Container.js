import React, { Component } from 'react'
import 
  {
    View, 
    TouchableOpacity, 
    StyleSheet, 
    Text,
  } from 'react-native'
import CustomStyle from './CustomStyle'
import glamorous from 'glamorous-native';

class Container extends React.Component {
  render() {
    const {children} = this.props
    return (
      <View style = {{width: '100%', flex: 1, flexDirection: 'column', paddingHorizontal: 28}}>
        {/* <View style = {{width: '100%', height: 50, justifyContent: 'center', alignItems: 'center'}}>
          <Text style = {CustomStyle.headerTitle}>NFC Controller</Text>
        </View> */}
        {children}
      </View>
    );
  }
}

export default Container;