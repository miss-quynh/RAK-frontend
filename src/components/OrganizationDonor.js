import React from 'react';

class OrganizationDonor extends React.Component {

  render() {
    return (
      <div>
        <h3>{this.props.orgInfo["organization_name"]}</h3>
        <p className="orgs-mission-statement">
          Mission Statement: {this.props.orgInfo["mission_statement"]}
        </p>
        <p>
          <a href={this.props.orgInfo["url"]}>{this.props.orgInfo["url"]}</a>
        </p>
      </div>
    );
  }
}
export default OrganizationDonor;