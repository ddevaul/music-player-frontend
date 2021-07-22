import './App.css';
import Home from './components/home';
import Admin from './components/admin';
import Login from './components/login';
import Signup from './components/signup';
import Settings from './components/settings';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";

export default class App extends React.Component {

  render() {
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

