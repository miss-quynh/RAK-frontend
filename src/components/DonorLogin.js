import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

import * as FontAwesome from 'react-icons/lib/fa';

class DonorLogin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.loginAsGuest = this.loginAsGuest.bind(this)

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

    this.serverRequest = axios.post("http://localhost:8181/donor_token", postData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      window.localStorage.setItem('auth_token', response.data.jwt)
      currentContext.props.updateAuthToken(response.data.jwt)
    })
    .catch(error => console.log("Donor Login Error: ", error.response))
  }

  loginAsGuest () {
    this.props.updateAuthToken('guest')
  }

  render() {
    if(this.props.auth_token !== null) { return <Redirect to="/donors"/> }
    return (
      <div className="registration-container">
        <h2 className="registration-text">Donor Login</h2>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label htmlFor='email'> {this.props.label} </label>
            <FontAwesome.FaEnvelope />
            <input
              className="input-text"
              placeholder='Enter email'
              type="email"
              value={this.state.email}
              onChange={this.handleEmailChange} >
            </input>
          </p>
          <p>
            <FontAwesome.FaKey />
            <input
              className="input-text"
              placeholder='Enter password'
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange} >
            </input>
          </p>
          <input className="submit-button submit-text" type="submit" value="Login" />
        </form>

        <p className="message-one">Not registered?
          <button className="message-two"
            onClick={this.loginAsGuest}>
              Continue as guest
          </button>
          <FontAwesome.FaEllipsisV />
          <a className="message-two" href="/donors/registration"> Create an account</a>
        </p>
      </div>
      )
  }
}

export default DonorLogin
