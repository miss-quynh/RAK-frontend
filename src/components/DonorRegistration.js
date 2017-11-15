import React from 'react';
import axios from 'axios';

class DonorRegistration extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      donor: {
        first_name: '',
        last_name:  '',
        zipcode:  '',
        email: '',
        password: ''
      }
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
      email: event.target.value})
  }

    handleLastNameChange(event) {
    this.setState({
      email: event.target.value})
  }

    handleZipcodeChange(event) {
    this.setState({
      password: event.target.value})
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
      event.preventDefault()
      axios.post('http://localhost:8181/donor', {donor: this.state.donor})
      .then(({data}) => {
        console.log(data)
        this.setState({donor: data})
      })
    }

  render() {
    return (
        <div>
          <h2>Donor Registration</h2>
          <form onSubmit= { this.handleSubmit}>
            <input
              placeholder= {'Enter first name'}
              type="text"
              value={this.props.first_name}
              onChange={this.handleFirstNameChange} >
            </input>
            <input
              placeholder='Enter last name'
              type="text"
              value={this.props.last_name}
              onChange={this.handleLastNameChange} >
            </input>
            <input
              placeholder='Enter your zipcode'
              type="integer"
              value={this.props.zipcode}
              onChange={this.handleZipcodeChange} >
            </input>
            <input
              placeholder='Enter email'
              type="email"
              value={this.props.email}
              onChange={this.handleEmailChange} >
            </input>
            <input
              placeholder ='Enter password'
              type="password"
              value={this.props.password}
              onChange={this.handlePasswordChange} >
            </input>
            <button
              type='submit'
              disabled={!this.props.email}>
                Submit
            </button>
          </form>
        </div>
    )
  }
}


export default DonorRegistration
