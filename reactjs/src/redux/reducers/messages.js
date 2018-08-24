import * as types from '../actions/actionTypes';
import * as constants from '../../constants/Commons'

var initialState = [];

var myReducer = (state = initialState, action) => {
	switch(action.type) {
        case types.ADD_MESSAGE_TO_LIST:
            
            if(action.mode === constants.ADD_LIST_MESSAGE) {
                state = action.message;
            } else {
                state.push(action.message);
                return [...state];
            }
            
			return state;
		default:
			return state;
    }
    return state;
}

export default myReducer;