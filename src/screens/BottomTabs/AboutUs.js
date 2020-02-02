import React, { Component } from 'react'
import 
  {
    View, 
    TouchableOpacity, 
    Text, 
    ScrollView, 
    Image,
  } from 'react-native'
import {connect} from 'react-redux'

import glamorous from 'glamorous-native';
import constants from '../../constants'

import 
  {
    Container,
    CustomStyle,
  } from '../Component'

const Main = glamorous(View)({
  marginTop: 25,
  width: '100%',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

class OrientalMedicine extends React.Component {

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
)(OrientalMedicine);
