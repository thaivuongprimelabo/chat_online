import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import myReducer from './redux/reducers/myReducer';
import thunk from 'redux-thunk';

const store = createStore(myReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={ store }><App /></Provider>,
    document.getElementById('root')
)