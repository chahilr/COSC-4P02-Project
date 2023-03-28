import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './final/App';
import { BrowserRouter } from 'react-router-dom';
 
document.body.style.margin = 0;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
