import React from "react";
import LoadingIcons from 'react-loading-icons'

// settings page that at the moment just lets users navigate to login/logout 
// and signup pages depending on whether the user is currently signed in or not
export default class Loading extends React.Component {

  render() {
    const mainDivStyle = {
      height: '100vh',
      width: '100vw',
      backgroundColor: 'rgb(45, 45, 45)',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }
    return (
      <div style={mainDivStyle}>
        <h1>
          The app is still loading! Please be patient, I'm using the free version of Heroku
        </h1>
        <LoadingIcons.Grid></LoadingIcons.Grid>
      </div>
    )
  }
}