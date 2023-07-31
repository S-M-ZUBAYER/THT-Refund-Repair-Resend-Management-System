import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';
import UserContext from './context/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <UserContext>
    <App />
    <Toaster></Toaster>
    </UserContext>
  </React.StrictMode>,
  document.getElementById('root')
);


