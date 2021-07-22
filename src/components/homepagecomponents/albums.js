import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Album from "./album";

// page that displays 'hot' albums
export default class Albums extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      albumObj: {},
      album: false,
      songs: [],
    }
  }
  async componentDidMount() {
    const albums = await fetch(`http://localhost:8000/api/albums/`);
    const jAlbums = await albums.json();
    this.setState({
      albums: jAlbums,
    });
  }

  loadAlbum = async (album) => {
    const response = await fetch(`http://localhost:8000/api/playlists/playlist/${album.id}/songs/`)
    const jResponse = await response.json();
    this.setState({ 
      album: true,
      albumObj: album,
      songs: jResponse 
    });
  }

  back = () => {
    this.setState({ album: false });
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
      width: '15rem',
      minHeight: '48px',
      margin: '1rem',
      display: 'grid',
      gridTemplateColumns: ' 1fr 1fr 1fr',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem',
    }

    if (this.state.album) { 
      return (
        <div style={mainDivStyle}>
          <Button variant="secondary" onClick={this.back}>Back</Button>
          <Album 
            album={this.state.albumObj}
            song={this.props.song}
            songWrappers={this.state.songs} 
            playSingleSong={this.props.playSingleSong}
            playPlaylist={this.props.playPlaylist}
            pause={this.props.pause} play={this.props.play}
            playing={this.props.playing}
            >  
          </Album>
        </div>
        
      )
    }
    return (
      <div style={mainDivStyle}>
        <h1>HOTTEST ALBUMS</h1>
        {this.state.albums.map((album, index) => {
          return (
          <Card style={cardStyle} key={index}>
            <Card.Body>
              <Card.Title>{album.name}</Card.Title>
              <Button onClick={() => {
                this.loadAlbum(album)
                }} variant="primary">View</Button>
            </Card.Body>
          </Card>
          )
        })}
      </div>
    )
  }
}