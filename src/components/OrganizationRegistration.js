import React from 'react';
import { Redirect } from 'react-router'
import axios from 'axios';

class OrganizationRegistration extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tax_code:  '',
      email: '',
      category: '',
      password: '',
      registrationSuccessful: false
    };
    this.handleTaxCodeChange = this.handleTaxCodeChange.bind(this)
    this.handleZipcodeChange = this.handleZipcodeChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

    handleTaxCodeChange(event) {
    this.setState({
      tax_code: event.target.value})
  }

    handleZipcodeChange(event) {
    this.setState({
      zip_code: event.target.value})
  }

    handleEmailChange(event) {
    this.setState({
      email: event.target.value})
  }

    handleCategoryChange(event) {
    this.setState({
      category: event.target.value})
  }

    handlePasswordChange(event) {
    this.setState({
      password: event.target.value})
  }

  handleSubmit(event) {
      event.preventDefault()
      axios.post('http://localhost:8181/organizations', {donor: this.state})
      .then(({data}) => {
        console.log(data)
        this.setState({organizaiton: data, registrationSuccessful: true})
      })
    }

  render() {
    if (this.state.registrationSuccessful) {
      return <Redirect to="/organizations/:id"/>
    } else {
      return (
        <div>
          <h2>Organization Registration</h2>
          <form onSubmit= { this.handleSubmit}>
            <input
              placeholder='Enter tax code'
              type="text"
              value={this.state.tax_code}
              onChange={this.handleTaxCodeChange} >
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
              placeholder='Enter Category'
              type="Category"
              value={this.state.category}
              onChange={this.handleCategoryChange} >
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
                Submit
            </button>
          </form>
        </div>
      )
    }
  }
}

export default OrganizationRegistration
