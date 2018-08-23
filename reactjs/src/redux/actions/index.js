import * as types from './actionTypes';
import * as constants from '../../constants/Commons';

import axios from 'axios';

export const doLogin = (form) => {
	return async (dispatch) => {

		var data = {
			email : form.email,
			password : form.password
		};

		var strJson = JSON.stringify(data);

		await axios({
			method: 'POST',
			url : constants.API_LOGIN,
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json; charset=utf-8'
			},
			data : strJson
		})
		.then(res => {
			var responseJson = res.data;
			if(responseJson.code === 200) {
				var userInfo = responseJson.data;
				dispatch(updateAuthState(userInfo));
			}
		})
		.catch((error) =>{
			alert(error);
		});
	}
}

export const updateAuthState = (userInfo) => {
	return {
		type : types.UPDATE_AUTH_STATE,
		userInfo : userInfo
	}
}

export const createAccount = (form) => {
	return async (dispatch) => {
		var data = {
			name : form.name,
			email : form.email,
			password : form.password
		};

		var strJson = JSON.stringify(data);

		await axios({
			method: 'POST',
			url : constants.API_REGISTER,
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json; charset=utf-8'
			},
			data : strJson
		})
		.then(res => {
			var responseJson = res.data;
			if(responseJson.code === 200) {
				var userInfo = responseJson.data;
				dispatch(updateAuthState(userInfo));
			}
		})
		.catch((error) =>{
			alert(error);
		});
	}
}

export const addMessage = (message) => {
	return async (dispatch) => {
		var data = {
			user_id : message.user_id,
			room_id : message.room_id,
			friend_id : message.friend_id,
			content : message.content
		};

		var strJson = JSON.stringify(data);

		await axios({
			method: 'POST',
			url : constants.API_ADD_MESSAGE,
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json; charset=utf-8'
			},
			data : strJson
		})
		.then(res => {
			var responseJson = res.data;
			if(responseJson.code === 200) {
				var message = responseJson.data;
				dispatch(addMessageToList(message));
			}
		})
		.catch((error) =>{
			alert(error);
		});
	}
}

export const addMessageToList = (message) => {
	return {
		type : types.ADD_MESSAGE_TO_LIST,
		message : message
	}
}