import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// !!! not completed admin page
export default class Admin extends React.Component {
 
  render() {
    const mainDivStyle = {
      height: '100%',
      width: '100%',
      backgroundColor: 'rgb(45, 45, 45)',
    }
    const cardStyle = {
      backgroundColor: 'rgb(100, 100, 100)',
      color: 'white',
      maxWidth: '15rem',
      margin: '1rem'
    }
    return (
      <div style={mainDivStyle}>
        <Card style={cardStyle}>
          <Card.Img variant="top"/>
          <Card.Body>
            <Card.Title>Song</Card.Title>
            <Card.Text>
              Image
            </Card.Text>
            <Button variant="primary">Listen</Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}