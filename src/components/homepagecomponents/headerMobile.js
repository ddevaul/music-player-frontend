import React from "react";
import RewindArrow from '@material-ui/icons/FastRewind';
import FfArrow from '@material-ui/icons/FastForward';
import PlayArrow from '@material-ui/icons/PlayArrow'
import Pause from '@material-ui/icons/Pause'
import '../../css/header.css'

export default class HeaderMobile extends React.Component {
  
  render() {
    const outerDivStyle = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      width: '100vw',
      height: '100%',
    }
    const arrowDivStyle = {
      color: 'white',
      margin: 'auto',
    }
    const playArrowStyle = {
      fontSize: '3rem'
    }
    const arrowStyle = {
      fontSize: '2rem'
    }
    const playingSliderDiv = {
      display: 'flex',
      flexDirection: 'column',
    }
    const songInfoDiv = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      width: '100%',
      height: '3rem',
      margin: 'auto',
    }
    
    // return pause arrow or play arrow based on if song is currently playing
    // or not
    let playpause; 
    if (this.props.playBool) {
      playpause = <Pause onClick={() => this.props.pause()} style={playArrowStyle}></Pause>
    }
    else {
      playpause = <PlayArrow onClick={() => this.props.play()} style={playArrowStyle}></PlayArrow>
    }

    return (
      <div style={outerDivStyle} onClick={this.props.showAlbumNav}>
        <div style={arrowDivStyle}>
          <RewindArrow onClick={this.props.prevSong} style={arrowStyle}></RewindArrow>
          {playpause}
          <FfArrow onClick={this.props.nextSong} style={arrowStyle}></FfArrow>
        </div>
        <div style={playingSliderDiv}>
          <div style={songInfoDiv}>
            <div>{this.props.song.name}</div>
          </div>
        </div>
      </div>
    )
  }
}