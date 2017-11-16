import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div className="options-container">
        <ul>
          <li><Link className="options-routes" to="/donors/login">Donor</Link></li>
          <li><Link className="options-routes" to="/organizations/login">Organization</Link></li>
        </ul>
        <div className="donor-routes">
          <Link className="donor-text" to="/donors">Donor</Link>
        </div>
        <div className="organization-routes">
          <Link className="organization-text" to="/organizations">Organization</Link>
        </div>
      </div>
    );
  }
}

export default Home;
