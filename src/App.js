import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import './App.css';
// import './Home.css';
import Home from './components/Home';
import Donor from './components/Donor';
import Organization from './components/Organization';
import ProjectDisp from './components/ProjectDisp';
import OrganizationLogin from './components/OrganizationLogin';
import ProjectOrganizationShow from './components/ProjectOrganizationShow';
import ImageUpload from './components/ImageUpload'
import DonorLogin from './components/DonorLogin'
import DonorRegistration from './components/DonorRegistration'
import OrganizationRegistration from './components/OrganizationRegistration'

class App extends React.Component {

  render() {
    return(
      <Router>
        <div>
          <header>
            <Link to="/"><h1>RaK</h1></Link>
          </header>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/donors" component={Donor} />
            <Route exact path="/organizations/login" component={OrganizationLogin}/>
            <Route exact path="/organizations/:organization_id/projects/:project_id" component={ProjectOrganizationShow} />
            <Route path="/organizations/registration" component={OrganizationRegistration} />
            <Route path="/organizations/:id" component={Organization} />
            <Route path="/projects/:id" component={ProjectDisp} />
            <Route exact path="/image_upload" component={ImageUpload} />
            <Route exact path="/donors/login" component={DonorLogin} />
            <Route exact path="/donors/registration" component={DonorRegistration} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
