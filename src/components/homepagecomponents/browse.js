import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Playlist from "./playlist";
import Album from "./album";

// browse page component
export default class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      artistName: "",
      playlist: false,
      currentPlaylist: {},
      songWrappers: [],
      playlists: [],
      artistEssentials: [],
      newSingles: {},
      displayAlbum: false,
      album: {},
    }
  }
  async componentDidMount() {
    // need to set curated playlists for artists, singles, and albums
    const essentials = await this.props.fetchAPI(`https://desi-music-player.herokuapp.com/api/artists/artist/${1}/essentials/`, {});
    const jEssentials = await essentials.json();
    const newSingles = await this.props.fetchAPI(`https://desi-music-player.herokuapp.com/api/curatedplaylists/curatedplaylist/2/`, {});
    const jnewSingles = await newSingles.json();
    const album = await this.props.fetchAPI(`https://desi-music-player.herokuapp.com/api/albums/album/1/`, {});
    const jAlbum = await album.json();
    this.setState({
      album: jAlbum,
      newSingles: jnewSingles,
      artistEssentials: jEssentials,
    });
  }

  loadAlbum = async (album) => {
    const response = await this.props.fetchAPI(`https://desi-music-player.herokuapp.com/api/playlists/playlist/${album.id}/songs/`, {});
    const jResponse = await response.json();
    this.setState({ 
      playlist: false,
      songWrappers: jResponse,
      displayAlbum: true,
    });
  } 

  loadPlaylist = async (playlist) => {
    const response = await this.props.fetchAPI(`https://desi-music-player.herokuapp.com/api/playlists/playlist/${playlist.id}/songs/`, {});
    const jResponse = await response.json();
    this.setState({ 
      playlist: true,
      displayAlbum: false,
      currentPlaylist: playlist,
      songWrappers: jResponse,
      playlistId: playlist.id,
    });
  }

  back = () => {
    this.setState({  playlist: false, displayAlbum: false });
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
      margin: '1rem'
    }
    const newSinglesDivStyle = {
      borderTop: '1px solid white',
      borderBottom: '1px solid white',
    }
    const backButtonStyle = {
      margin: '1rem',
    }

    if (this.state.playlist) {
      return (
        <div style={mainDivStyle}>
          <Button variant="secondary" style={backButtonStyle} onClick={this.back}>Back</Button>
          <Playlist 
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
    else if (this.state.displayAlbum) {
      return (
        <div style={mainDivStyle}>
          <Button variant="secondary" style={backButtonStyle} onClick={this.back}>Back</Button>
          <Album 
            album={this.state.album}
            song={this.props.song}
            songWrappers={this.state.songWrappers} 
            playSingleSong={this.props.playSingleSong}
            playPlaylist={this.props.playPlaylist}
            pause={this.props.pause} 
            play={this.props.play}
            playing={this.props.playing}
            >
          </Album>
        </div>
        )
    }
    return (
      <div style={mainDivStyle}>
        <h1>FRESH NEW ARTISTS</h1>
        {this.state.artistEssentials.map((playlist, index) => {
          return (
          <Card style={cardStyle} key={index}>
            <Card.Body>
              <Card.Title>{playlist.name}</Card.Title>
              <Button onClick={() => this.loadPlaylist(playlist)}>view</Button>
            </Card.Body>
          </Card>
          )
        })}
        <div style={newSinglesDivStyle}>
          <h1>FRESH NEW SINGLES</h1>
            <Card style={cardStyle}>
              <Card.Body>
                <Card.Title>New Singles</Card.Title>
                <Button onClick={() => this.loadPlaylist(this.state.newSingles)}>view</Button>
              </Card.Body>
            </Card>
        </div>
        <h1>HOTTEST ALBUMS</h1>
        <Card style={cardStyle}>
            <Card.Body>
              <Card.Title>{this.state.album.name}</Card.Title>
              <Button onClick={() => this.loadAlbum(this.state.album)}>view</Button>
            </Card.Body>
          </Card>
      </div>
    )
  }
}