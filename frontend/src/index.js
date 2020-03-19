import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {createrStore, createStore} from 'redux';
import Reducer from './reducers/reducers'
import {Provider} from 'react-redux';
import store from './store/store'

// const store=createStore();

ReactDOM.render(<BrowserRouter> <Provider store={store}><App /> </Provider></BrowserRouter>, document.getElementById('root'));
