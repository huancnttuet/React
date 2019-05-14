import React, { Component } from 'reactn';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.setGlobal(
      fetch('index.html')
        .then(response => response.text())
        .then(html => ({
          data: html
        }))
    );
  }

  incrementX = () => {
    this.setGlobal(state => ({
      x: state.x + 1
    }));
  };

  render() {
    return (
      <button
        children={this.global.x}
        onClick={this.incrementX}
      />
    );
  }
}

export default App;
