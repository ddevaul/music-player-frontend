import React from "react";
import RewindArrow from '@material-ui/icons/FastRewind';
import FfArrow from '@material-ui/icons/FastForward';
import PlayArrow from '@material-ui/icons/PlayArrow'
import Pause from '@material-ui/icons/Pause'
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import '../../css/header.css'

export default class Header extends React.Component {
  
  render() {
    const outerDivStyle = {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      width: '100%',
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
      width: '25rem',
      display: 'flex',
      flexDirection: 'column',
    }
    const timeSliderDivStyle = {
      display: 'flex',
      flexDirection: 'row',
      color: 'white',
      alignItems: 'center'
    }
    const songInfoDiv = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      color: 'white',
      width: '100%',
      height: '3rem',
    }
    const volumeSliderDivStyle = {
      color: 'white',
      width: '12rem',
      height: '2rem',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      margin: 'auto',
    }
    const volumeDownStyle = {
      margin: 'auto',
      display: 'flex',
      flexDirection: 'col',
      justifyContent: 'flex-end'
    }
    const volumeUpStyle = {
      margin: 'auto',
      display: 'flex',
      flexDirection: 'col',
      justifyContent: 'center'
    }
    
    // calculations
    const sliderVolume = 100 * this.props.audio.volume;
    let elapsedTimePercent = this.props.currentTime/this.props.duration * 100;
    if (isNaN(elapsedTimePercent)) {
      elapsedTimePercent = 0
    };
    let current = 0;
    if (!isNaN(this.props.currentTime)) {
      current = new Date(this.props.currentTime * 1000).toISOString().substr(14, 5);
    }
    let total = 0;
    if (!isNaN(this.props.duration)) {
      total = new Date(this.props.duration * 1000).toISOString().substr(14, 5);
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
      <div style={outerDivStyle}>
        <div style={arrowDivStyle}>
          <RewindArrow onClick={this.props.prevSong} style={arrowStyle}></RewindArrow>
          {playpause}
          <FfArrow onClick={this.props.nextSong} style={arrowStyle}></FfArrow>
        </div>
        <div style={playingSliderDiv}>
          <div style={songInfoDiv}>
            <div>{this.props.artist.name}</div>
            <div>{this.props.song.name}</div>
          </div>
          <div style={timeSliderDivStyle}>
            <div>{current}</div>
            <input className="slider" type="range" min="0" max="100" onChange={this.props.timeScrub} value={elapsedTimePercent}></input>
            <div>{total}</div>
          </div>
        </div>
        <div style={volumeSliderDivStyle}>
          <div style={volumeDownStyle}>
           <VolumeDown/>
          </div>
          <input type="range" min="1" max="100" onChange={this.props.volumeChange} value={sliderVolume} id="myRange"/>
          <div style={volumeUpStyle}>
            <VolumeUp/>
          </div>
        </div>
      </div>
    )
  }
}