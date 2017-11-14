import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import Project from './Project';
import ProjectOrganizationShow from './ProjectOrganizationShow';

class NewProjectForm extends React.Component {

  constructor() {
    super();
    this.state = {
      newProjectForm: {
        project_name: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        description: ''
      },
      formSubmitted: false,
      createdProjectId: null
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
    axios.post('http://localhost:8181/projects', {project: this.state.newProjectForm, organization_id: this.props.organizationId})
    .then(({data}) => {
      const newProjectForm = Object.assign({}, {...this.state.newProjectForm}, data)
      this.setState({newProjectForm, formSubmitted: true})
    })
  }

  render() {
    if(!this.props.displayNewProjectForm){
      return (
        <button onClick={this.props.toggleProjectFormState}>
          Create New Project
        </button>
    )} else if(this.props.displayNewProjectForm && !this.state.formSubmitted) {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.newProjectForm.project_name} onChange={(e) => this.handleChange(e, "project_name")} />
          </label>
          <label>
            Street Address:
            <input type="text" value={this.state.newProjectForm.street_address} onChange={(e) => this.handleChange(e, "street_address")} />
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
            <input type="text" pattern="[0-9]{5}" title="Five digit zip code" value={this.state.newProjectForm.zip_code} onChange={(e) => this.handleChange(e, "zip_code")} />
          </label>
          <label>
            Description:
            <input type="text" value={this.state.newProjectForm.description} onChange={(e) => this.handleChange(e, "description")} />
          </label>
          <input type="submit" value="Create New Project" />
        </form>
        )
      }
      if(this.state.formSubmitted) {
        return (
          <Redirect to={`/organizations/${this.props.organizationId}/projects/${this.state.newProjectForm.id}`} />
        )
      }
    <div>
      <ProjectOrganizationShow
        handleChange={this.handleChange}
      />
    </div>
  }
}

export default NewProjectForm;