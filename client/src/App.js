import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import TeamList from './components/TeamList'
import PlayerModal from './components/PlayerModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar/>
          <Container>
            <PlayerModal/>
            <TeamList/>
          </Container>
        </div>
      </Provider>
    );
  };
}

export default App;
