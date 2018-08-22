import * as types from '../actions/actionTypes';
import { stat } from 'fs';

var initialState = {
	isLogin : false
};

var myReducer = (state = initialState, action) => {
	switch(action.type) {
        case types.CREATE_ACCOUNT:
            console.log(action);
			return state;
		default:
			return state;
    }
    return state;
}

export default myReducer;