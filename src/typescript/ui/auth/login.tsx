import React, { Component } from 'react';
import { proxy } from '../../network/proxy';
import { TextInput } from '../old/textInput';


export class Login extends Component {
    state = { email: "", password: "", displayName: "", register: false };


    render() {
        return (
            <div className="login">
                <b><p className="base">{this.state.register ? "Switch back to " : "Have no account yet? Go and "}
                    <a href="" onClick={e => {
                        e.preventDefault();
                        this.setState(state => ({ register: !this.state.register }));
                        // pass a function instead of object
                    }}>
                        {this.state.register ? "Login" : "Register"}
                    </a>
                </p></b>

                <img src="logo512.png" width="256" alt=""/>
                {this.state.register &&
                    <TextInput
                        key={ this.state.displayName } 
                        type="text"
                        placeholder="Display Name (Agent Smith)"
                        value={this.state.displayName}
                        onChange={e => this.setState({ displayName: e })}
                        onEnter={() => this.onClick()}
                        autofocus={true}
                    />
                }
                <TextInput
                    type="email"
                    placeholder="Email (someone@example.com)"
                    value={this.state.email}
                    onChange={e => this.onEmailChange(e)}
                    onEnter={() => this.onClick()}
                    autofocus={true}
                />
                <TextInput
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e })}
                    onEnter={() => this.onClick()}
                    autofocus={true}
                />
                <button className="long" type="button" onClick={() => this.onClick()}>
                    {this.state.register ? "Register" : "Login"}
                </button>

                <b><a href="https://www.google.hu/search?q=privacy">Privacy Policy</a></b>
            </div>);
    }

    onClick() {
        if (this.state.register)
            proxy.sendPacket({
                type: "register", email: this.state.email, password: this.state.password,
                displayName: this.state.displayName, staySignedIn: false
            });
        else
            proxy.sendPacket({
                type: "login", email: this.state.email, password: this.state.password,
                staySignedIn: false
            });
    }

    onEmailChange(value: string) {
        if (value === "COIGBV") {
            this.setState({ email: "COIGBV", displayName: "Akos" })
        }
        else {
            this.setState({ email: value })
        }
    }

}