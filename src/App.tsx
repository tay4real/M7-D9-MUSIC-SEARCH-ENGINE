import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Home from './components/Home';

import DetailPage from './components/DetailPage'


function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Route path="/" exact  component= {Home}   />
        <Route  path='/details/:id'    component= {DetailPage} />
      </header>
    </div>
    </Router>
  );
}

export default App;
