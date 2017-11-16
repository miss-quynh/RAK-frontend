import React from 'react';
import { Redirect } from 'react-router'
import axios from 'axios';

class Logout extends React.Component {

  constructor(){
    super();

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout () {
    console.log('in handleLogout')
    this.props.updateAuthToken(window.localStorage.removeItem('auth_token'))
  }

  render() {
    return (
      <div>
        <button onClick={this.handleLogout} >Logout</button>
      </div>
    )
  }
}

export default Logout
