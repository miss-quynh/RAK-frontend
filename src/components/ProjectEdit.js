import React from 'react';
import axios from 'axios';
import ProjectOrganizationShow from './ProjectOrganizationShow';

class ProjectEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projectInfo: {
        project_name: this.props.newProjectInfo.project_name,
        street_address: this.props.newProjectInfo.street_address,
        city: this.props.newProjectInfo.city,
        state: this.props.newProjectInfo.state,
        zip_code: this.props.newProjectInfo.zip_code,
        description: this.props.newProjectInfo.description
      }
    }

    this.updateField = this.updateField.bind(this)
  }

  updateField(event, fieldName) {
    this.setState({ projectInfo: {[fieldName]: event.target.value }})
  }

  render() {
    return(
      <div className="project-edit-container">
        <div className="project-edit">
          <form onSubmit={(e) => this.props.submitEdits(this.state.projectInfo)} className="project-edit-form">
            <input onChange={(e) => this.updateField(e, "project_name")} type="text" value={this.state.projectInfo.project_name} />
            <input onChange={(e) => this.updateField(e, "street_address")} type="text" value={this.state.projectInfo.street_address} />
            <input onChange={(e) => this.updateField(e, "city")} type="text" value={this.state.projectInfo.city} />
            <input onChange={(e) => this.updateField(e, "state")} type="text" value={this.state.projectInfo.state} />
            <input onChange={(e) => this.updateField(e, "zip_code")} type="text" value={this.state.projectInfo.zip_code} />
            <input onChange={(e) => this.updateField(e, "description")} type="text" value={this.state.projectInfo.description} />

          <div className="update-project">
            <button className="update-project-button">
              Update Project
            </button>
          </div>
          </form>
        </div>
      </div>
    )
  }

}

export default ProjectEdit;