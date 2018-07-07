// External libraries
import React, { Component } from 'react';
// Internal libraries
import {Mqtt} from './modules/mqtt';
// Components
import logo from './logo.svg';
// Css
import './App.css';

class App extends Component {
  //
  // Lifecycle
  //
  componentDidMount() {
    const mqttClient = new Mqtt();

    mqttClient.subscribe('presence');
    mqttClient.on('message', this.handleMessages);
    mqttClient.publish('presence', 'hello wordl');
  }

  //
  // Handlers
  //
  handleMessages = (topic, message) => {
    console.log(topic);
    console.log(message.toString());
    // Do something with the message
    // :)
  }

  //
  // Render
  //
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
