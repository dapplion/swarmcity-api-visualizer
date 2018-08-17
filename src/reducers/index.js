import { combineReducers } from 'redux'
import db from './db'
import rooms from './rooms'

export default combineReducers({
  db,
  rooms,
})