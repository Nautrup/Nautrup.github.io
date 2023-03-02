import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import ReactDOM from 'react-dom/client';
import Friends from './components/Friends';
import Navbar from './components/Navbar';
import PageController from './PageController';
import Game from './Game/Game';

class App extends Component {
  render() {
    return (
      <div className="App">
         <Navbar  />
          <PageController default='greet'>
            <Friends path='friends' />
            <Game path='game' />
          </PageController>
      </div>
    );
  };
}


export default App;