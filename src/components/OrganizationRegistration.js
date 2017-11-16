import React from 'react';
import { Redirect } from 'react-router'
import axios from 'axios';

class OrganizationRegistration extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      orgData: {
        tax_code: '',
        email: '',
        category: '',
        password: ''
      },
      categories: [],
      registrationSuccessful: false,
      ValidEIN: false

    };

    this.categoriesCall = this.categoriesCall.bind(this)
    this.handleEINChange = this.handleEINChange.bind(this)
    this.handleEINSubmit = this.handleEINSubmit.bind(this)
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
    console.log(this.state)
    axios.post('http://localhost:8181/organizations/ein', {ein: this.state.orgData.tax_code})
        .then(({data}) => {
        console.log(data)
        })
  }


  handleEINCall(){
    const that = this
    axios.get('http://localhost:8181/organizations').then( function(response) {
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

  EINForm() {
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
    )
  }


  registrationData(){
    if (this.state.validEIN) {
      return(
        <div>
          <form>
            <h5>IEN: {this.state.tax_code}</h5>
            <label>Name</label>
            <input type="integer" placeholder='Zipcode' value={this.state.zipcode}/>
            <label>Email</label>
            <input placeholder='Email' type="email" value={this.state.email}/>
            <label>Category</label>
            <select>
              {this.state.categories.map( function (category) {
                return <option value={category}>{category}</option>
              } )
              }
            </select>
            <label>Password</label>
            <input placeholder ='Password' type="password" value={this.state.password}/>
            <input type='submit'/>
          </form>
        </div>
      )
    }
  }

  render() {
    if (this.state.registrationSuccessful) {
      return <Redirect to="/organizations/:id"/>
    } else {
        return (
          <div>
            <h2>Organization Registration</h2>
            {this.EINForm()}
            {this.registrationData()}
          </div>
        )
    }
  }
}

export default OrganizationRegistration
