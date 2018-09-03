import * as types from '../actions/actionTypes';

var initialState = {
    userInfo : null   
};

var myReducer = (state = initialState, action) => {
	switch(action.type) {
        case types.SET_MENU_TOP_INFO:
            state.userInfo = action.userInfo;
            return {...state};
		default:
			return state;
    }
    return state;
}

export default myReducer;