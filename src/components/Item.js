import React from 'react';

class Item extends React.Component {
  render() {
    return (
      <div>
        {console.log(this.props)}
        <h3>{this.props.itemInfo['item']}</h3>
        <p>
          We need: {this.props.itemInfo['quantity_requested']}
        </p>
        <p>
          We have: {this.props.itemInfo['quantity_received']}
        </p>
      </div>
    );
  }
}

export default Item