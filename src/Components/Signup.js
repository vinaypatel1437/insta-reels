import React, { Component } from "react";
import "./CSS/Signup.css";
import Card from '@mui/material/Card'
import {Link} from 'react-router-dom';
import instaLogo from '../images/insta-logo.png';

import "pure-react-carousel/dist/react-carousel.es.css";
import { Button, CardActions, CardContent, TextField } from "@mui/material";

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
        }
    }
    handleClick = () => {
        // console.log(this.state.email, this.state.password);
        this.props.signup(this.state.email, this.state.password);
    }
    handleGoogleClick = () => {
        this.props.signupWithGoogle();
    }
  render() {
    return (
      <div className="loginWrapper">
        <div className="loginCard">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src={instaLogo} alt=""/>
          </div>
          <CardContent>
            <TextField label="Email" variant="outlined" fullWidth={true} onChange={(e) => this.setState({email: e.target.value})}/>
            <TextField label="Full Name" variant="outlined" fullWidth={true} onChange={(e) => this.setState({username: e.target.value})}/>
            <TextField label="Password" type="password" variant="outlined" fullWidth={true} onChange={(e) => this.setState({password: e.target.value})}/>
          </CardContent>
          <CardActions>
            <Button color="primary" fullWidth={true} variant="contained" onClick={this.handleClick}> Sign Up </Button>
            <Button color="primary" fullWidth={true} variant="contained" onClick={this.handleGoogleClick}> Sign up with google </Button>
          </CardActions>
        </Card>
        <Card variant="outlined">
            <CardContent>
                <div className="dont-have-account">Already have an account? <Link to="/login">Login</Link></div>
            </CardContent>
        </Card>
        </div>
      </div>
    );
  }
}
