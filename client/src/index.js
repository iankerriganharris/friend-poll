import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { PersistGate } from 'redux-persist/integration/react'
import { Router } from 'react-router-dom';
import history from './history'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const { store, persistor } = configureStore()

ReactDOM.render(
  <Provider store={ store }>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>, 
  document.getElementById('root')
);

registerServiceWorker();
