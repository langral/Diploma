import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { error } from 'util';

export default class Input extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: "",
            errors: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.getErrors = this.getErrors.bind(this);
        this.validate = this.validate.bind(this);
    }

    validate(callback, event) {
        let errors = callback(event.target.value);

        if (errors.length > 0) {
            this.setState({ errors: errors });
            event.preventDefault();
        }
    }

    handleChange(event) {
        if (this.props.validCondition)
            this.validate(this.props.validCondition)

        if (this.props.updateForm)
            this.props.updateForm({ [this.props.name]: event.target.value });

        this.setState({ value: event.target.value });
    }

    getErrors() {
        if (this.state.errors.length > 0) {
            let errors = this.state.errors.map((error, index) => {
                return (
                    <p key={index}>{error}</p>
                );
            });

            return (
                <span className="text-danger">
                    {errors}
                </span>
            );
        }
    }

    render() {
        return (
            <div className="form-group">
                <label
                    htmlFor={this.props.id}
                    className="control-label">
                    {this.props.label}
                </label>

                <input
                    type={this.props.type}
                    value={this.state.value}
                    onChange={this.handleChange}
                    name={this.props.name}
                    id={this.props.id}
                    required={this.props.required}
                    className="form-control"
                />

                {this.getErrors() && (this.getErrors())}
            </div>
        );
    }

};

Input.defaultProps = {
    type: "text",
    onChange: false,
    name: false,
    required: false,
    id: false
};