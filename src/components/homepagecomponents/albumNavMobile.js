import React from "react";
import ExpandArrow from '@material-ui/icons/ExpandMore';
import RewindArrow from '@material-ui/icons/FastRewind';
import FfArrow from '@material-ui/icons/FastForward';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import '../../css/header.css'
const images = require.context("../../asssets/images", true);

// component that pops up on mobile with large album view and 
// with more detailed controls
export default class AlbumMobileNav extends React.Component {
  
  render() {
    const outerDivStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      width: '100vw',
      height: '100%',
    }
    const collapseArrowDivStyle = {
      color: 'white',
      width: '100vw',
      display: 'flex',
      justifyContent: 'flex-start',
    }
    const arrowDivStyle = {
      color: 'white',
      // margin: 'auto',
    }
    const playArrowStyle = {
      fontSize: '5rem'
    }
    const arrowStyle = {
      fontSize: '4rem'
    }
    const playingSliderDiv = {
      display: 'flex',
      flexDirection: 'column',
    }
    const songInfoDiv = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      width: '100%',
      height: '3rem',
      fontSize: '1rem',
    }
    const albumCoverImgStyle = {
      marginTop: '5rem',
      height: '250px',
      width: '250px'
    }
    const volumeSliderDivStyle = {
      color: 'white',
      width: '12rem',
      height: '2rem',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: '1rem',
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
    const timeSliderDivStyle = {
      display: 'flex',
      flexDirection: 'row',
      color: 'white',
      alignItems: 'center'
    }
    
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
    let playpause; 
    if (this.props.playBool) {
      playpause = <Pause onClick={() => this.props.pause()} style={playArrowStyle}></Pause>
    }
    else {
      playpause = <PlayArrow onClick={() => this.props.play()} style={playArrowStyle}></PlayArrow>
    }

    return (
      <div style={outerDivStyle}>
        <div style={collapseArrowDivStyle}>
          <ExpandArrow style={arrowStyle} onClick={this.props.hideAlbumNav}></ExpandArrow>
        </div>
        <img style={albumCoverImgStyle} src={images(`./${this.props.song.album.img_url}`).default} 
        alt="Album cover" className="albumCover">
        </img>
        <div style={playingSliderDiv}>
          <div style={songInfoDiv}>
            <div>{this.props.artist.name}</div>
            <div>{this.props.song.name}</div>
          </div>
          <div style={timeSliderDivStyle}>
            <div>{current}</div>
            <input className="slider-mobile" type="range" min="0" max="100" onChange={this.props.timeScrub} value={elapsedTimePercent}></input>
            <div>{total}</div>
          </div>
        </div>
        <div style={arrowDivStyle}>
          <RewindArrow onClick={this.props.prevSong} style={arrowStyle}></RewindArrow>
          {playpause}
          <FfArrow onClick={this.props.nextSong} style={arrowStyle}></FfArrow>
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