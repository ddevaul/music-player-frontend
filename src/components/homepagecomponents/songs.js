import React from "react";
import Playlist from "./playlist";

// this is the songs page component that displays the 'hottest songs' playlist
export default class Songs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songWrappers: [],
      currentPlaylist: {},
    }
  }

  // loads the 'hottest songs' playlist and loads the pertinent information into
  // state
  async componentDidMount() {
    // this fetch should get the curated playlist 'New Singles' 
    const songs = await this.props.fetchAPI(`https://desi-music-player.herokuapp.com/api/playlists/playlist/3/songs/`, {});
    const jSongs = await songs.json();
    const playlist = await this.props.fetchAPI(`https://desi-music-player.herokuapp.com/api/curatedplaylists/curatedplaylist/3/`, {});
    const jPlaylist = await playlist.json();
    this.setState({
      songWrappers: jSongs,
      currentPlaylist: jPlaylist,
    });
  }
  
  render() {
    const mainDivStyle = {
      marginTop: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgb(45, 45, 45)',
      color: 'white',
    }
    return (
      <div style={mainDivStyle}>
        <Playlist 
        playlist={this.state.currentPlaylist}
        song={this.props.song}
        songWrappers={this.state.songWrappers} 
        playSingleSong={this.props.playSingleSong}
        playPlaylist={this.props.playPlaylist}
        pause={this.props.pause} play={this.props.play}
        playing={this.props.playing}
        ></Playlist>
      </div>
    )
  }
}