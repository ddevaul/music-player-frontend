import React from "react";
import PLayCircle from '@material-ui/icons/PlayCircleOutlineOutlined';
import MusicNote from '@material-ui/icons/MusicNote';
import Groups from '@material-ui/icons/Group';
import Album from '@material-ui/icons/LibraryMusic';
import Equalizer from '@material-ui/icons/Equalizer';
import Button from 'react-bootstrap/Button';
import '../../css/nav.css';

export default class Nav extends React.Component {
  
  // clears the user's tokens from local storage, therefore logging them out
  logout = () => {
    localStorage.clear();
    window.location.reload();
  }
  render() {
    const outerDivStyle = {
      backgroundColor: 'rgb(57, 67, 82)',  
      height: '100%',
      width: '100%',
      position: 'relative',
      paddingTop: '1rem',
    }
    const ulStyle = { 
      listStyle: 'none', 
      color: 'white', 
    }
    const cardStyle = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: '15px',
      height: '1.5rem',
      margin: '1rem 0 1rem 0'
    }
    const selectedCardStyle = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: '15px',
      height: '1.5rem',
      margin: '1rem 0 1rem 0',
      backgroundColor: 'rgba(202, 200, 200, 0.2)'
    }
    const cardTextDivStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
    }
    const iconStyle = {
      color: 'rgb(219, 9, 89)',
      marginRight: '1rem',
    }
    const buttonStyle = {
      width: '5rem',
      margin: '0.5rem',
    }

    // default styles for all the tabs in the nav bar
    let listennow =
    <div style={cardStyle}>
      <PLayCircle style={iconStyle}></PLayCircle>
      <div style={cardTextDivStyle}>
        <p>Listen Now</p>
      </div>
    </div>;

    let browse = 
    <div style={cardStyle}>
      <MusicNote style={iconStyle}></MusicNote>
      <div style={cardTextDivStyle}>
        <p>Browse</p>
      </div>
    </div>;

    let artists = 
    <div style={cardStyle}>
      <Groups style={iconStyle}></Groups>
      <div style={cardTextDivStyle}>
        <p>Artists</p>
      </div>
    </div>;

    let albums =
    <div style={cardStyle}>
      <Album style={iconStyle}></Album>
      <div style={cardTextDivStyle}>
      <p>Albums</p>
      </div>
    </div>;

    let songs = 
    <div style={cardStyle}>
      <Equalizer style={iconStyle}></Equalizer>
      <div style={cardTextDivStyle}>
      <p>Songs</p>
      </div>
    </div>;

    // replaces the default tab with a highlighted tab for the selected page
    switch (this.props.page) {
      case 'listennow':
        listennow = 
        <div style={selectedCardStyle}>
          <PLayCircle style={iconStyle}></PLayCircle>
          <div style={cardTextDivStyle}>
            <p>Listen Now</p>
          </div>
        </div>;
        break;
      case 'browse':
        browse = 
        <div style={selectedCardStyle}>
          <MusicNote style={iconStyle}></MusicNote>
          <div style={cardTextDivStyle}>
            <p>Browse</p>
          </div>
        </div>;
        break;
      case 'artists':
        artists = 
        <div style={selectedCardStyle}>
          <Groups style={iconStyle}></Groups>
          <div style={cardTextDivStyle}>
            <p>Artists</p>
          </div>
        </div>;
        break;
      case 'albums':
        albums = 
        <div style={selectedCardStyle}>
          <Album style={iconStyle}></Album>
          <div style={cardTextDivStyle}>
          <p>Albums</p>
          </div>
        </div>;
        break;
        case 'album':
          albums = 
          <div style={selectedCardStyle}>
            <Album style={iconStyle}></Album>
            <div style={cardTextDivStyle}>
            <p>Albums</p>
            </div>
          </div>;
          break;
      case 'songs':
        songs = 
        <div style={selectedCardStyle}>
            <Equalizer style={iconStyle}></Equalizer>
            <div style={cardTextDivStyle}>
            <p>Songs</p>
            </div>
          </div>;
      break;
      default: 
      listennow = 
        <div style={selectedCardStyle}>
          <PLayCircle style={iconStyle}></PLayCircle>
          <div style={cardTextDivStyle}>
            <p>Listen Now</p>
          </div>
        </div>;
    }
    // by default this should be loginSignup
    let loginLogoutSignup = 
    <div>
      <li>
        <a href="/#/login">
          <Button style={buttonStyle} variant="secondary">Login</Button>
        </a>
      </li>
      <li>
        <a href="/#/signup">
          <Button style={buttonStyle} variant="secondary">Signup</Button>
        </a>
      </li>
    </div>
    if (localStorage.getItem('access')){
      loginLogoutSignup = 
      <li>
        <Button style={buttonStyle} variant="secondary" onClick={this.logout}>Logout</Button>
      </li>
    }
    return (
      <div style={outerDivStyle}>
        <ul className='nav-list' style={ulStyle}>
          <li onClick={() => this.props.setPage('listennow')}>
            {listennow}
          </li>
          <li onClick={() => this.props.setPage('browse')}>
            {browse}
          </li>
          <li onClick={() => this.props.setPage('artists')}>
            {artists}
          </li>
          <li onClick={() => this.props.setPage('albums')}>
           {albums}
          </li>
          <li onClick={() => this.props.setPage('songs')}>
           {songs}
          </li>
          {loginLogoutSignup}
        </ul>
      </div>
    )
  }
}