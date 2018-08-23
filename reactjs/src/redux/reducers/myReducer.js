import { combineReducers } from 'redux';
import auth from './auth';
import messages from './messages';
import user from './user';
import userOnline from './userOnline';

const myReducer = combineReducers({
	auth: auth,
	messages : messages,
	user : user,
	userOnline: userOnline
});

export default myReducer;