import * as types from '../actions/actionTypes';

var userInfo = localStorage.getItem('userInfo');
var initialState = {
	userInfo : JSON.parse(userInfo)
};

var myReducer = (state = initialState, action) => {
	switch(action.type) {
		case types.UPDATE_AUTH_STATE:
			// if(action.userInfo !== null) {
			// 	localStorage.setItem('userInfo', JSON.stringify(action.userInfo));
			// } else {
			// 	localStorage.removeItem('userInfo');
			// }
			
			state.userInfo = action.userInfo;

			return { ...state}
		default:
			return state;
    }
    return state;
}

export default myReducer;