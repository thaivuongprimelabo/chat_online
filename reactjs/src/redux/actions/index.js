import * as types from './actionTypes';
import * as constants from '../constants';

import axios from 'axios';

export const doLogin = (form) => {
	return (dispatch) => {

		var data = {
			email : form.email,
			password : form.password
		};

		var strJson = JSON.stringify(data);

		axios({
			method: 'POST',
			url : constants.API_LOGIN,
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json',
			},
			data : strJson
		})
		.then(res => {
			var responseJson = res.data;
			console.log(responseJson);
		})
		.catch((error) =>{
			alert(error);
		});

		axios.get(constants.API_LOGIN)
	    .then(res => {
			var responseJson = res.data;
			console.log(responseJson);
	    })
	}
}