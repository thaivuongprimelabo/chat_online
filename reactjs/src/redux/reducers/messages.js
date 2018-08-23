import * as types from '../actions/actionTypes';
import * as constants from '../../constants/Commons'

var initialState = [
    {name : "Vuong Luu", created_at : "2018/08/22 02:30 PM", content : "Hello World", type: constants.IS_ME},
    {name : "Vuong Luu", created_at : "2018/08/22 02:30 PM", content : "Hello World", type: constants.IS_ME},
    {name : "Vuong Luu", created_at : "2018/08/22 02:30 PM", content : "Hello World", type: constants.IS_FRIEND},
];

var myReducer = (state = initialState, action) => {
	switch(action.type) {
        case types.ADD_MESSAGE_TO_LIST:
            state.push(action.message);
			return [...state];
		default:
			return state;
    }
    return state;
}

export default myReducer;