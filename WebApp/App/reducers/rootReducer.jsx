import { combineReducers } from 'redux'
import authReducer from '../containers/account/loginReducer.jsx'

export default combineReducers({
    auth: authReducer
})

