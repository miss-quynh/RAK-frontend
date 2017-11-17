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
    this.setState({ quantity_received: {[fieldName]: event.target.value }})
  }

  render() {
    return(
      <div className="edit-quantity-received-container">
        <form>
          <input onChange={(e) => this.updateField(e, "quantity_received")} type="number" value={this.state.quantity_received} />
        </form>
      </div>
    )
  }

}

export default ItemEdit;