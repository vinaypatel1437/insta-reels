import React, { Component } from "react";
import "./CSS/Login.css";
import Card from '@mui/material/Card'
import { CarouselProvider, Slider, Slide, Image } from "pure-react-carousel";
import backGroundImage from "../images/instagram.png";
import Img1 from "../images/img1.png";
import Img2 from "../images/img2.png";
import Img3 from "../images/img3.png";
import Img4 from "../images/img4.png";
import instaLogo from '../images/insta-logo.png';

import "pure-react-carousel/dist/react-carousel.es.css";
import {Link} from 'react-router-dom'
import { Button, CardActions, CardContent, TextField } from "@mui/material";

export default class Login extends Component {
    constructor() {
      super()
      this.state = {
        email: '',
        password: '',
      }
    }
    handleGoogleClick = () => {
        this.props.signupWithGoogle();
    }
    handleClick = () => {
      this.props.login(this.state.email, this.state.password);
    }
  render() {
    return (
      <div className="loginWrapper">
        <div
          className="imgWrapper"
          style={{
            backgroundImage: `url(${backGroundImage})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="img">
            <CarouselProvider
              totalSlides={4}
              visibleSlides={1}
              naturalSlideHeight={533}
              naturalSlideWidth={250}
              isPlaying={true}
              interval={3000}
              dragEnabled={false}
              infinite={true}
              touchEnabled={false}
            >
              <Slider>
                <Slide index={0}>
                  <Image src={Img1}></Image>
                </Slide>
                <Slide index={1}>
                  <Image src={Img2}></Image>
                </Slide>
                <Slide index={2}>
                  <Image src={Img3}></Image>
                </Slide>
                <Slide index={3}>
                  <Image src={Img4}></Image>
                </Slide>
              </Slider>
            </CarouselProvider>
          </div>
        </div>
        <div className="loginCard">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src={instaLogo} alt=""/>
          </div>
          <CardContent>
            <TextField label="Email" variant="outlined" fullWidth={true} onChange={(e)=> this.setState({ email: e.target.value})}/>
            <TextField label="Password" type="password" variant="outlined" fullWidth={true} onChange={(e)=> this.setState({password: e.target.value})}/>
          </CardContent>
          <CardActions>
            <Button color="primary" fullWidth={true} variant="contained" onClick={this.handleClick}> Log in </Button> 
            <Button color="primary" fullWidth={true} variant="contained" onClick={this.handleGoogleClick}> Login with google </Button>
          </CardActions>
          <div>Forgotten your password ?</div>
        </Card>
        <Card variant="outlined">
            <CardContent>
                <div className="dont-have-account">Don't have an account? <Link to="/signup">Sign up</Link></div>
            </CardContent>
        </Card>
        </div>
      </div>
    );
  }
}
