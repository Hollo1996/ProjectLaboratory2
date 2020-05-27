import React, { Component } from 'react';
import { Login } from './ui/auth/login';
import { proxy } from './network/proxy';
import { Main } from './ui/old/main';

export default class App extends Component {

  state = { showLogin: true };
  componentDidMount() {
    proxy.addEventListener("login", () => this.setState({ showLogin: false }));
  }
  
  render() {
    return (
      <div className="app">
        { this.state.showLogin ? <Login /> : <Main /> }
      </div>
    );
  }
}