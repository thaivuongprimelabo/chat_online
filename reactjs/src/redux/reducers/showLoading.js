import * as types from '../actions/actionTypes';

var initialState = false;

var myReducer = (state = initialState, action) => {
	switch(action.type) {
        case types.UPDATE_LOADING_STATUS:

            return action.status;
		default:
			return state;
    }
    return state;
}

export default myReducer;