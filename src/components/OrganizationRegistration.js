import React from 'react';
import { Redirect } from 'react-router'
import axios from 'axios';

class OrganizationRegistration extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      orgData: {
        tax_code: '',
        organization_name: '',
        category: '',
        mission_statement:'',
        email: '',
        password: ''
      },
      categories: [],
      registrationSuccessfulID: false,
      ValidEIN: false,
      errors: []

    };

    this.categoriesCall = this.categoriesCall.bind(this)
    this.handleEINChange = this.handleEINChange.bind(this)
    this.handleEINSubmit = this.handleEINSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleOrgSubmit = this.handleOrgSubmit.bind(this)
    this.errorsConditional = this.errorsConditional.bind(this)
    this.handleImageUpdate = this.handleImageUpdate.bind(this)
  }

  categoriesCall(){
    const that = this
    axios.get('http://localhost:8181/filters').then( function(response) {
      let categories = response.data['categories']
      that.setState({categories})
    })
  }

  componentDidMount() {
    this.categoriesCall()
  }

  handleEINSubmit(event) {
    event.preventDefault()
    const that = this
    axios.post('http://localhost:8181/organizations/ein', {ein: this.state.orgData.tax_code})
        .then( function (response) {
          const orgData = that.state.orgData
          orgData.organization_name = response.data[0]['organization_name']
          orgData.mission_statement = response.data[0]['mission']
          that.setState({orgData})
          const validEIN = true
          that.setState({validEIN})
          const errors = []
          that.setState({errors})
        }).catch(function(error) {
          const errors = ["Invalid EIN"]
          that.setState({errors})
        })
  }

  handleEINCall(){
    const that = this
      axios.get('http://localhost:8181/organizations')
        .then(function (response) {
        const organizations = []
        response.data.map( organization => organizations.push(organization) )
        that.setState({organizations})
      })
  }

  handleEINChange(event){
    let orgData = this.state.orgData
    orgData.tax_code = (event.target.value)
    this.setState({orgData})
  }

  handleChange(type, e){
    const orgData = this.state.orgData
    orgData[type] = e.target.value
    this.setState({orgData})
  }

  handleImageUpdate(event) {
    let file = event.target.files[0]
    this.setState({
      orgData: Object.assign({}, this.state.orgData, {avatar: file})
    })
  }

  EINForm() {
    if(!this.state.validEIN){
      return(
        <form onSubmit={this.handleEINSubmit}>
          <label>Employer Identification Number: </label>
          <input
            placeholder='XX-XXXXXX'
            type="text"
            value={this.state.EIN}
            onChange={this.handleEINChange} />
          <input type="submit" />
        </form>
    )}
  }

  convertStateToOrgCreate() {
    // const params = {organization: this.state.orgData, category: this.state.orgData['category']}
    // delete params.organization['category']
    // return params

    let data = new FormData()
    data.append("organization[avatar]", this.state.orgData.avatar)
    data.append("organization[organization_name]", this.state.orgData.organization_name)
    data.append("organization[tax_code]", this.state.orgData.tax_code)
    data.append("organization[mission_statement]", this.state.orgData.mission_statement)
    data.append("organization[email]", this.state.orgData.email)
    data.append("organization[password]", this.state.orgData.password)
    data.append("category", this.state.orgData.category)

    return data
  }

  handleOrgSubmit(event) {
    event.preventDefault()
    const that = this
    axios.post('http://localhost:8181/organizations', this.convertStateToOrgCreate() ).then(function(response) {
      const registrationSuccessfulID = response.data.organization.id
      that.setState({registrationSuccessfulID})
    }).catch(function (error) {
        const errors = error.response.data.errors
        console.log(error)
        that.setState({errors})
    })

  }

  registrationData(){
    if (this.state.validEIN) {
      return(
        <div>
          <form onSubmit={this.handleOrgSubmit}>
            <h5>IEN: {this.state.orgData.tax_code}</h5>
            <label>Name</label>
            <input
              type="text"
              value={this.state.orgData.organization_name}
              onChange={(e) => this.handleChange('organization_name', e)}/>
            <label>Category</label>
            <select onChange={(e) => this.handleChange('category', e)}>
              <option>Select a category</option>
              {this.state.categories.map( function (category) {
                return <option value={category}>{category}</option>
                })
              }
            </select><br/>
            <label>Mission Statement</label>
            <input
              type="text"
              size="100"
              value={this.state.orgData.mission_statement}
              onChange={(e) => this.handleChange('mission_statement', e)}/><br/>
            <label>Email</label>
            <input
              type="email"
              value={this.state.orgData.email}
              onChange={(e) => this.handleChange('email', e)}/>
            <label>Password</label>
            <input
              type="password"
              value={this.state.orgData.password}
              onChange={(e) => this.handleChange('password', e)}/>
              <div>
              <label>Upload Photo</label><br/>
              <input type="file" onChange={this.handleImageUpdate}/>
              <img src={"http://localhost:8181" + this.state.imageUrl} />
              </div>
              <input type='submit'/>
              </form>
        </div>
      )
    }
  }

  errorsConditional(){

    if (this.state.errors.length > 0) {
      return (
        <ul>
        {this.state.errors.map(error =>
          <li>{error}</li>
        )}
        </ul>
    )}
  }

  render() {
    if (this.state.registrationSuccessfulID) {
      return <Redirect to={`/organizations/${this.state.registrationSuccessfulID}`}/>
    } else {
        return (
          <div>
            <h2>Organization Registration</h2>
            {this.EINForm()}
            {this.registrationData()}
            {this.errorsConditional()}
          </div>
        )
    }
  }
}

export default OrganizationRegistration
