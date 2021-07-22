import React from "react";
import Button from "react-bootstrap/Button";
import Song from "./song";

export default class Playlist extends React.Component {
  // deletes the playlist 
  delete = () => {
    this.props.delete(this.props.playlist.id);
    this.props.back()
  }

  render() {
    const headingStyle = {
      color: 'white',
    }

    const infoDivStyle = {
      color: 'white',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 1rem',
      margin: '0 auto 0.5rem auto',
    }

    const playEntirePlaylistButtonStyle = {
      margin: '1rem',
    }

    if (this.props.playlist.playlist_type === "Playlist") {
    return (
      <div style={headingStyle}>
      <h1 >{this.props.playlist.name}</h1>
        <Button onClick={() => this.props.playPlaylist(this.props.playlist.id)} 
        style={playEntirePlaylistButtonStyle}>Play Entire Playlist</Button>
        <Button variant="secondary" onClick={() => this.props.editPlaylist()} >Edit</Button>
        <div style={infoDivStyle}>
          <div>Album</div>
          <div>Play/Pause</div>
          <div>Song</div>
          <div>Artist</div>
        </div>
        {this.props.songWrappers.map((songWrapper, index) => {
        return (
          <Song 
          index={index} 
          songWrapper={songWrapper} 
          song={this.props.song}
          playSingleSong={this.props.playSingleSong} 
          play={this.props.play}
          pause={this.props.pause}
          playing={this.props.playing}
          ></Song>
        )
      })}
      <Button variant="secondary" onClick={() => this.delete()}>Delete Playlist</Button>
    </div>
    )
    }
    return (
      <div style={headingStyle}>
      <h1 >{this.props.playlist.name}</h1>
        <Button onClick={() => this.props.playPlaylist(this.props.playlist.id)}
        style={playEntirePlaylistButtonStyle}>Play Entire Playlist</Button>
        <div style={infoDivStyle}>
          <div>Album</div>
          <div>Play/Pause</div>
          <div>Song</div>
          <div>Artist</div>
        </div>
        {this.props.songWrappers.map((songWrapper, index) => {
        return (
          <Song 
          index={index} 
          songWrapper={songWrapper} 
          song={this.props.song}
          playSingleSong={this.props.playSingleSong} 
          play={this.props.play}
          pause={this.props.pause}
          playing={this.props.playing}
          ></Song>
        )
      })}
    </div>
    )
  }
}