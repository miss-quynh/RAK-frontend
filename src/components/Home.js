import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Icon, Card, CardTitle, Row, Col } from 'react-materialize';

class Home extends React.Component {
  render() {
    return (
      <div className="options-container">
        <div className="donor-routes">
          <Link className="donor-text" to="/donors/login">Donor</Link>
        </div>
        <div className="organization-routes">
          <Link className="organization-text" to="/organizations/login">Organization</Link>
        </div>
      </div>
    );
  }
}

export default Home;
