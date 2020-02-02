
import { createStore, applyMiddleware } from 'redux'

import reducers from './reducer/index'
import thunk from 'redux-thunk'

export default createStore(reducers, applyMiddleware(thunk));