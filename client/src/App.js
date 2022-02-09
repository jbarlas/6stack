import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import TeamList from './components/TeamList'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppNavbar/>
      <TeamList/>
    </div>
  );
}

export default App;
