import React from "react";
import PLayCircle from '@material-ui/icons/PlayCircleOutlineOutlined';
import MusicNote from '@material-ui/icons/MusicNote';
import Equalizer from '@material-ui/icons/Equalizer';
import Gear from '@material-ui/icons/Settings';
import '../../css/nav.css';

export default class NavMobile extends React.Component {
  
  render() {
    const outerDivStyle = {
      backgroundColor: 'rgb(57, 67, 82)',  
      height: '100%',
      width: '100vw',
      position: 'relative',
      paddingTop: '1rem',
    }
    const ulStyle = { 
      listStyle: 'none', 
      color: 'white', 
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
    }
    const cardStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '15px',
      height: '4rem',
      // margin: '1rem 0 1rem 0'
    }
    const selectedCardStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '15px',
      height: '4rem',
      // margin: '1rem 0 1rem 0',
      backgroundColor: 'rgba(202, 200, 200, 0.2)'
    }
    const cardTextDivStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
    }
    const iconStyle = {
      fontSize: '2rem',
      color: 'rgb(219, 9, 89)',
      marginTop: '0.25rem',
    }

    // default styles for the tabs in the nav bar
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

    let songs = 
    <div style={cardStyle}>
      <Equalizer style={iconStyle}></Equalizer>
      <div style={cardTextDivStyle}>
      <p>Songs</p>
      </div>
    </div>;

    // replaces the default tab with a highlighted tab for the page that 
    // is currently selected
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
    return (
      <div style={outerDivStyle}>
        <div className='nav-list' style={ulStyle}>
          <div onClick={() => this.props.setPage('listennow')}>
            {listennow}
          </div>
          <div onClick={() => this.props.setPage('browse')}>
            {browse}
          </div>
          <div onClick={() => this.props.setPage('songs')}>
           {songs}
          </div>
          <div>
            <a href="/#/settings" style={{ color: 'white' }}>
              <div style={cardStyle}>
                <Gear style={iconStyle}></Gear>
                <div style={cardTextDivStyle}>
                <p>Settings</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    )
  }
}