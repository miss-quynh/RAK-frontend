import React from 'react';
import { Redirect } from 'react-router'
import axios from 'axios';

class DonorRegistration extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      first_name: '',
      last_name:  '',
      zip_code:  '',
      email: '',
      password: '',
      auth_token: window.localStorage.getItem('auth_token')
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.handleLastNameChange = this.handleLastNameChange.bind(this)
    this.handleZipcodeChange = this.handleZipcodeChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

    handleFirstNameChange(event) {
    this.setState({
      first_name: event.target.value})
  }

    handleLastNameChange(event) {
    this.setState({
      last_name: event.target.value})
  }

    handleZipcodeChange(event) {
    this.setState({
      zip_code: event.target.value})
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
      var currentContext = this;
      event.preventDefault()
      axios.post('http://localhost:8181/donors', {donor: this.state})
      .then(({data}) => {
        console.log(data)
        if(Number.isInteger(data.id)){
          // this.setState({donor: data, auth_token: true})
          this.setState({donor: data})

          var postData = JSON.stringify({
            auth: {
              email: this.state.email, password: this.state.password
            }
          });
          // the first req registers the user
          // the second req acutally logs them in and returns the JWT
          this.serverRequest = axios.post("http://localhost:8181/donor_token", postData, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          })
          .then(response => {
            window.localStorage.setItem('auth_token', response.data.jwt)
            // console.log(response.data.jwt)
            currentContext.setState({auth_token: response.data.jwt})
          })
          .catch(error => console.log("Donor Login Error: ", error.response))
        }
      })
    }

  render() {
    if (this.state.auth_token !== null) { return <Redirect to="/donors"/> } 
    return (
      <div>
        <h2>Donor Registration</h2>
        <form onSubmit= {this.handleSubmit}>
          <input
            placeholder= {'Enter first name'}
            type="text"
            value={this.state.first_name}
            onChange={this.handleFirstNameChange} >
          </input>
          <input
            placeholder='Enter last name'
            type="text"
            value={this.state.last_name}
            onChange={this.handleLastNameChange} >
          </input>
          <input
            placeholder='Enter your zipcode'
            type="integer"
            value={this.state.zipcode}
            onChange={this.handleZipcodeChange} >
          </input>
          <input
            placeholder='Enter email'
            type="email"
            value={this.state.email}
            onChange={this.handleEmailChange} >
          </input>
          <input
            placeholder ='Enter password'
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange} >
          </input>
          <button
            type='submit'
            disabled={!this.state.email}>
            <a href={ '/donors'}>Submit</a>
          </button>
        </form>
      </div>
    )
  }
}

export default DonorRegistration
