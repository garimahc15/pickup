import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {Button, Grid, Icon} from 'semantic-ui-react'
import About from './About'
import Footer from './Footer'
import './Homepage.css'
import AddCourt from './AddCourt';
import { firebase, googleAuthProvider } from '../fire'

const Homepage = () => {

  const [ login, setLogin ] = useState(false)

  const startLogin = () => {
      return firebase.auth().signInWithPopup(googleAuthProvider)
  }

  const startLogout = () => {
    return firebase.auth().signOut()
  }

  firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      console.log('logged in')
      setLogin(true)
    } else {
      console.log('logged out')
      setLogin(false)
    }
  })
  
  return (
    <Grid verticalAlign="middle" id="container">
      <Grid.Row id="banner">
        <Grid.Column>
          <h1>Shoot For Teams</h1>
          <h2>We find the court. You bring the game.</h2>
          <Button.Group vertical>
            <Link to="/courts">
              <Button id="btn-find" color="orange" animated>
                <Button.Content visible>Find A Court</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </Link>
            {login ? (
              <Button onClick={startLogout} animated>
                <Button.Content visible>Log Out</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right"/>
                </Button.Content>
              </Button>
            ) : (
              <Button onClick={startLogin} animated>
                <Button.Content visible>Sign In To Add Court</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right"/>
                </Button.Content>
              </Button>
            )}
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
      {login && <Grid.Row id="addCourt">
      <AddCourt />
    </Grid.Row>}
      <Grid.Row id="about">
         <About />
      </Grid.Row>
      <Grid.Row id="footer">
        <Grid.Column>
          <Footer />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}



export default Homepage