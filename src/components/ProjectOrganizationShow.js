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
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios.get(`http://localhost:8181/projects/${this.props.match.params.project_id}`)
    .then((response) => {
      const newProjectInfo = response.data.project
      const items = response.data.donations
      this.setState({newProjectInfo, items})
    })
    .catch((error) => {console.log('Error in retrieving project.', error)})

    axios.get(`http://localhost:8181/organizations/${this.props.match.params.organization_id}`)
    .then((response) => {
      const organizationInfo = response.data.organization
      this.setState({organizationInfo})
    })
    .catch((error) => {console.log('Error in retrieving organization.', error)})
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
                <option value="food">Food</option>
                <option value="food">Water</option>
                <option value="food">Medicine</option>
                <option value="food">Volunteer service</option>
                <option value="food">Money</option>
                <option value="food">Housewares</option>
                <option value="food">Kitchenware</option>
                <option value="food">Small appliances</option>
                <option value="food">Clothing of all types</option>
                <option value="food">Baby items</option>
                <option value="food">Books</option>
                <option value="food">Toys</option>
                <option value="food">Books</option>
                <option value="food">Vehicle</option>
                <option value="food">Electronics</option>
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