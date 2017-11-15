import React from 'react';
import axios from 'axios';
import Item from './Item';
import Organization from './Organization';
import NewProjectForm from './NewProjectForm';

class ProjectOrganizationShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      organizationInfo: {},
      newProjectInfo: {
        project_name: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        description: ''
      },
      items: [],
      itemsOptions: []
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.projectsCall = this.projectsCall.bind(this)
    this.organizationsCall = this.organizationsCall.bind(this)
    this.donationTypesCall = this.donationTypesCall.bind(this)
  }

  projectsCall() {
    axios.get(`http://localhost:8181/projects/${this.props.match.params.project_id}`)
    .then((response) => {
      const newProjectInfo = response.data.project
      const items = response.data.donations
      this.setState({newProjectInfo, items})
    })
    .catch((error) => {console.log('Error in retrieving projects.', error)})
  }

  organizationsCall() {
    axios.get(`http://localhost:8181/organizations/${this.props.match.params.organization_id}`)
    .then((response) => {
      const organizationInfo = response.data.organization
      this.setState({organizationInfo})
    })
    .catch((error) => {console.log('Error in retrieving organizations.', error)})
  }

  donationTypesCall() {
    axios.get('http://localhost:8181/filters')
    .then((response) => {
      const itemsOptions = response.data.donation_type
      this.setState({itemsOptions})
    })
    .catch((error) => {console.log('Error in retrieving donation types.', error)})
  }

  componentDidMount() {
    this.projectsCall();
    this.organizationsCall();
    this.donationTypesCall();
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('http://localhost:8181/donations', {items: this.state.items, project_id: this.props.match.params.project_id})
    .then(({data}) => {
      console.log(data.data)
      const thing = 'stuff'
      this.setState({items: data})
    })
  }

  render() {
    return (
      <div className="project-organization-container">
        <div className="organization-info">
          <p>{this.state.organizationInfo.organization_logo}</p>
        </div>

        <div className="project-info">
          <form>
            <textarea type="text" value={this.state.newProjectInfo.project_name} />
            <textarea type="text" value={this.state.newProjectInfo.street_address} />
            <textarea type="text" value={this.state.newProjectInfo.city} />
            <textarea type="text" value={this.state.newProjectInfo.state} />
            <textarea type="text" value={this.state.newProjectInfo.zip_code} />
            <textarea type="text" value={this.state.newProjectInfo.description} />
          </form>

          <div className="donations-list">
            <form>
              <button onClick={this.handleSubmit}>
                Add
              </button>

              <select>
                {this.state.itemsOptions.map((option) => {
                  return (
                    <option value="{option}">{option}</option>
                  )
                })}
              </select>

              <input type="number" placeholder="Quantity needed" value={this.state.newProjectInfo.quantity_requested} />
              <input type="number" placeholder="Quantity received" value={this.state.newProjectInfo.quantity_received} />

              {this.state.items.map((item) => {
                return (
                  <div>
                    <input type="text" value={item.item} />
                    <input type="number" value={item.quantity_requested} />
                    <input type="number" value={item.quantity_received} />
                  </div>
                )
              }
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectOrganizationShow;