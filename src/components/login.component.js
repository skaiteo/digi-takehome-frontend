import React, { Component } from "react";
import { post } from "../fetch";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            input: {
                email: '',
                password: ''
            },
            errors: {},
            loggingIn: false,
            loggedIn: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({ input });
    }

    async handleSubmit(event) {
        this.setState({
            errors: {},
            loggingIn: true
        })
        event.preventDefault();
        const { email, password } = this.state.input;

        const response = await post('/login', {
            email,
            password
        });

        if (response.status === 400) {
            const { message } = await response.json();
            const errors = { auth: message };

            this.setState({
                errors,
                loggingIn: false
            });
            return;
        }

        this.setState({
            loggedIn: true
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Login</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input name="email" type="email" className="form-control"
                        value={this.state.input.email}
                        onChange={this.handleChange}
                        placeholder="Enter email" required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" className="form-control"
                        value={this.state.input.password}
                        onChange={this.handleChange}
                        placeholder="Enter password" required/>
                    <div className="text-danger">{this.state.errors.auth}</div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" disabled={this.state.loggingIn}>
                    {this.state.loggedIn ? 'Logged In!' : 'Log In'}
                </button>
            </form>
        );
    }
}
