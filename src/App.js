import React, { Component } from 'react';
import mqtt from 'mqtt';
import logo from './logo.svg';
import './App.css';

const MQTT_SERVER_URL = '107.170.231.29';

// const mqttOpts = {
//   keepalive: 60,
//   reschedulePings: true,
//   protocolId: 'MQTT',
//   protocolVersion: 4,
//   reconnectPeriod: 1000,
//   connectTimeout: 30 * 1000,
//   clean: true,
//   // protocolId: 'MQIsdp',
//   // protocolVersion: 3,
//   resubscribe: true,
//   username: '',
//   password: '',
//   queueQoSZero: true
// }

// const mqttUrl = JSON.parse();

class App extends Component {
  componentDidMount() {
    const client = mqtt.connect(`mqtt://${MQTT_SERVER_URL}:9001`);

    client.on('connect', function () {
      client.subscribe('presence')
      client.publish('presence', 'Hello mqtt')
    })
    
    client.on('message', function (topic, message) {
      // message is Buffer
      console.log(message.toString())
      client.end()
    })
  }
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
