import React from "react";
import HomeDesktop from "./home/homeDesktop";
import HomeMobile from "./home/homeMobile";

// the home page in which the main components are loaded, except for login
// signup and settings pages
export default class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      width: 0
    }
  }

  // save window dimensions in state and add an event listener to 
  // update the dimensions if the page is resized
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  // get rid of the event listener when the component is going to unmount
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  // updates the window dimensions in state
  updateWindowDimensions = () =>  {
    this.setState({ width: window.innerWidth });
  }

  render() {
    return (
      <div>
        {/* display the mobile version if the screen size is less than 1000px */}
        {this.state.width > 1000 ? <HomeDesktop></HomeDesktop> : <HomeMobile></HomeMobile>}
      </div>
    )
  }
}