import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Contador from './components/Contador'

import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

// REDUX
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ContadorReducer from './reducers/ContadorReducer'

var store = createStore(ContadorReducer);

ReactDOM.render(
  <Provider store={store}>
    <Contador />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
