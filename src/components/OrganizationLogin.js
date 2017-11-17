import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

import * as FontAwesome from 'react-icons/lib/fa';

class OrganizationLogin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      id: null
    };
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
    this.setState({
      email: event.target.value})
    }

    handlePasswordChange(event) {
    this.setState({
      password: event.target.value})
    }

    handleSubmit(event) {
    event.preventDefault();
    var currentContext = this;

     var postData = JSON.stringify({
      auth: {
        email: this.state.email, password: this.state.password
        }
      });

    this.serverRequest = axios.post("http://localhost:8181/organization_token", postData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        window.localStorage.setItem('auth_token', response.data.jwt)
        currentContext.props.updateAuthToken(response.data.jwt)

        axios.get(`http://localhost:8181/organizations/search?organization[email]=${this.state.email}`)
        .then(response => {
          currentContext.setState({id: response.data.id})
        })
    })
      .catch(error => console.log("Organization Login Error: ", error.response))
  }

  render() {
    if(this.state.id !== null){
      return <Redirect to={`/organizations/${this.state.id}`} />
    }
    return (
      <div className="registration-container">
        <h2 className="registration-text">Organization Login</h2>
        <form onSubmit = {this.handleSubmit}>
          <p>
            <label htmlFor = 'email'> {this.props.label} </label>
            <FontAwesome.FaEnvelope />
            <input
              className="input-text"
              placeholder = 'Enter email'
              type = "email"
              value = {this.state.email}
              onChange = {this.handleEmailChange}>
            </input>
          </p>
          <p>
            <FontAwesome.FaKey />
            <input
              className="input-text"
              placeholder = 'Enter password'
              type = "password"
              value = {this.state.password}
              onChange = {this.handlePasswordChange}>
            </input>
          </p>
          <input className="submit-button submit-text" type="submit" value="Login" />
        </form>

        <p className="message-one">Not registered?
          <a className="message-two" href="/organizations/registration"> Create an account</a>
        </p>
      </div>
      )
  }
}

export default OrganizationLogin
