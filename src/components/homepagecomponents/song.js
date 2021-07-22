import React from "react";
import Play from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
const images = require.context("../../asssets/images", true);

export default class Song extends React.Component {

  render() {
    const cardStyle = {
      position: 'relative',
      backgroundColor: 'rgb(100, 100, 100)',
      color: 'white',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: ' 1fr 1fr 1fr 1fr',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '0.25rem',
      paddingBottom: '0.25rem',
      marginBottom: '0.5rem',
      borderRadius: '5px'
    }
    const albumCoverImgStyle = {
      height: '48px',
      width: '48px'
    }
    // need three conditions:
    // if the song loaded to play is the smae as the song connected to this 
    // component, and the song is playing, display a 
    if (JSON.stringify(this.props.song) === JSON.stringify(this.props.songWrapper.song) && this.props.playing){
      return (
        <div style={cardStyle} key={this.props.index}>
            <div>
              <img 
              style={albumCoverImgStyle} src={images(`./${this.props.songWrapper.song.album.img_url}`).default} 
              alt="Album cover" className="albumCover">
              </img>
            </div>
            <div>
              <Pause onClick={() => {
                this.props.pause()
                }}></Pause>
            </div>
            <div>{this.props.songWrapper.song.name}</div>
            <div>{this.props.songWrapper.song.artist.name}</div>
        </div>
      )
    }
    // if the song that's queued up is the same as the song that's connected
    // to this component and the song is NOT playing, display a play button 
    // that resumes playing the song where it left off
    else if (JSON.stringify(this.props.song) === JSON.stringify(this.props.songWrapper.song)){
      return (
      <div style={cardStyle} key={this.props.index}>
          <div>
            <img 
            style={albumCoverImgStyle} src={images(`./${this.props.songWrapper.song.album.img_url}`).default} 
            alt="Album cover" className="albumCover">
            </img>
          </div>
          <div>
            <Play onClick={() => this.props.play()}></Play> 
          </div>
          <div>{this.props.songWrapper.song.name}</div>
          <div>{this.props.songWrapper.song.artist.name}</div>
      </div>
      )
    }
    // if the song playing is not the same song as the one connected with this 
    // component then the play button will load the song associated with this
    // component in place of the current song and will start playing it
    else {
      return (
      <div style={cardStyle} key={this.props.index}>
          <div>
            <img 
            style={albumCoverImgStyle} src={images(`./${this.props.songWrapper.song.album.img_url}`).default} 
            alt="Album cover" className="albumCover">
            </img>
          </div>
          <div>
            <Play onClick={() => this.props.playSingleSong(this.props.songWrapper.song.id)}></Play> 
          </div>
          <div>{this.props.songWrapper.song.name}</div>
          <div>{this.props.songWrapper.song.artist.name}</div>
      </div>
      )
    }
  }
}