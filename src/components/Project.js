import React from 'react';
import {Link} from 'react-router-dom';

class Project extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="project-continer-donor">
        <h3><Link to={`/projects/${this.props.projectInfo['id']}`} className="project-name">{this.props.projectInfo["project_name"]}</Link></h3>
        <p className="project-description">{this.props.projectInfo["description"]}</p>
        <p className="project-location">{this.props.projectInfo["city"]} | {this.props.projectInfo["state"]}</p>
      </div>
    );
  }
}

export default Project;
