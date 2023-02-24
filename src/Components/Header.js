import React, { Component } from "react";
import { Button } from "@mui/material";
import "./CSS/Header.css";
import ProfileImage from "../images/profile.webp";
import LogoImg from "../images/insta-logo.png";
import { Link } from "react-router-dom";

export default class Header extends Component {
    render() {
    return (
      <div className="header">
        <Link to="/">
          <img src={LogoImg} alt="" className="insta-logo" />
        </Link>
        <div className="header-actions">
          <Link to="/profile">
            <img src={ProfileImage} alt="" className="profile-image" />
          </Link>
          <Button className="Logout" variant="outlined" color="error" onClick={this.props.signout}>
            Logout
          </Button>
        </div>
      </div>
    );
  }
}
