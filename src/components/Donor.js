import React from 'react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

import Filter from './Filter';
import Project from './Project';
import OrganizationDonor from './OrganizationDonor';
import axios from 'axios';


class Donor extends React.Component {

  constructor() {
    super();
    this.state = {
      projects: [],
      organizations: [],
      view: "projects",
      filterView: "",
      filterOptions: {
        categories: [],
        events: [],
        donationType: []
      },
      filters: {
        categories: [],
        zipcode: "",
        events: [],
        type: []
      },
    }

    this.filterCall = this.filterCall.bind(this)
    this.projectsCall = this.projectsCall.bind(this)
    this.conditionalTabShow = this.conditionalTabShow.bind(this)
    this.handleProjectsClick = this.handleProjectsClick.bind(this)
    this.handleOrganizationsClick = this.handleOrganizationsClick.bind(this)
    this.filterConditional = this.filterConditional.bind(this)
    this.categoriesChanged = this.categoriesChanged.bind(this)
    this.handleFilterClick = this.handleFilterClick.bind(this)
    this.locationChanged = this.locationChanged.bind(this)
    this.eventsChanged = this.eventsChanged.bind(this)
    this.donationTypeChanged = this.donationTypeChanged.bind(this)
  }

  projectsCall() {
    const that = this
    axios.get('http://localhost:8181/projects').then( function(response) {
      const projects = []
      response.data.map( project => projects.push(project) )
      that.setState({projects})
    })
  }

  organizationsCall(){
    const that = this
    axios.get('http://localhost:8181/organizations').then( function(response) {
      const organizations = []
      response.data.map( organization => organizations.push(organization) )
      that.setState({organizations})
    })
  }

  filterCall(){
    const that = this
    axios.get('http://localhost:8181/filters').then( function(response) {
      const filterOptions = response.data
      that.setState({filterOptions})
    })
  }

  componentDidMount() {
    this.projectsCall();
    this.organizationsCall();
    this.filterCall();
  }

  handleProjectsClick() {
    let view = this.state.view
    view = "projects"
    this.setState({view})
  }

  handleOrganizationsClick() {
    let view = this.state.view
    view = "organizations"
    this.setState({view})
  }

  conditionalTabShow () {

    if(this.state.view === 'projects'){
    return (
        <div className="donor-view-list-container">
          <ul>
            { this.state["projects"].map((project) =>
              <li><Project projectInfo={project}/></li>
            )}
          </ul>
        </div>
      )
    }
    if(this.state.view === 'organizations') {
      return (
        <div className="donor-view-list-container">
          <ul>
            { this.state["organizations"].map((organization) =>
              <li><OrganizationDonor orgInfo={organization}/></li>
            )}
          </ul>
        </div>
      )
    }
  }


  filterConditional () {
    if (this.state.filterView === 'Category') {
      return (
      <CheckboxGroup
        name="categories"
        value={this.state.filters.categories}
        onChange={this.categoriesChanged} >
          {this.state.filterOptions.categories.map(category =>
            <label><Checkbox value={category}/>{category}</label>
          )}
      </CheckboxGroup>
    )}
    if (this.state.filterView === 'Location') {
      return (
        <label><input type="text" value={this.state.filters.zipcode} onChange={this.locationChanged} placeholder="Zip Code" /></label>
      )
    }
    if (this.state.filterView === 'Event') {
      return (
        <CheckboxGroup
        name="events"
        value={this.state.filters.events}
        onChange={this.eventsChanged} >
          {this.state.filterOptions.events.map(event =>
            <label><Checkbox value={event}/>{event}</label>
          )}
      </CheckboxGroup>
      )
    }
    if (this.state.filterView === 'Type of Donation') {
      return (
        <CheckboxGroup
        name="donationType"
        value={this.state.filters['donation_type']}
        onChange={this.donationTypeChanged} >
          {this.state.filterOptions['donation_type'].map(donationType =>
            <label><Checkbox value={donationType}/>{donationType}</label>
          )}
      </CheckboxGroup>
      )
    }
  }

  categoriesChanged(newCategories){
    let filters = this.state.filters
    filters.categories = newCategories
    this.setState({filters})
    console.log(this.state)
  }

  locationChanged(newLocation){
    let filters = this.state.filters
    filters.zipcode = newLocation.target.value
    this.setState({filters})
  }

  eventsChanged(newEvents){
    let filters = this.state.filters
    filters.events = newEvents
    this.setState({filters})
  }

  donationTypeChanged(newType){
    let filters = this.state.filters
    filters.donationType = newType
    this.setState({filters})
  }

  handleFilterClick(filter) {
    let filterView = this.state.filterView
    if (filterView === filter) {
      filterView = ""
    }else{
    filterView = filter}

    this.setState({filterView})
    console.log(this.state.filterView)
  }

  handleFilterSubmit() {

  }

  render() {
    return (
      <div>
        <div className="proj-org-btn-container">
          <button className="tab" onClick={this.handleProjectsClick}>Projects</button>
          <button className="tab" onClick={this.handleOrganizationsClick}>Organizations</button>
        </div>
        <div className="filter-container">
          <button onClick={ () => this.handleFilterClick('Category')}>Category</button>
          <button onClick={ () => this.handleFilterClick('Location')}>Location</button>
          <button onClick={ () => this.handleFilterClick('Event')}>Event</button>
          <button onClick={ () => this.handleFilterClick('Type of Donation')}>Donation Type</button>
          <button onSubmit={this.handleFilterSubmit}>Search</button>
        </div>
        <div className="filter-categories">
          {this.filterConditional()}
        </div>
        <div>
          {this.conditionalTabShow()}
        </div>
      </div>
    );
  }
}

export default Donor;


