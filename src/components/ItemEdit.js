import React from 'react';
import axios from 'axios';
import ProjectOrganizationShow from './ProjectOrganizationShow';

class ItemEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quantity_received: this.props.newDonation.quantity_received
    }

    this.updateField = this.updateField.bind(this)
  }

  updateField(event, fieldName) {
    this.setState({ projectInfo: {[fieldName]: event.target.value }})
  }

  render() {
    return(

    )
  }

}

export default ItemEdit;