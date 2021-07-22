import React from "react";
import Button from "react-bootstrap/Button";
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Redirect } from 'react-router'

// settings page that at the moment just lets users navigate to login/logout 
// and signup pages depending on whether the user is currently signed in or not
export default class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    }
  }

  logout = () => {
    localStorage.clear();
    this.setState({ redirect: true });
  }

  render() {
    const divStyle = {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgb(45, 45, 45)',
      color: 'white',
      padding: '1rem'
    }
    const headerDivStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    }

    const backButtonDivStyle = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '100%',
    }

    if (this.state.redirect) {
      return(
        <Redirect to="/music-player/#/login"></Redirect>
      );
    }

    let loginLogoutSignup = 
    <div>
        <a href="/music-player/#/login">
          <Button variant="secondary">Login</Button>
        </a>
        <a href="/music-player/#/signup">
          <Button variant="secondary">Signup</Button>
        </a>
    </div>
    if (localStorage.getItem('access')){
      loginLogoutSignup = 
        <Button variant="secondary" onClick={this.logout}>Logout</Button>
    }
    return (
      <div style={divStyle}>
        <div style={headerDivStyle}>
          <div style={backButtonDivStyle}>
            <a href="/music-player/#/">
              <Button variant="secondary"><ArrowBack></ArrowBack></Button>
            </a>
          </div>
         <h1>Settings</h1>
        </div>
        {loginLogoutSignup}
        <div>Created By Desi DeVaul</div>
      </div>
    )
  }
}