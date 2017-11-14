import React from 'react';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import Project from './Project';

class NewProjectForm extends React.Component {

  constructor() {
    super();
    this.state = {
      newProjectForm: {
        name: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        description: ''
      },
      formSubmitted: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, fieldName) {
    const newProjectForm = {...this.state.newProjectForm}
    newProjectForm[fieldName] = event.target.value
    this.setState({newProjectForm});
  }

  handleSubmit(event) {
    event.preventDefault()
    const formText = `?newProjectForm[fieldName]=${this.state.newProjectForm}`
    fetch('http://localhost:8181/organizations/1' + formText, {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      const newProjectForm = {...this.state.newProjectForm}
      newProjectForm.push(data)
      this.setState({newProjectForm})
      this.setState({formSubmitted: true})
    })

  }

  render() {
    if(this.props.displayNewProjectForm === false){
      return (
        <button onClick={this.props.toggleProjectFormState}>
          Add New Project
        </button>
    )} else if(this.props.displayNewProjectForm === true && this.state.formSubmitted === false) {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.newProjectForm.name} onChange={(e) => this.handleChange(e, "name")} />
          </label>
          <label>
            Street Address:
            <input type="text" value={this.state.newProjectForm.streetAddress} onChange={(e) => this.handleChange(e, "streetAddress")} />
          </label>
          <label>
            City:
            <input type="text" value={this.state.newProjectForm.city} onChange={(e) => this.handleChange(e, "city")} />
          </label>
          <label>
            State:
            <input type="text" value={this.state.newProjectForm.state} onChange={(e) => this.handleChange(e, "state")} />
          </label>
          <label>
            Zip Code:
            <input type="text" pattern="[0-9]{5}" title="Five digit zip code" value={this.state.newProjectForm.zipCode} onChange={(e) => this.handleChange(e, "zipCode")} />
          </label>
          <label>
            Description:
            <input type="text" value={this.state.newProjectForm.description} onChange={(e) => this.handleChange(e, "description")} />
          </label>
          <input type="submit" value="Create New Project" />
        </form>
        )
      }
      if(this.state.formSubmitted === true) {
        {alert('some shit')}
        return (
          <Redirect to="/organizations/1/projects/1" />
        )
      }

      return (<div>aksdfjklj</div>)
  }
}

export default NewProjectForm;