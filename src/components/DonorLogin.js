import React from 'react';
import axios from 'axios';

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
    var authDetails = {

        auth: {
          email: this.state.email,
          password: this.state.password
        }
    }
     var postData = JSON.stringify({
      auth: {
        email: this.state.email, password: this.state.password
        }
      });
     // fetch("http://localhost:3000/donor_token", {
     //  method: "post",
     //  headers: {
     //    'Content-Type': 'text/plain'
     //  },
     //  body: JSON.stringify(authDetails)
     // })

    // .catch(error => console.log("Donor Login Error: ", error))
    // console.log(authDetails)
    this.serverRequest = axios.post("http://localhost:3000/donor_token", postData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }
    )
      .then(response => console.log(response.data))
      .catch(error => console.log("Donor Login Error: ", error.response))
  }

  render() {
    return (
      <div>
        <form onSubmit = {this.handleSubmit}>
          <label htmlFor = 'email'> {this.props.label} </label>
          <input
            placeholder = 'Enter email'
            type = "email"
            value = {this.state.email}
            onChange = {this.handleEmailChange} >
          </input>
          <input
            placeholder = 'Enter password'
            type = "password"
            value = {this.state.password}
            onChange = {this.handlePasswordChange} >
          </input>
          <button
            type = 'submit'
            disabled = {!this.state.email}>
              Submit
          </button>
        </form>
      </div>
      )
  }
}

export default DonorLogin
