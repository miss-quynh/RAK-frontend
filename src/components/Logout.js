import React from 'react';
import { Redirect } from 'react-router'
import axios from 'axios';

class Logout extends React.Component {

  constructor(){
    super();

    this.state = {
      logout: false
    }

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout () {
    console.log('in handleLogout')
    window.localStorage.removeItem('auth_token')
    this.props.updateAuthToken(null)
    const logout = true
    this.setState({logout})
  }

  render() {
    if(this.props.auth_token === null) {
      return null
    }
    if(this.state.logout === true){
      console.log('go bhome fucker')
      return <Redirect to="/" />
    }
    return (
      <div>
        <button onClick={this.handleLogout} >Logout</button>
      </div>
    )
  }
}

export default Logout
