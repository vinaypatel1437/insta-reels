import "./App.css";
import React, { Component } from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";
import "./firebase"; // It is initializing the firebase for our App.
import Main from "./Components/Main";
import Profile from "./Components/Profile";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import PrivateRoute from "./Components/PrivateRoute";

const provider = new GoogleAuthProvider();
const auth = getAuth();
 class App extends Component {
  // constructor() {
  //   super()
  //   // this.state = {
  //   //   user: {},
  //   // }
  // }
  signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      console.log(res);
      localStorage.setItem('users', JSON.stringify(res.user));
      window.location.href="/";
    })
    .catch((err) => {
      console.log(err);
    })
  };
  login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      console.log(res)
      localStorage.setItem('users', JSON.stringify(res.user));
      window.location.href = "/";
    })
    .catch((err)=> {
      console.log(err);
    })
  };
  signout = () => {
    signOut(auth).then((res) => {
      window.location.href="/login";
      localStorage.removeItem('users');
    })
    .catch((err)=> {
      console.log(err);
    })
  }
  signupWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        localStorage.setItem('users', JSON.stringify(user));
        window.location.href="/"
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  login={this.login}
                  signupWithGoogle={this.signupWithGoogle}
                />
              }
            ></Route>
            <Route
              path="/signup"
              element={
                <Signup
                  signup={this.signup}
                  signupWithGoogle={this.signupWithGoogle}
                />
              }
            ></Route>
            <Route path="/" element={<PrivateRoute><Header signout={this.signout}></Header><Main/><Footer></Footer></PrivateRoute>}></Route>
            <Route path="/profile" element={<PrivateRoute><Header signout={this.signout}></Header><Profile/><Footer></Footer></PrivateRoute>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;