import React, { Component } from "react";
import { post } from "../fetch";

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            input: {
                email: '',
                password: ''
            },
            results: []
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
        const { keyword } = this.state.input;

        const response = await post('/search', {
            keyword
        });

        // console.log(await response.json());
        this.setState({
            results: await response.json()
        });
    }

    render() {
        return (
            <div>
                <h3>Search Users</h3>

                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <input type="text" name="keyword" className="form-control" 
                            value={this.state.input.keyword}
                            onChange={this.handleChange}
                            placeholder="e.g. John"/>
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-primary">Search</button>
                        </div>
                    </div>
                </form>

                <div className="overflow-auto my-3 search-results">
                    <ul className="list-group">
                        {this.state.results.map(({ id, firstname, lastname }) => (
                            <li key={id} className="list-group-item">{firstname} {lastname}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
