import React, { Component } from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'

class DrawerHeadr extends React.Component {
  render() {
    return (
      <View style = {{...styles.Drawer}}>
        <TouchableOpacity style = {{...styles.menu}}>
          <Icon name = {'menu'} size = {32} color = 'white' />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style = {{color: 'white', fontWeight: '700', fontSize: 14, paddingLeft: 12}}>Navigation</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DrawerHeadr;

const styles = StyleSheet.create({
  Drawer: {
    width: '100%', 
    flexDirection: 'row',
    height: 45, 
    backgroundColor: '#222222', 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
  },
  menu: {
    width: 50, 
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRightColor: 'white',
    borderRightWidth: 1
  }
})