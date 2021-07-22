import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// component that display info about individual artist
export default class Artist extends React.Component {
 
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
    return (
      <div style={mainDivStyle}>
        <h1>Artist Name</h1>
        <Card style={cardStyle}>
          <Card.Img variant="top"/>
          <Card.Body>
            <Card.Title>Album</Card.Title>
            <Card.Text>
              Description
            </Card.Text>
            <Button variant="primary">Listen</Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}