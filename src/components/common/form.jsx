import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/input";
class Form extends Component {
  state = { data: {}, errors: {} };
  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null; //return {} might be better
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message; //in details array, there are 2 properties,path and message
    return errors;
  };
  //this is the validation for each field of the form on change, is used in handleChange
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }; //[name] computed property
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);//We dont need to abort early
    return error ? error.details[0].message : null;
  };
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate(); //will return an object
    console.log(errors);
    this.setState({ errors: errors || {} }); //in line 9 if we return {}, we dont need {} here
    if (errors) return;
    alert("success");
    //so we dont need to call the server

    //if no error call the server
    this.dosubmit();
  };
  //this will handle changes in state
  //its parameter is "e"
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  renderButton(label) {
    return (
      <button
        type="submit"
        disabled={this.validate()}
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }
  renderInput(name, label, placeholder, type) {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        label={label}
        onChange={this.handleChange}
        defaultValue={data[name]}
        error={errors[name]}
        placeholder={placeholder}
        type={type}
      />
    );
  }
  renderDiv() {
    return (
      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
    );
  }
  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={error}
      />
    );
  }
}

export default Form;
