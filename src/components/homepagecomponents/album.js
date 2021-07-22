import React from "react";
import Button from "react-bootstrap/Button";
import AlbumSong from "./albumSong";
const images = require.context("../../asssets/images", true);

// album component
export default class Album extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      songs: [],
    }
  }

  render() {

    const infoDivStyle = {
      color: 'white',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      marginBottom: '0.5rem',
    }
    const albumCoverImgStyle = {
      height: '100%',
      width: 'auto'
    }
    const imgContainerDivStyle = {
      width: '100%',
      height: '200px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }

    return (
      <div>
        <div style={imgContainerDivStyle}>
          <img style={albumCoverImgStyle} src={images(`./${this.props.album.img_url}`).default} alt="Album cover"></img>
        </div>
        <h1>{this.props.album.name}</h1>
        <Button onClick={() => this.props.playPlaylist(this.props.album.id)}>Play Entire Album</Button>
        <div style={infoDivStyle}>
          <div>Play</div>
          <div>Song</div>
          <div>Artist</div>
        </div>
        {this.props.songWrappers.map((songWrapper, index) => {
        return (
          <AlbumSong 
          index={index} 
          songWrapper={songWrapper} 
          song={this.props.song}
          playSingleSong={this.props.playSingleSong} 
          play={this.props.play}
          pause={this.props.pause}
          playing={this.props.playing}
          ></AlbumSong>
        )
        })}
    </div>
    )
  }
}