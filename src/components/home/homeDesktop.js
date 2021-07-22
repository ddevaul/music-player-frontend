import React from "react";
import Nav from "../homepagecomponents/nav";
import Header from "../homepagecomponents/header"
import ListenNow from "../homepagecomponents/listennow";
import Browse from "../homepagecomponents/browse";
import Albums from "../homepagecomponents/albums";
import Artists from "../homepagecomponents/artists";
import Songs from "../homepagecomponents/songs";
const mp3s = require.context("../../asssets/songs", true);

export default class HomeDesktop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'listennow', // used for conditional rendering
      playlist: [],
      playing: false,
      songIndex: 0, 
      song: {},
      album: {},
      artist: {},
      infoPlaylistId: 0, // id of playlist currently being displayed
      audio: new Audio(mp3s('./maineday6.m4a').default),
      duration: 0,
      currentTime: 0,
      volume: 1,
    }
  }
  async componentDidMount() {
    console.log("desktop version");
    const song = await fetch(`http://localhost:8000/api/songs/song/${6}/`);
    const jSong = await song.json();
    // set playlist to empty but queue the just acquired song
    this.setPlayListSong([], jSong);
    this.pause();
  }

  setPlayListSong = (playlist, song) => {
    this.setSong(song, 0);
    this.setState({ 
      playlist: playlist,
    });
  }

  setSong = (song, index) => {
    this.state.audio.pause();
    const newAudio = new Audio(mp3s(`./${song.url}`).default)
    // these three event listeners load data into state once the long
    // is fully loaded
    newAudio.addEventListener('timeupdate', () => {
      this.setState({ 
        currentTime: newAudio.currentTime,
      });
    });
    newAudio.addEventListener('ended', () => {
      this.setState({
        playing: false,
      });
    });
    newAudio.addEventListener('loadedmetadata', () => {
      this.setState({ 
        duration: newAudio.duration,
      });
    })
    if (this.state.playing) {
      newAudio.play();
    }
    // makes the new audio have the current volume set by the user
    this.controlVolume(newAudio);
    this.setState({ 
      audio: newAudio,
      artist: song.artist,
      song: song,
      songIndex: index,
    });
  }

  controlVolume = (audio) => {
    audio.volume = this.state.volume;
  }

  // get songs and keep array of songs in state
  playPlaylist = async (playlistId) => {
    this.state.audio.pause();
    const response = await fetch(`http://localhost:8000/api/playlists/playlist/${playlistId}/songs/`);
    const jResponse = await response.json();
    this.setPlayListSong(jResponse, jResponse[0].song);
    this.play();
  }

  // similar to above but it only gets one song and puts an empty array in state
  playSingleSong = async (songId) => {
    const song = await fetch(`http://localhost:8000/api/songs/song/${songId}/`);
    const jSong = await song.json();
    this.setPlayListSong([], jSong);
    this.pause();
    this.play();
  }

  // increment the index if possible and if incremented, load the 
  // next song from the playlist array
  nextSong = () => {
    let index = this.state.songIndex;
    if (index < this.state.playlist.length - 1) {
      this.state.audio.pause();
      index++;
      this.setSong(this.state.playlist[index].song, index);
    }
  }

  // similar to next song but in reverse, with the added caveat that 
  // if the song is more than two seconds in or there's no song before it
  // in the queue, then the song just goes back to the beginning
  prevSong = () => {
    let index = this.state.songIndex;
    if (this.state.currentTime > 2 || index === 0) {
      let tempAudio = this.state.audio;
      tempAudio.currentTime = 0;
      this.setState({ audio: tempAudio });
    }
    else {
      this.state.audio.pause();
      index--;
      this.setSong(this.state.playlist[index].song, index);
    }
  }

  play = () => {
    this.setState({ playing: true })
    this.state.audio.play();
  }

  pause = () => {
    this.setState({ playing: false })
    this.state.audio.pause();
  }

  // swap audio in state with copy of audio with the volume adjusted
  volumeChange = (event) => {
    const newVolume = event.target.value/100;
    let tempAudio = this.state.audio;
    tempAudio.volume = newVolume;
    this.setState({ audio: tempAudio, volume: newVolume })
  }

  // same as volume change but with time
  timeScrub = (event) => {
    const newTime = event.target.value/100 * this.state.audio.duration;
    let tempAudio = this.state.audio;
    tempAudio.currentTime = newTime;
    this.setState({ audio: tempAudio });
  }

  setPage = (page) => {
    this.setState({ page });
  }

  setPlaylistView = (id) => {
    this.setState({ infoPlaylistId: id });
  }

  render() {
    const outerDivStyle = {
      display: 'flex',
      flexDirection: 'row',
      minHeight: '100vh',
    }
    const outerMainDivStyle = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    }
    const navDivStyle = {
      display: 'flex',
      width: '20rem',
    }
    const headerDivStyle = {
      display: 'flex',
      width: '100%',
      height: '4rem'
    }
    const mainDivStyle = {
      width: '100%',
      height: '100%'
    }
    // switch statement that returns different components depending on 
    // homepage state
    let page;
    switch (this.state.page) {
      case 'listennow':
        page = <ListenNow 
          playPlaylist={this.playPlaylist} 
          setPlaylistView={this.setPlaylistView} 
          setPage={this.setPage} 
          playSingleSong={this.playSingleSong} 
          pause={this.pause} play={this.play}
          song={this.state.song} 
          playing={this.state.playing}
          >
        </ListenNow>
        break;
      case 'browse':
        page = 
        <Browse 
          playPlaylist={this.playPlaylist} 
          setPlaylistView={this.setPlaylistView} 
          setPage={this.setPage} 
          playSingleSong={this.playSingleSong} 
          pause={this.pause} play={this.play}
          song={this.state.song} 
          playing={this.state.playing}
        >
        </Browse>
        break;
      case 'artists':
        page = <Artists 
        playPlaylist={this.playPlaylist} 
        setPlaylistView={this.setPlaylistView} 
        setPage={this.setPage} 
        playSingleSong={this.playSingleSong} 
        pause={this.pause} play={this.play}
        song={this.state.song} 
        playing={this.state.playing}>
        </Artists>
        break;
      case 'albums':
        page = 
        <Albums 
        playPlaylist={this.playPlaylist} 
        setPlaylistView={this.setPlaylistView} 
        setPage={this.setPage} 
        playSingleSong={this.playSingleSong} 
        pause={this.pause} play={this.play}
        song={this.state.song} 
        playing={this.state.playing}>
        </Albums>
        break;
      case 'songs':
        page = 
        <Songs 
          playPlaylist={this.playPlaylist} 
          setPlaylistView={this.setPlaylistView} 
          setPage={this.setPage} 
          playSingleSong={this.playSingleSong} 
          pause={this.pause} play={this.play}
          song={this.state.song} 
          playing={this.state.playing}
        >
        </Songs>
        break;
      default:
        page = <ListenNow></ListenNow>
    }
    return (
      <div style={outerDivStyle}>
        <div style={navDivStyle}>
          <Nav page={this.state.page} setPage={this.setPage}></Nav>
        </div>
        <div style={outerMainDivStyle}>
          <div style={headerDivStyle}>
           <Header 
            audio={this.state.audio} 
            play={this.play} pause={this.pause} 
            playBool={this.state.playing} 
            timeScrub={this.timeScrub} 
            volumeChange={this.volumeChange} 
            nextSong={this.nextSong} 
            prevSong={this.prevSong} 
            album={this.state.album}
            artist={this.state.artist} 
            song={this.state.song}
            duration={this.state.duration} 
            currentTime={this.state.currentTime}
           ></Header>
          </div>
          <div style={mainDivStyle}>
            {page}
          </div>
        </div>
      </div>
    )
  }
}