import "./App.css";
import React, { Component } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { database, storage } from "./firebase";
import { addDoc, query, where, getDocs } from "firebase/firestore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import {
  createUserWithEmailAndPassword, // to create user with email and password.
  getAuth,                       // It is use to intitialize authentication in firebase.
  signInWithEmailAndPassword,    // Sign in using email and password.
  GoogleAuthProvider,            // Google Auth Provider. We can login using google using this.
  signInWithPopup,                // To this function we provide google auth and getAuth object. To signin using google.
  signOut,                       // Sign out
} from "firebase/auth";  // It is giving us the authentication service using firebase.
import "./firebase"; // It is initializing the firebase for our App.
import Main from "./Components/Main";
import Profile from "./Components/Profile";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import PrivateRoute from "./Components/PrivateRoute";

const provider = new GoogleAuthProvider();  // Here we are making a Object provider from GoogleAuthProvider.
const auth = getAuth();                     // Here we have created a auth object using getAuth
class App extends Component {

  signup = (email, password, file, name) => {
    // Here we are creating a user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        // Putting profile Picture and user object in firestore.
        let uid = res.user.uid;
        const uploadRef = ref(storage, `/users/${uid}/ProfileImage`);
        const uploadTask = uploadBytesResumable(uploadRef, file);
        const f1 = (snapshot) => {
          // While uploading
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        };
        const f2 = (error) => {
          // When error occur
          console.log(error);
        };
        const f3 = () => {
          // Complete upload
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log(downloadURL);
              let obj = {
                email: email,
                userId: uid,
                fullName: name,
                profileUrl: downloadURL,
                createAt: new Date(),
              };
              addDoc(database.users, obj)
                .then((refernce) => {
                  console.log("User updated successfully");
                  console.log(refernce);

                  localStorage.setItem("users", JSON.stringify(obj));
                  window.location.href = "/";
                })
                .catch((err) => {
                  console.log(err);
                  console.log("error");
                });
            })
            .catch((err) => {
              console.log(err);
            });
        };
        uploadTask.on("state_changed", f1, f2, f3);
        // Putting the user in the localStorage.
        // Redirecting it to the main page.
      })
      .catch((err) => {
        console.log(err);
      });
  };
  login = (email, password) => {
    // Here we are loging in using email and password
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
        const uid = res.user.uid;
        let q = query(database.users, where("userId", "==", uid));
        getDocs(q)
          .then((data) => {
            console.log(data.docs[0].data());
            const user = data.docs[0].data();
            localStorage.setItem("users", JSON.stringify(user));
            window.location.href = "/";
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  signout = () => {
    // here we are logging out from the page.
    signOut(auth)
      .then((res) => {
        window.location.href = "/login";
        localStorage.removeItem("users");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  signupWithGoogle = (type) => {
    // Here we are doing auth using google account 
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        localStorage.setItem("users", JSON.stringify(user));
        // window.location.href = "/";
        if (type === "signup") {
          let obj = {
            email: user.email,
            userId: user.uid,
            fullName: user.displayName,
            profileUrl: user.photoURL,
            createAt: new Date(),
          };
          addDoc(database.users, obj)
            .then((refernce) => {
              console.log("User updated successfully");
              console.log(refernce);

              localStorage.setItem("users", JSON.stringify(obj));
              window.location.href = "/";
            })
            .catch((err) => {
              console.log(err);
              console.log("error");
            });
          console.log(user);
        } else {
          let q = query(database.users, where("userId", "==", user.uid));
          getDocs(q)
            .then((data) => {
              console.log(data.docs[0].data());
              const user1 = data.docs[0].data();
              localStorage.setItem("users", JSON.stringify(user1));
              window.location.href = "/";
            })
            .catch((err) => {
              console.log(err);
            });
        }
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
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Header signout={this.signout}></Header>
                  <Main />
                  <Footer></Footer>
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Header signout={this.signout}></Header>
                  <Profile />
                  <Footer></Footer>
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
