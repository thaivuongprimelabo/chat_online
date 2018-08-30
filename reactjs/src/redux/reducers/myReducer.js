import { combineReducers } from 'redux';
import auth from './auth';
import messages from './messages';
import user from './user';
import userOnline from './userOnline';
import showLoading from './showLoading';
import menuTop from './menuTop';

const myReducer = combineReducers({
	auth: auth,
	messages : messages,
	user : user,
	userOnline: userOnline,
	showLoading : showLoading,
	menuTop : menuTop
});

export default myReducer;