require('file-loader?name=[name].[ext]!./index.html');//loads into webpack and includes in final output
import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './App'
import './App.scss';


const appElement = document.getElementById('app');

ReactDOM.render(<App />, appElement);
