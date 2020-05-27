import React, { Component } from 'react';
import { Login } from './ui/auth/login';
import { proxy } from './network/proxy';
import { Main } from './ui/old/main';
import { ModelHandlerView } from './ui/handler/modelHandlerView';

export default class App extends Component {

  state = { showLogin: true };
  componentDidMount() {
    proxy.addEventListener("login", () => this.setState({ showLogin: false }));
  }
  
  render() {
    return (
      <div className="app">
        { this.state.showLogin ? <Login /> : <ModelHandlerView /> }
      </div>
    );
  }
}