
import {combineReducers} from 'redux'

import  
  {
    CHANGE_REGISTOR
  } from '../action/index'

const initialState = {
  registore: true
}

const dataReducer = (state = initialState, action) => {
  switch(action.type) {
    case CHANGE_REGISTOR:
      return {
        ...state,
        registore: action.registore
      };
    default: 
      return state;
  }
};

const rootReducer = combineReducers({
  dataReducer
})

export default rootReducer