import React from "react";
import Button from "react-bootstrap/Button";
import AddPlaylistSong from "./addPlaylistSong";
import AddedPlaylistSong from "./addedPlaylistSong";
import { Redirect } from 'react-router';

// create playlist component
export default class CreatePlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: {},
      newSingles: [],
      songsInPlaylist: [],
      searchedSongs: [],
      searchBarValue: "",
      searchMessage: "",
      order: 0,
      sendToLogin: false,
    }
  }

  // handle logic for getting new sign in and refresh tokens
  async componentDidMount() {
    const accessTokenWorked = await this.createPlaylistHandler();
    if (!accessTokenWorked) {
      const refreshTokenWorked = await this.tryRefreshToken();
    if (refreshTokenWorked) {
      this.createPlaylistHandler()
    }
    else {
      this.setState({ sendToLogin: true });
    }
   }
  }

  // creates a new playlist, returns true or false depending on success
  // of call to backend
  createPlaylistHandler = async () => {
    let playlistname = this.getPlaylistName()
    if (playlistname === "" || playlistname === null){
      this.props.back();
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      },
      body: JSON.stringify({ name: playlistname })
    };
    const newPlaylist = await fetch('http://localhost:8000/api/playlists/', requestOptions);
    // top songs to quick add 
    const songs = await fetch('http://localhost:8000/api/playlists/playlist/10/songs/');
    if (newPlaylist.status !== 500 && songs.status !== 401){
      const jSongs = await songs.json();
      const jnewPlaylist = await newPlaylist.json();
      this.setState({ newSingles: jSongs, playlist: jnewPlaylist });
      // !!! not sure this is needed here
      this.loadSongsInPlaylist();
      return true;
    }
    return false;
  }

  // prompts user to give name for playlist 
  getPlaylistName = () => {
    const playlistname = prompt("Give the Playlist a Name");
    return playlistname
  }

  // searches backend for songs whose names match whats been typed in
  // the search bar
  searchForSong = async () => {
    const songs = await fetch(`http://localhost:8000/api/songs/song/songbyname/${this.state.searchBarValue}/`);
    const jSongs = await songs.json();
    this.setState({ searchedSongs: jSongs });
  }

  handleSearchBarChange = (event) => {
    this.setState({ searchBarValue: event.target.value });
  }

  // tests if refresh token is still valid, if so, its sets new refresh
  // and access tokens in local storage, otherwise it returns false 
  tryRefreshToken = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: localStorage.getItem('refresh') })
    };
    const response = await fetch('http://localhost:8000/api/token/refresh/', requestOptions)
    if(response.status === 200) {
      const jResponse = await response.json();
      localStorage.setItem("refresh", jResponse.refresh);
      localStorage.setItem("access", jResponse.access);
      return true;
    } 
    else {
      return false;
    }
  }

  // test if the user is authorized to interact with backend and sends them
  // to login page if refresh and auth tokens are expired
  createSongWrapper = async (song) => {
    const accessTokenWorked = await this.createRequestHandler(song);
    if (!accessTokenWorked) {
      const refreshTokenWorked = await this.tryRefreshToken();
    if (refreshTokenWorked) {
      this.createRequestHandler(song)
    }
    else {
      this.setState({ sendToLogin: true });
    }
   }
  }

  // creates songwrapper with the current playlist and the newly selected 
  // song, therefore linking the two in the backend
  createRequestHandler = async (song) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      },
      body: JSON.stringify({ song, order: this.state.order, playlist: this.state.playlist.id })
    };
    const songWrapper = await fetch(`http://localhost:8000/api/playlists/playlist/${this.state.playlist.id}/songs/`, requestOptions);
    if (songWrapper.status !== 401) {
      let order = this.state.order;
      order++;
      this.setState({ order });
      this.loadSongsInPlaylist();
      return true;
    }
    return false;
  } 

  // test if the user is authorized to interact with backend and sends them
  // to login page if refresh and auth tokens are expired
  deleteSongWrapper = async (songWrapperId) => {
    const accessTokenWorked = await this.deleteRequestHandler(songWrapperId);
    if (!accessTokenWorked) {
      const refreshTokenWorked = await this.tryRefreshToken();
    if (refreshTokenWorked) {
      this.this.deleteRequestHandler(songWrapperId)
    }
    else {
      this.setState({ sendToLogin: true });
    }
   }
  }

  // deletes songwrapper
  deleteRequestHandler = async (songWrapperId) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      },
    };
    const response = await fetch(`http://localhost:8000/api/songwrappers/songwrapper/${songWrapperId}/`, requestOptions);
    if (response.status !== 401) {
      this.loadSongsInPlaylist();
      return true;
    }
    return false;
  }

  // gets songs from the playlist being made and saves them in state to be 
  // displayed
  // !!! probably can be refactored out
  loadSongsInPlaylist = async () => {
    const songs = await fetch(`http://localhost:8000/api/playlists/playlist/${this.state.playlist.id}/songs/`);
    const jSongs = await songs.json();
    this.setState({ songsInPlaylist: jSongs});
  }

  render() {
    const mainDivStyle = {
      height: '100%',
      width: '100%',
      backgroundColor: 'rgb(45, 45, 45)',
      color: 'white',
    }
    const searchBarContainerStyle = {
      display: 'flex',
      flexDirection: 'column'
    }
    const searchBarStyle = {
      width: '20rem'
    }
    const searchButtonStyle = {
      width: '10rem'
    }
    const newSinglesDiv = {
      marginTop: '5rem',
      borderTop: '1px solid white'
    }

      if (this.state.sendToLogin) {
        <Redirect to="/music-player/#/login"></Redirect>
      }
      return (
        <div style={mainDivStyle}>
          <Button onClick={this.props.back}>Done</Button>
          <h1>{this.state.playlist.name}</h1>
          <form style={searchBarContainerStyle}>
              <label htmlFor="songSearch">Search for a song by name</label>
              <input onChange={this.handleSearchBarChange} style={searchBarStyle} id="songSearch" placeholder="Song Name"></input>
              <input onClick={() => this.searchForSong()} style={searchButtonStyle} type="button" value="Search"></input>
          </form>
          <div style={newSinglesDiv}>
           <h4>Results</h4>
            {this.state.searchedSongs.map((song, index) => {
              return (
                <AddPlaylistSong 
                index={index} 
                song={song} 
                addSong={this.createSongWrapper}
                >
                </AddPlaylistSong>
              )
            })}
          </div>
          <div style={newSinglesDiv}>
            <h4>Songs in this Playlist</h4>
            {this.state.songsInPlaylist.map((songWrapper, index) => {
              return (
                <AddedPlaylistSong 
                index={index} 
                songWrapper={songWrapper} 
                addSong={this.createSongWrapper}
                deleteSong={this.deleteSongWrapper}
                >
                </AddedPlaylistSong>
              )
            })}
          </div>
          <div style={newSinglesDiv}>
            <h4>New Singles</h4>
            {this.state.newSingles.map((songWrapper, index) => {
              return (
                <AddPlaylistSong 
                index={index} 
                song={songWrapper.song} 
                addSong={this.createSongWrapper}
                >
                </AddPlaylistSong>
              )
            })}
          </div>
        </div>
      )
  }
}