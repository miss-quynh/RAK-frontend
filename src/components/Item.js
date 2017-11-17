import React from 'react';

class Item extends React.Component {
  render() {
    return (
      <div className="item-container">
        <div className="item-image">
          <img src={this.props.itemInfo['url']} />
        </div>
        <div className='item-info'>
          <h3>{this.props.itemInfo['item']}</h3>
          <p>
          We need: {this.props.itemInfo['quantity_requested']}
          </p>
          <p>
          We have: {this.props.itemInfo['quantity_received']}
          </p>
        </div>
      </div>
    );
  }
}

export default Item