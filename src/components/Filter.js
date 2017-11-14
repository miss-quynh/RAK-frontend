import React from 'react';
import axios from 'axios';

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
        filters: {
          categories: [],
          events: [],
          types: []
        },
      view: ""
    }

    this.handleFilterClick = this.handleFilterClick.bind(this)
  }

  filtersCall() {
    const that = this
    axios.get('http://localhost:8181/projects').then( function(response) {
      const projects = []
      response.data.map( project => projects.push(project) )
      that.setState({projects})
    })
  }

  componentDidMount() {
`    // this.projectsCall();
    // this.organizationsCall();`
  }


  handleFilterClick(filter) {
    let view = this.state.view
    view = filter
    this.setState({view})
  }

  render() {
    return (
      <div>
        <button onClick={ () => this.handleFilterClick('Category')}>Category</button>
        <button onClick={ () => this.handleFilterClick('Location')}>Location</button>
        <button onClick={ () => this.handleFilterClick('Event')}>Event</button>
        <button onClick={ () => this.handleFilterClick('Type of Donation')}>Donation Type</button>
        <form>

        </form>
      </div>
    );
  }
}

export default Filter
