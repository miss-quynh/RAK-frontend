import React from 'react';
import axios from 'axios';
import Item from './Item';
import Organization from './Organization';
import NewProjectForm from './NewProjectForm';

class ProjectOrganizationShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projectInfo: {},
      items_requested: []
      // {item_name: '', quantity_requested: 1, quantity_achieved: 0}
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8181/organizations/${this.props.match.params.id}/projects/${this.props.match.params.id}`)
    .then( function(response) {
      console.log(response)
      const projectInfo = response.data["project"]
      const items = response.data["donations"]

      this.setState({projectInfo})
      this.setState({items})
    })
  }

  render() {
    return (
      <div className="project-organization-container">
        <div className="project-info">
          <h2>{this.state.projectInfo["project_name"]}</h2>
          {this.state.items.map((item) =>
            <Item itemInfo={item}/>
          )}
        </div>

        <div className="donations-list">
          <button onClick={this.props.toggleProjectFormState}>
            Request New Donation
          </button>
        </div>
      </div>
    );
  }
}

export default ProjectOrganizationShow;