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
      currentContext.setState({ projects: data.projects, name: data.organization.organization_name, mission_statement: data.organization.mission_statement, logo: data.organization.organization_logo })
      this.setState({ projects: data.projects, name: data.organization.organization_name, mission_statement: data.organization.mission_statement, logo: data.image_url })
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
        <div className="organization-container">
          <div className="organization-logo">
            {this.state.logo && <img src={"http://localhost:8181" + this.state.logo } />}
          </div>

          <div className="organization-info">
            <span className="organization-name-header">{this.state.name}</span>
            <p className="organization-mission-statement">
              {this.state.mission_statement}
            </p>
          </div>

        </div>

        <div className="projects-list-container">
          <NewProjectForm
            organizationId={this.props.match.params.id}
            displayNewProjectForm={this.state.displayNewProjectForm}
            toggleProjectFormState={this.toggleProjectFormState}
          />

          <ul>
            {this.state.projects.map((project) => {
              return (
                <div className="projects-container">
                  <div className="projects-list-one">
                    <li><Link className="project-link-one" to={`/projects/${project.id}`}>{project.project_name}</Link></li>
                  </div>
                {/* sample for demo only !!!! */}
                  <div className="projects-list-two">
                    <li className="project-link-two">Turkey Trot</li>
                  </div>
                </div>
              )
            }
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Organization;
