import {StyleSheet} from 'react-native'
import constants from '../../constants'

const CustomStyle = StyleSheet.create({
  splashTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: constants.Colors.darkRed,
    paddingLeft: 28,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  middleNarrowButton: {
    width: '45%',
    height: 50,
    paddingHorizontal: 8,
    backgroundColor: constants.Colors.facebook,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  longNarrowButton: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: constants.Colors.facebook,
    borderRadius: 5,
  },
  whiteButtonTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700'
  },
})

export default CustomStyle;