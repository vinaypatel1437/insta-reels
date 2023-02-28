import React, { Component } from "react";
import "./CSS/Profile.css";
import { database } from "../firebase";
import { getDocs, query, where } from "firebase/firestore";


export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      reels: [],
    };
  }
  componentDidMount() {
    const tempUser = JSON.parse(localStorage.getItem("users"));
    this.setState({ user: tempUser });
    let q = query(database.posts, where("uId", "==", tempUser.userId));
    getDocs(q)
      .then((data) => {
        this.setState({ reels: [...data.docs] });
        // const user1 = data.docs[0].data();
        // localStorage.setItem("users", JSON.stringify(user1));
        // window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="profile">
        {/* User Profile Image */}
        <h1> User Profile </h1>
        <div className="profile-container">
          <img
            src={this.state.user.profileUrl}
            alt=""
            className="user-profile-image"
          />
          <div>
            <h2>User name: {this.state.user.fullName}</h2>
            <h3>User Email: {this.state.user.email}</h3>
          </div>
        </div>
        <h1>Reels</h1>
        <div className="profile-reels">
          {this.state.reels.map((item) => {
            const data = item.data();
            return (
              <div key={item.id}>
                <video src={data.uUrl} controls id={data.pId} className="single-reel"/>
                {/* <FavoriteBorderIcon /> */}
                <h1>{data.uName}</h1>
              </div>
            );
          })}
        </div>
        {/* User Details */}
        {/* User ki reels */}
      </div>
    );
  }
}
