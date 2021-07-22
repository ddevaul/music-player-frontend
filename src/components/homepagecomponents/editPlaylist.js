import React from "react";
import Button from "react-bootstrap/Button";
import AddPlaylistSong from "./addPlaylistSong";
import AddedPlaylistSong from "./addedPlaylistSong";
import { Redirect } from 'react-router';

// !!! should be refactored to more closely align with the 
// structure of createPlaylist.js
export default class EditPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: {},
      backToListenNow: false,
      newSingles: [],
      songsInPlaylist: [],
      searchedSongs: [],
      searchBarValue: "",
      searchMessage: "",
      order: 0,
      sendToLogin: false,
    }
  }

  // load songs from this playlist and display them in state
  async componentDidMount() {
    const playlist = await fetch(`http://localhost:8000/api/playlists/playlist/${this.props.playlist.id}/` );
    const jPlaylist = await playlist.json();
    // top songs to quick add
    const songs = await fetch('http://localhost:8000/api/playlists/playlist/10/songs/');
    const jSongs = await songs.json();
    this.setState({ newSingles: jSongs, playlist: jPlaylist });
    this.loadSongsInPlaylist();
  }

  // tries to get and set new refresh and access tokens, if it fails,
  // the function returns false
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

  // search backend for song based on input in search bar and add returned 
  // songs to state to be displayed as results
  searchForSong = async () => {
    const songs = await fetch(`http://localhost:8000/api/songs/song/songbyname/${this.state.searchBarValue}/`);
    const jSongs = await songs.json();
    this.setState({ searchedSongs: jSongs });
  }

  handleSearchBarChange = (event) => {
    this.setState({ searchBarValue: event.target.value });
  }

  // calls function to create songwrapper after checking if the user's 
  // tokens have expired
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
  
  // creates song wrapper with currently selected playlist and song, 
  // therefore linking them in the backend
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

  // calls function to delete songwrapper after checking if the user's 
  // tokens have expired
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

  // deletes song wrapper with currently selected playlist and song, 
  // therefore linking them in the backend
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

  // gets the songs in the current playlist and loads them in state
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
                deleteSong={this.deleteSongWrapper}
                >
                </AddedPlaylistSong>
              )
            })}
          </div>
        </div>
      )
  }
}