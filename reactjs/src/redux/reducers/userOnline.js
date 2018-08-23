import * as types from '../actions/actionTypes';
import * as constants from '../../constants/Commons'

var initialState = [
    {name: "Le Giang", status: constants.ONLINE},
    {name: "Hoang Le", status: constants.OFFLINE}
];

var myReducer = (state = initialState, action) => {
	switch(action.type) {
		default:
			return state;
    }
    return state;
}

export default myReducer;