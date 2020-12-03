import React, { Component } from "react";
import { post } from "../fetch";

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            errors: {},
            input: {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            isRegistered: false,
            registering: false,
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
        event.preventDefault();
        this.setState({
            errors: {},
            registering: true
        })

        if(this.validate()){
            const response = await post('/register', this.state.input);

            if (response.status === 400) {
                const { message } = await response.json();
                const errors = { email: message };

                this.setState({
                    errors,
                    registering: false
                });
                return;
            }

            this.setState({
                isRegistered: true
            });
        }
    }
 
    validate(){
        const input = this.state.input;
        const errors = {};
        let isValid = true;

        this.setState({
            errors
        })

        const pattern = new RegExp(/^(?=.*[A-Z])(?=.*[A-Z])(?=.*[^A-Za-z\d]).{12,}$/);
        if (!pattern.test(input["password"])) {
            isValid = false;
            errors["password"] = "Please ensure password contains at least 12 characters, at least one upper-case alphabet and at least one non-alphanumeric character.";
        }

        if (input["password"] !== input["confirmPassword"]) {
            isValid = false;
            errors["confirmPassword"] = "Passwords don't match.";
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    render() {
        return (
            <div className="overflow-auto mh-100 px-3">
                <form onSubmit={this.handleSubmit}>
                    <h3>Register</h3>
    
                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" name="firstname" className="form-control"
                            value={this.state.input.firstname}
                            onChange={this.handleChange}
                            placeholder="First name" required />
                    </div>
    
                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" name="lastname" className="form-control" 
                            value={this.state.input.lastname}
                            onChange={this.handleChange}
                            placeholder="Last name" required />
                    </div>
    
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" name="email" className="form-control" 
                            value={this.state.input.email}
                            onChange={this.handleChange}
                            placeholder="Enter email" required />
                        <div className="text-danger">{this.state.errors.email}</div>
                    </div>
    
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" 
                            value={this.state.input.password}
                            onChange={this.handleChange}
                            placeholder="Enter password" required />
                        <div className="text-danger">{this.state.errors.password}</div>
                    </div>
    
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" className="form-control" 
                            value={this.state.input.confirmPassword}
                            onChange={this.handleChange}
                            placeholder="Enter password" required />
                        <div className="text-danger">{this.state.errors.confirmPassword}</div>
                    </div>
    
                    <button type="submit" className="btn btn-primary btn-block" disabled={this.state.registering}>
                        {this.state.isRegistered ? 'Registered!' : 'Register'}
                    </button>
                    <p className="forgot-password text-right">
                        Already registered? <a href="/sign-in">sign in</a>
                    </p>
                </form>
            </div>
        );
    }
}