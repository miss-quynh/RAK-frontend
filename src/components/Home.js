import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div className="options-container">
        <ul>
          <li><Link className="options-routes" to="/donors">Donor</Link></li>
          <li><Link className="options-routes" to="/organizations">Organization</Link></li>
        </ul>
      </div>
    );
  }
}

export default Home;