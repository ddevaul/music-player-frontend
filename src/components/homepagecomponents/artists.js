import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Playlist from "./playlist";

// page that lists 'hot' artists, notably Midterm Memory
export default class Artists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      artistName: "",
      artist: false,
      playlist: false,
      playlistName: "",
      songWrappers: [],
      playlists: [],
    }
  }

  async componentDidMount() {
    const artists = await fetch(`http://localhost:8000/api/artists/`);
    const jArtists = await artists.json();
    this.setState({
      artists: jArtists,
    });
  }

  loadArtist = async (artist) => {
    // change this below
    const response = await fetch(`http://localhost:8000/api/artists/artist/${artist.id}/essentials/`)
    const jResponse = await response.json();
    this.setState({ 
      artist: true,
      playlist: false,
      artistName: artist.name,
      playlists: jResponse,
    });
  }

  loadPlaylist = async (playlist) => {
    const response = await fetch(`http://localhost:8000/api/playlists/playlist/${playlist.id}/songs/`)
    const jResponse = await response.json();
    this.setState({ 
      artist: false,
      playlist: true,
      currentPlaylist: playlist,
      songWrappers: jResponse 
    });
  }

  backToArtists = () => {
    this.setState({ artist: false });
  }

  backToArtist = () => {
    this.setState({ 
      playlist: false,
      artist: true,
    });
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
    }

    if (this.state.artist) {
      // display artist's info
      return (
        <div style={mainDivStyle}>
          <Button variant="secondary" onClick={this.backToArtists}>Back</Button>
          <h1>{this.state.artistName}</h1>
            {this.state.playlists.map((playlist, index) => {
            return (
            <Card style={cardStyle} key={index}>
              <Card.Body>
                <Card.Title>{playlist.name}</Card.Title>
                <Button onClick={() => this.loadPlaylist(playlist)}>View</Button>
              </Card.Body>
            </Card>
            )
          })}
      </div>
      )
    }

    else if (this.state.playlist) {
      // display selected playlist/album
      return (
      <div style={mainDivStyle}>  
        <Button variant="secondary" onClick={this.backToArtist}>Back</Button>
        <Playlist playlist={this.state.currentPlaylist} 
        songWrappers={this.state.songWrappers} playSingleSong={this.props.playSingleSong}
        ></Playlist>
      </div>
      )
    }
    // otherwise display the 'hottest' artists
    return (
      <div style={mainDivStyle}>
        <h1>HOTTEST ARTISTS</h1>
        {this.state.artists.map((artist, index) => {
          return (
          <Card style={cardStyle} key={index}>
            <Card.Body>
              <Card.Title>{artist.name}</Card.Title>
              <Button onClick={() => {
                this.loadArtist(artist)
                }} variant="primary">View</Button>
            </Card.Body>
          </Card>
          )
        })}
      </div>
    )
  }
}