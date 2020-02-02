import React, { Component } from 'react'
import 
  {
    View, 
    TouchableOpacity, 
    Text, 
    ScrollView, 
    Image,
    Picker
  } from 'react-native'
import glamorous from 'glamorous-native';
import {connect} from 'react-redux'

import constants from '../../constants'
import CustomStyle from '../Component/CustomStyle'
import Api from '../../../utils/Api'

import 
  {
    Container,
  } from '../Component'

const Main = glamorous(View)({
  marginTop: 25,
  width: '100%',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

class HomeScreen extends React.Component {

  render() {
    return (
      <Container>
        <ScrollView style={{ flexGrow: 1, width: '100%',}}>
          
        </ScrollView>
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
)(HomeScreen);