import React from "react";
import Minus from '@material-ui/icons/RemoveOutlined';
const images = require.context("../../asssets/images", true);

// component displayed for a song that's already added to the playlist
export default class AddedPlaylistSong extends React.Component {

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
      marginBottom: '0.5rem',
    }
    const albumCoverImgStyle = {
      height: '48px',
      width: '48px'
    }
    const addSongDivStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: 'small'
    }
      return (
      <div style={cardStyle} key={this.props.index}>
          <div>
            <img 
            style={albumCoverImgStyle} src={images(`./${this.props.songWrapper.song.album.img_url}`).default} 
            alt="Album cover" className="albumCover">
            </img>
          </div>
          <div>{this.props.songWrapper.song.name}</div>
          <div>{this.props.songWrapper.song.artist.name}</div>
          <div style={addSongDivStyle}>
            <div>Delete Song</div>
            <Minus onClick={() => this.props.deleteSong(this.props.songWrapper.id)}></Minus>
          </div>
      </div>
      )
  }
}