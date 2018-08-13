import React, { Component } from 'react';
import './App.css';
import DbItems from './DbItems'
import PubSub from 'pubsub-js';



class SelectHost extends Component {
  connect(e) {
    const url = e.target.value
    PubSub.publish('connect', url);
  }
  render() {
    return (
      <div className="container">
      <div className="form-group">
        <select className="form-control mt-4" id="sel1" onChange={this.connect}>
          <option>Select host...</option>
          <option>dev.swarm.city</option>
          <option>localhost:8011</option>
        </select>
      </div></div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title mt-3">Swarm City database visualizer</h1>
        </header>
        <SelectHost/>
        <DbItems/>
      </div>
    );
  }
}

export default App;
