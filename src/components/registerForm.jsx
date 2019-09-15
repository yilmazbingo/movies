import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = { data: { username: "", password: "", name: "" }, errors: {} };
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password"),
    naame: Joi.string()
      .required()
      .label("Name")
  };

  dosubmit = () => {
    //call the server
    console.log("submitted");
  };
  render() {
    const { errors, data } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "Enter usernam", "email")}
          {this.renderInput(
            "password",
            "Password",
            "enter password",
            "password"
          )}
          {this.renderInput("name", "Name", "enter name", "text")}
          {this.renderDiv()}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
