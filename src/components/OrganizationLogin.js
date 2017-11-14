import React from 'react';
import axios from 'axios';

class OrganizationLogin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();

    var currentContext = this;
    this.serverRequest = axios
    .post("localhost:8181/organization_token", {
      "auth": {
        "email": this.state.email
      }
      // .then(function (response) {
      //   console.log(response);
      //   if (response.data.code == 201){
      //     console.log("Success")
      //   }
      // })
    }
    // this.props.onSubmit(
    //   this.state.email
    );
  }
  render() {
    return (
      <div>
        <form onSubmit = {this.handleSubmit}>
          <label htmlFor = 'email'> {this.props.label} </label>
          <input
            placeholder = 'Enter email'
            type = 'email'
            value = {this.state.email}
            onChange = {this.handleChange}
            ></input>
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

export default OrganizationLogin
