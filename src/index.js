import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './App';
import { createStore } from "redux";
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';

console.warn =  () => {};
ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
