import React from "react";
import { Redirect } from 'react-router'

export default class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: "",
      firstname: "",
      email: "",
      password: "",
      confirmation: "",
      message: "",
      redirect: false,
    }
  }
  // save the value in the username input div in state
  usernameChange = (event) => {
    this.setState({ username: event.target.value })
  }
  // save the value in the first name input div in state
  firstnameChange = (event) => {
    this.setState({ firstname: event.target.value })
  }
  // save the value in the email input div in state
  emailChange = (event) => {
    this.setState({ email: event.target.value })
  }
  // save the value in the password input div in state
  passwordChange = (event) => {
    this.setState({ password: event.target.value })
  }
  // save the value in the password confirmation input div in state
  confirmationChange = (event) => {
    this.setState({ confirmation: event.target.value })
  }

  // perform checks to make sure inputs are valid and then send information
  // to backend to see if 201 status is returned, which means the user has been
  // created
  signup = async (event) => {
    if (this.state.password !== this.state.confirmation) {
      this.setState({ message: "Passwords must match" });
    }
    else if (this.state.password.length < 8 || this.state.password.length >= 128) {
      this.setState({ message: "Password must be between 8 and 128 characters." });
    }
    else {
      event.preventDefault();
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name: this.state.username, password: this.state.password, email: this.state.email })
      }
      const response = await fetch('http://localhost:8000/api/signup/create/', requestOptions)
      if (response.status === 201) {
        this.setState({ message: "Signed up" , redirect: true});
      } 
      else if (response.status === 500) {
        this.setState({ message: "The username or email is taken, try another." });
      }
      else {
        this.setState({ message: "Try a different password, minimum 8 characters." });
      }
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
      return (<Redirect to="/music-player/#/login"></Redirect>)
    }

    return (
      <div style={divStyle}>
        <h1 style={titleStyle}>Desi's Music App</h1>
        <h3 style={titleStyle}>{this.state.message}</h3>
        <form style={formStyle} onSubmit={this.signup}>
          <input style={inputStyle} value={this.state.username} onChange={this.usernameChange} placeholder="Username"></input>
          <input style={inputStyle} value={this.state.email} onChange={this.emailChange} placeholder="Email" type="email"></input>
          <input style={inputStyle} value={this.state.firstname} onChange={this.firstnameChange} placeholder="First Name"></input>
          <input style={inputStyle} value={this.state.password} onChange={this.passwordChange} placeholder="Password" type="password"></input>
          <input style={inputStyle} value={this.state.confirmation} onChange={this.confirmationChange} placeholder="Confirm password" type="password"></input>
          <input style={buttonStyle} type="submit" value="Sign up"></input>
        </form>
      </div>
    )
  }
}