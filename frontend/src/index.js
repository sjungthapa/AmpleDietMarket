import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider as ReduxProvider } from 'react-redux';
import store from './store';

import { transitions, positions, Provider as AlertProvider } from 'react-alert'; 
import AlertTemplate from 'react-alert-template-basic';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_RIGHT,
  transition: transitions.SCALE
};

ReactDOM.render(
  <ReduxProvider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App className="root" />  
    </AlertProvider>
  </ReduxProvider>,
  document.getElementById('root')
);
