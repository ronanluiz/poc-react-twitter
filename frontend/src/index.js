import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// pacote para utilização do arquivo .env
require('dotenv').config();

ReactDOM.render(<App />, document.getElementById('root'));