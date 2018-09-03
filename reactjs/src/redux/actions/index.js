import * as types from './actionTypes';
import * as constants from '../../constants/Commons';

import axios from 'axios';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient(constants.SOCKET_HOST);

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
			  'Content-Type': 'application/json; charset=utf-8',
			},
			data : strJson
		})
		.then(res => {
			var responseJson = res.data;
			if(responseJson.code === 200) {
				var userInfo = responseJson.data;
				socket.emit('join', userInfo);
				dispatch(updateAuthState(userInfo));
				dispatch(setMenuTopInfo(userInfo));
			} else {
				dispatch(updateAuthState(null));
				dispatch(setMenuTopInfo(null));
			}
		})
		.catch((error) =>{
			alert(error);
		});
	}
}

export const doLogout = (userInfo) => {
	return (dispatch) => {
		socket.emit('leave', userInfo);
		dispatch(updateAuthState(null));
		// dispatch(addUserOnlineToList(null));
		
	}
}

export const setMenuTopInfo = (userInfo) => {
	return {
		type : types.SET_MENU_TOP_INFO,
		userInfo : userInfo
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
				socket.emit('add_message', message);
			}
		})
		.catch((error) =>{
			alert(error);
		});
	}
}

export const getUserList = (userOnlineList, userId) => {
	return async (dispatch) => {
		console.log(userId);
		await axios({
			method: 'GET',
			url : constants.API_GET_USER_LIST + '?userId=' + userId
		})
		.then(res => {
			var responseJson = res.data;
			if(responseJson.code === 200) {
				var users = responseJson.data;
				var length = userOnlineList.length;
				var length2 = users.length;
				for(var i = 0; i < length; i++) {
					var userOnline = userOnlineList[i];
					if(userId === userOnline.id) {
						continue;
					}

					for(var j = 0; j < length2; j++) {
						var user = users[j];
						
						// user['status'] = constants.OFFLINE;
						if(userOnline.id === user.id) {
							user['status'] = constants.ONLINE;
						}
					}
				}
				dispatch(addUserOnlineToList(users));
			}
		})
		.catch((error) =>{
			alert(error);
		});
	}
}

export const sendFile = (formData) => {
	return async (dispatch) => {
		await axios({
			method: 'POST',
			url : constants.API_SEND_FILE,
			data : formData
		})
		.then(res => {
			var responseJson = res.data;
			if(responseJson.code === 200) {
				var fileList = responseJson.data;
				socket.emit('add_message', fileList);
				// dispatch(addMessageToList(fileList));
			}
		})
		.catch((error) =>{
			alert(error);
		});

	}
}

export const updateOnlineOffline = (userOnlineList) => {
	return {
		type: types.UPDATE_ONLINE_OFFLINE,
		userOnlineList : userOnlineList
	}
}

export const getMessageList = (input) => {
	return async (dispatch) => {

		dispatch(updateLoadingStatus(true));

		var data = {
			user_id : input.user_id,
			room_id : input.room_id,
			friend_id : input.friend_id
		};

		var strJson = JSON.stringify(data);

		await axios({
			method: 'POST',
			url : constants.API_GET_MESSAGE_LIST,
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json; charset=utf-8'
			},
			data : strJson
		})
		.then(res => {
			var responseJson = res.data;
			if(responseJson.code === 200) {
				var messages = responseJson.data;
				dispatch(addMessageToList(messages, constants.ADD_LIST_MESSAGE));
				dispatch(updateLoadingStatus(false));
			}
		})
		.catch((error) =>{
			alert(error);
		});
	}
}

export const updateLoadingStatus = (status) => {
	return {
		type : types.UPDATE_LOADING_STATUS,
		status : status
	}
}

export const addMessageToList = (message, mode) => {
	return {
		type : types.ADD_MESSAGE_TO_LIST,
		message : message,
		mode : mode
	}
}

export const addUserOnlineToList = (users) => {
	return {
		type : types.ADD_USER_ONLINE_TO_LIST,
		users : users
	}
}