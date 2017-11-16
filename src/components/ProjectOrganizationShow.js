import React from 'react';
import axios from 'axios';
import Item from './Item';

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
      donations: [],
      donationTypes: [],
      newDonation: {
        quantity_requested: '',
        quantity_received: '',
        project_id: this.props.match.params.project_id
      },
      itemNameInput: '',
      donationTypeInput: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.projectsCall = this.projectsCall.bind(this)
    this.organizationsCall = this.organizationsCall.bind(this)
    this.donationTypesCall = this.donationTypesCall.bind(this)
    this.updateQuantityRequested = this.updateQuantityRequested.bind(this)
    this.updateQuantityReceived = this.updateQuantityReceived.bind(this)
    this.updateItemNameInput = this.updateItemNameInput.bind(this)
    this.updateDonationTypeInput = this.updateDonationTypeInput.bind(this)
    this.removeItemButton = this.removeItemButton.bind(this)
  }

  projectsCall() {
    axios.get(`http://localhost:8181/projects/${this.props.match.params.project_id}`)
    .then((response) => {
      const newProjectInfo = response.data.project
      const donations = response.data.donations
      this.setState({newProjectInfo, donations})
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
      const donationTypes = response.data.donation_type
      this.setState({donationTypes})
    })
    .catch((error) => {console.log('Error in retrieving donation types.', error)})
  }

  componentDidMount() {
    this.projectsCall();
    this.organizationsCall();
    this.donationTypesCall();
  }

  updateQuantityRequested(event) {
    this.setState({
      newDonation: Object.assign({}, this.state.newDonation, {quantity_requested: event.target.value})
    })
  }

  updateQuantityReceived(event) {
    this.setState({
      newDonation: Object.assign({}, this.state.newDonation, {quantity_received: event.target.value})
    })
  }

  updateItemNameInput(event) {
    this.setState({
      itemNameInput: event.target.value
    })
  }

  updateDonationTypeInput(event) {
    this.setState({
      donationTypeInput: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('http://localhost:8181/donations', {donation: this.state.newDonation, item_name: this.state.itemNameInput, donation_type: this.state.donationTypeInput})
    .then(({data}) => {
      let donations = this.state.donations
      donations.push({item: data.item.item_name, quantity_received: data.donation.quantity_received, quantity_requested: data.donation.quantity_requested})
      this.setState({donations, itemNameInput: '', newProjectInfo: {quantity_requested: '', quantity_received: ''}})
    })
    .catch((error) => {console.log('Error in creating a new item.', error)})
  }

  removeItemButton(event) {
    event.preventDefault()
    console.log(event.target.id)
    axios.delete(`http://localhost:8181/donations/${event.target.id}`)
    .then((response) => {
      console.log(response)
      const donations = response.data
      this.setState({donations})
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
              <button className="add-item-button" onClick={this.handleSubmit}>
                Add
              </button>

              <select onChange={this.updateDonationTypeInput}>
                <option value="">Select Donation Type</option>
                {this.state.donationTypes.map((option) => {
                  return (
                    <option value={option}>{option}</option>
                  )
                })}
              </select>

              <input onChange={this.updateItemNameInput} type="text" placeholder="Item needed" value={this.state.itemNameInput} />
              <input onChange={this.updateQuantityRequested} type="number" placeholder="Quantity needed" value={this.state.newProjectInfo.quantity_requested} />
              <input onChange={this.updateQuantityReceived}type="number" placeholder="Quantity received" value={this.state.newProjectInfo.quantity_received} />

              {this.state.donations.map((item) =>
                  <div className="item-display">
                    <button className="remove-item-button" id={item.id} onClick={this.removeItemButton} >
                      Remove
                    </button>

                    <input type="text" value={item.item} />
                    <input type="number" value={item.quantity_requested} />
                    <input type="number" value={item.quantity_received} />
                  </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectOrganizationShow;