import React, { Component } from 'react';
import { Login } from './ui/auth/login';
import { proxy } from './network/proxy';
import { ModelHandlerView } from './ui/handler/modelHandlerView';
import { ModelView } from './ui/dmla/modelView';
import { Model } from './model/data/dmla/Model';
import '../css/index.css';

export default class App extends Component {

  state = { 
    showLogin: true, 
    showModelHandler: true, 
    model:{
      id:-1,
      name:"",
      superId:-1,
      super:"",
      root:{
          id:-1,
          entity:{
              id:-1,
              name:"ComplexEntity",
              superId:-1,
              super:"ComplexEntity",
              slots:[
                  {
                      id:-1,
                      name:"Children",
                      superId:-1,
                      super:"Children",
                      type:{id:-1,timeStamp:"",entityId:-1,entityName:"ComplexEntity"},
                      cardinality:{id:-1,timeStamp:"",from:0,to:100,toInf:true},
                      operationSignature:{id:-1,timeStamp:"",items:[]},
                      customConstraits:[],
                      values:[]
                  }
              ]
          },
          children:[]
      }
  } };
  componentDidMount() {
    proxy.addEventListener("login", () => this.setState({ showLogin: false }));
    proxy.addEventListener("modelDetail", (model:Model) => {
      this.setState({ showLogin: false, showModelHandler: false, model:model})
    });
  }
  
  render() {
    return (
      <div className="app">
        { this.state.showLogin ? <Login /> : 
          this.state.showModelHandler ? <ModelHandlerView /> : 
          <ModelView model={this.state.model} /> 
        }
      </div>
    );
  }
}