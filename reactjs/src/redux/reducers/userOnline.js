import * as types from '../actions/actionTypes';
import * as constants from '../../constants/Commons'

var initialState = [
    {id: 2, name: "Le Giang", status: constants.ONLINE},
    {id: 3, name: "Hoang Le", status: constants.ONLINE}
];

var myReducer = (state = initialState, action) => {
	switch(action.type) {
		default:
			return state;
    }
    return state;
}

export default myReducer;