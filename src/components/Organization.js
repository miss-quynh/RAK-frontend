import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Project from './Project';
import NewProjectForm from './NewProjectForm';

class Organization extends React.Component {

  constructor() {
    super();
    this.state = {
      projects: [],
      organizationInfo: {
        name: '',
        mission_statement: '',
        logo: ''
      },
      displayNewProjectForm: false
    };

    this.toggleProjectFormState = this.toggleProjectFormState.bind(this);
  }

  componentDidMount() {
    const currentContext = this
    fetch(`http://localhost:8181/organizations/${currentContext.props.match.params.id}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      currentContext.setState({ projects: data.projects, name: data.organization.organization_name, mission_statement: data.organization.mission_statement, logo: data.organization.organization_logo })
    })
  }

  toggleProjectFormState() {
    this.setState(prevState => ({
      displayNewProjectForm: !prevState.displayNewProjectForm
    }));
  }

  render() {
    return (
      <div className="organization-show-container">
        <div className="organization-info">
          <div className="organization-logo">
            <span>{this.state.logo}</span>
          </div>
          <h1>
            <span className="organization-name-header">{this.state.name}</span>
          </h1>

          <p className="organization-mission-statement">
            {this.state.mission_statement}
          </p>
        </div>

        <NewProjectForm
          organizationId={this.props.match.params.id}
          displayNewProjectForm={this.state.displayNewProjectForm}
          toggleProjectFormState={this.toggleProjectFormState}
        />

        <ul>
          {this.state.projects.map((project) => {
            return (
              <li><Link to={`/projects/${project.id}`}>{project.project_name}</Link></li>
            )
          }
          )}
        </ul>
      </div>
    );
  }
}

export default Organization;