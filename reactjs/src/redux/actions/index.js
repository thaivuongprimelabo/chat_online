import * as types from './actionTypes';
import * as constants from '../constants';

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