import {combineReducers} from 'redux';
import userInfo from "./userInfo.js"
import listConnected from "./listConnected.js"
import getAllCategory from "./getAllCategory.js"
import msgSocket from '../Reducers/msgScoket.js'

export default combineReducers({
    userInfo,
    listConnected,
    getAllCategory,
    msgSocket,
})