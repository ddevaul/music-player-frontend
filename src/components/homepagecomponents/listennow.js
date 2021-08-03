import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Playlist from "./playlist";
import CreatePlaylist from "./createPlaylist";
import EditPlaylist from "./editPlaylist";

export default class ListenNow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      createPlaylist: false,
      playlist: false,
      editPlaylist: false,
      currentPlaylist: {},
      songWrappers: [],
      playlists: [],
      songs: [],
    }
  }  

  // checks if user's tokens have expired and sends them to login screen if 
  // they have expired
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getPlaylists();
  }

  // tries to return current users playlists
  // returns true if connection to backend is successful and false otherwise
  getPlaylists = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      },
    }
    const playlists = await this.props.fetchAPI(`https://desi-music-player.herokuapp.com/api/playlists/`, requestOptions);
    const jPlaylists = await playlists.json();
    this.setState({ playlists: jPlaylists });
  }

  // get playlist information from backend and save said information in state
  loadPlaylist = async (playlist) => {
    const response = await this.props.fetchAPI(`https://desi-music-player.herokuapp.com/api/playlists/playlist/${playlist.id}/songs/`, {});
    const jResponse = await response.json();
    this.setState({ 
      playlist: true,
      currentPlaylist: playlist,
      songWrappers: jResponse,
    });
  }

  // load page for user to create playlist
  loadCreatePlaylist = () => {
    this.setState({ createPlaylist: true });
  }

  // load page for user to edit playlist
  loadEditPlaylist = () => {
    this.setState({ editPlaylist: true });
  }

  // delete the specified playlist
  deletePlaylist = async (playlistId) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      },
    };
    await this.props.fetchAPI(`https://desi-music-player.herokuapp.com/api/playlists/playlist/${playlistId}/`, requestOptions);
  }

  // go back to view of all playlists, don't have any special windows
  back = () => {
    this.setState({ playlist: false, createPlaylist: false, editPlaylist: false });
  }

  render() {
    const mainDivStyle = {
      height: '100%',
      width: '100%',
      backgroundColor: 'rgb(45, 45, 45)',
      color: 'white',
    }
    
    const cardStyle = {
      backgroundColor: 'rgb(100, 100, 100)',
      color: 'white',
      maxWidth: '15rem',
      margin: '1rem',
      display: 'flex',
    }

    const createPlaylistButtonStyle = {
      marginLeft: '1rem',
    }

    if (this.state.createPlaylist){
      return (
        <CreatePlaylist back={this.back}></CreatePlaylist>
      )
    }
    else if (this.state.editPlaylist){
      return (
        <EditPlaylist playlist={this.state.currentPlaylist} back={this.back}></EditPlaylist>
      )
    }
    else if (!localStorage.getItem('access')){
      return (
      <div style={mainDivStyle}>
       <h1 style={{ color: 'white' }}>Please sign in to save playlists</h1>
      </div>
      )
    }
    else if (this.state.playlists.length === 0) {
      return (
        <div style={mainDivStyle}>
         <h1 style={{ color: 'white' }}>You have no playlists at the moment</h1>
         <Button variant="secondary" onClick={this.loadCreatePlaylist}>Create Playlist</Button>
        </div>
        )
    }
    else if (this.state.playlist) {
      return (
        <div style={mainDivStyle}>
        <Button variant="secondary" onClick={this.back}>Back</Button>
        <Playlist 
          editPlaylist={this.loadEditPlaylist}
          back={this.back}
          delete={this.deletePlaylist}
          playlist={this.state.currentPlaylist}
          song={this.props.song}
          songWrappers={this.state.songWrappers} 
          playSingleSong={this.props.playSingleSong}
          playPlaylist={this.props.playPlaylist}
          pause={this.props.pause} 
          play={this.props.play}
          playing={this.props.playing}>
        </Playlist>
      </div>
        )
    }
    return (
      <div style={mainDivStyle}>
          <h1>{`${localStorage.getItem('username')}'s Playlists`}</h1>
          <Button style={createPlaylistButtonStyle} variant="secondary" 
          onClick={this.loadCreatePlaylist}>Create Playlist</Button>
          {this.state.playlists.map((playlist, index) => {
          return (
          <Card style={cardStyle} key={index}>
            <Card.Body>
              <Card.Title>{playlist.name}</Card.Title>
              <Button onClick={() => this.loadPlaylist(playlist)}>view</Button>
            </Card.Body>
          </Card>
          )
        })}
      </div>
    )
  }
}