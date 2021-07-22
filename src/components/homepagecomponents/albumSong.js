import React from "react";
import Play from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';

// song component displayed within album component
export default class AlbumSong extends React.Component {

  render() {
    const cardStyle = {
      position: 'relative',
      backgroundColor: 'rgb(100, 100, 100)',
      color: 'white',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      marginBottom: '0.5rem',
      minHeight: '48px',
    }
    let playButtonShow = true;
    if (JSON.stringify(this.props.song) === JSON.stringify(this.props.songWrapper.song) && this.props.playing){
      playButtonShow = false;
    }
    if (playButtonShow) {
      return (
      <div style={cardStyle} key={this.props.index}>
          <div>
            <Play onClick={() => this.props.playSingleSong(this.props.songWrapper.song.id)}></Play> 
          </div>
          <div>{this.props.songWrapper.song.name}</div>
          <div>{this.props.songWrapper.song.artist.name}</div>
      </div>
      )
    }
    return (
        <div style={cardStyle} key={this.props.index}>
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
}