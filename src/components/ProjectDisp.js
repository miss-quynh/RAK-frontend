import React from 'react';
import axios from 'axios';

import Item from './Item'

class ProjectDisp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projectInfo: {},
      items:[]
    }
  }

  componentDidMount() {
    const that = this
    axios.get(`http://localhost:8181/projects/${that.props.match.params.id}`).then( function(response) {
      console.log(response)
      const projectInfo = response.data["project"]
      const items = response.data["donations"]

      that.setState({projectInfo})
      that.setState({items})
    })
  }

  render() {
    return (
      <div>
        <div className="project-info">
          <h2>{this.state.projectInfo["project_name"]}</h2>
          {this.state.items.map((item) =>
            <Item itemInfo={item}/>
          )}
        </div>
      </div>
    );
  }
}
export default ProjectDisp;