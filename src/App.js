import './App.css';
import Home from './components/home';
import Admin from './components/admin';
import Login from './components/login';
import Signup from './components/signup';
import Settings from './components/settings';
import Loading from './components/loading';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showLoading: true,
      sendToLogin: false,
    }
  }  

  componentDidMount() {
    window.scrollTo(0, 0);
    this.loginProcedure();
  }

  loginProcedure = async () => {
    const accessTokenWorked = await this.tryAccessToken();
    if (!accessTokenWorked) {
      const refreshTokenWorked = await this.tryRefreshToken();
      if (refreshTokenWorked) {
        await this.tryAccessToken();
      }
      else {
        this.setState({ sendToLogin: true });
      }
    }
    this.setState({ showLoading: false });
  }

  // tries to return current users playlists
  // returns true if connection to backend is successful and false otherwise
  tryAccessToken = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      },
    }
    const playlists = await fetch(`https://desi-music-player.herokuapp.com/api/playlists/`, requestOptions);
    if (playlists.status !== 401 && playlists.status !== 500) {
      return true;
    }
    return false;
  }

  // tries to reset refresh and access tokens if possible, returns true 
  // if it is possible and false otherwise
  tryRefreshToken = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: localStorage.getItem('refresh') })
    };
    const response = await fetch('https://desi-music-player.herokuapp.com/api/token/refresh/', requestOptions)
    if(response.status === 200) {
      const jResponse = await response.json();
      localStorage.setItem("refresh", jResponse.refresh);
      localStorage.setItem("access", jResponse.access);
      return true;
    } 
    return false;
  }

  render() {
    if (this.state.showLoading) {
      return (
        <Loading></Loading>
      )
    } 
    return(
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" render={() => <Home></Home>}></Route>
          <Route exact path="/admin" render={() => <Admin></Admin>}></Route>
          <Route exact path="/login" render={() => <Login></Login>}></Route>
          <Route exact path="/signup" render={() => <Signup></Signup>}></Route>
          <Route exact path="/settings" render={() => <Settings></Settings>}></Route>
        </Switch>
      </HashRouter>
    )
  }
}

