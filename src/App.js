import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import './App.css';
import './Home.css';
import './OrganizationShow.css';
import './RegistrationForm.css';

import Home from './components/Home';
import Donor from './components/Donor';
import Organization from './components/Organization';
import ProjectDisp from './components/ProjectDisp';
import OrganizationLogin from './components/OrganizationLogin';
import ProjectOrganizationShow from './components/ProjectOrganizationShow';
import DonorLogin from './components/DonorLogin';
import ProjectEdit from './components/ProjectEdit';
import DonorRegistration from './components/DonorRegistration';
import OrganizationRegistration from './components/OrganizationRegistration';
import Logout from './components/Logout';


class App extends React.Component {

  constructor () {
    super()

    this.state = {
      auth_token: window.localStorage.getItem('auth_token')
    }

    this.updateAuthToken = this.updateAuthToken.bind(this)
    this.checkAuthStatus = this.checkAuthStatus.bind(this)

  }

  updateAuthToken (current_auth) {
    this.setState({auth_token: current_auth})
  }

  checkAuthStatus () {
    console.log('in authSta')
    if(this.state.auth_token !== null){
    }
    return null
  }

  render() {
    return(
      <Router>
        <div>

          <div className="navigation-bar">
            <Link className="navigation-text" to="/">RÄK</Link>
            <Logout updateAuthToken={this.updateAuthToken} auth_token={this.state.auth_token} />
          </div>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/organizations/:organization_id/projects/:project_id" component={ProjectOrganizationShow} />
            <Route path="/organizations/registration" component={OrganizationRegistration} />
            <Route path="/projects/:id" component={ProjectDisp} />
            <Route exact path="/donors" render={(props) => (
              <Donor
                {...props}
                auth_token={this.state.auth_token}
              />
            )} />
            <Route exact path="/organizations/login" render={(props) => (
              <OrganizationLogin
                {...props}
                auth_token={this.state.auth_token}
                updateAuthToken={this.updateAuthToken}
              />
            )} />
            <Route exact path="/donors/login" render={(props) => (
              <DonorLogin
                {...props}
                auth_token={this.state.auth_token}
                updateAuthToken={this.updateAuthToken}
              />
            )} />
            <Route exact path="/donors/registration" render={(props) => (
              <DonorRegistration
                {...props}
                auth_token={this.state.auth_token}
                updateAuthToken={this.updateAuthToken}
              />
            )} />
            <Route path="/organizations/:id" component={Organization} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>

        </div>
      </Router>
    )
  }
}

export default App;
