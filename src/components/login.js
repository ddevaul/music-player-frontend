import React from "react";
import { Redirect } from 'react-router'

export default class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      message: "",
      redirect: false,
    }
  }
  // save the value in the username input div in state
  usernameChange = (event) => {
    this.setState({ username: event.target.value })
  }
  // save the value in the password input div in state
  passwordChange = (event) => {
    this.setState({ password: event.target.value })
  }
  // send input information to backend and attempt to get refresh and access
  // tokens, if not, report an error
  login = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_name: this.state.username, password: this.state.password })
    }
    const response = await fetch('http://localhost:8000/api/token/', requestOptions)
    const jResponse = await response.json();
    if(response.status === 200) {
      this.setState({message: "Logged In", redirect: true});
      localStorage.setItem("refresh", jResponse.refresh);
      localStorage.setItem("access", jResponse.access);
      localStorage.setItem("username", this.state.username);
      // reload the page to redirect them
      window.location.reload();
    } 
    else {
      this.setState({ message: "There was a problem. Make sure you entered the correct username and password" });
    }
  }

  render() {
    const divStyle = {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgb(45, 45, 45)',

    }
    const titleStyle = {
      color: 'white',
    }
    const formStyle = {
      display: 'flex',
      flexDirection: 'column'
    }
    const inputStyle = {
      margin: '0.5rem',
    }
    const buttonStyle = {
      margin: 'auto',
      marginTop: '0.5rem',
      width: '50%',
      height: '2rem',
    }
    if (this.state.redirect) {
      return (<Redirect to="/music-player/"></Redirect>)
    }
    return (
      <div style={divStyle}>
        <h1 style={titleStyle}>Desi's Music App</h1>
        <h3 style={titleStyle}>{this.state.message}</h3>
        <form style={formStyle} onSubmit={this.login}>
          <input style={inputStyle} value={this.state.username} onChange={this.usernameChange} placeholder="Username"></input>
          <input style={inputStyle} value={this.state.password} onChange={this.passwordChange} placeholder="Password" type="password"></input>
          <input style={buttonStyle} type="submit" value="Login"></input>
        </form>
        <a href="/#/signup">Signup</a>
      </div>
    )
  }
}