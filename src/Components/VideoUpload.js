import { Alert, LinearProgress } from "@mui/material";
import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { storage, database } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {addDoc} from 'firebase/firestore';

export default class VideoUpload extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      loading: false,
      user: {}
    };
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("users")) || {};
    this.setState({user: user});
  }
  handleChange = (file) => {
    console.log(file);
    if (file === null || file === undefined) {
      this.setState({ error: "Please select a file" });
      setTimeout(() => {
        this.setState({ error: "" });
      }, 2000);
    }
    if (file.size / (1024 * 1024) > 100) {
      this.setState({ error: "The file is too big" });
      setTimeout(() => {
        this.setState({ error: "" });
      }, 2000);
    }
    let uid = uuidv4();
    this.setState({ loading: true });
    const uploadRef = ref(storage, `/posts/${uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(uploadRef, file);
    const f2 = (error) => {
        // Error
        // this.setState({ error: error, loading: false });
        console.log(error);
        setTimeout(() => {
          this.setState({ error: "" });
        }, 2000);
      }
      const f3 = () => {
        // Complete

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            let obj = {
                likes: [],
                comments: [],
                pId: uid,
                uUrl: downloadURL,
                uName: this.state.user.displayName ? this.state.user.displayName: this.state.user.email,
                uProfileImage: this.state.user.photoURL ? this.state.user.photoURL : 'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg',
                createdAt: Date.now(),
            }
            addDoc(database.posts, obj).then((refernce)=> {
                console.log("Posts updated success");
                console.log(refernce);
                this.setState({loading: false});
            }).catch((err)=>{
                console.log(err);
                console.log("error");
            })
          }).catch((err)=> {
            console.log(err);
          })
      }
    uploadTask.on("state_changed", f1, f2, f3);
    function f1(snapshot) {
      // Progress
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    }
    
    console.log(uploadTask);
    console.log("Function triggered");
  };
  render() {
    return (
      <div>
        {this.state.error && <Alert severity="error">{this.state.error}</Alert>}
        <input
          type="file"
          accept="video/*"
          onChange={(e) => this.handleChange(e.target.files[0])}
        />
        {this.state.loading && <LinearProgress />}
      </div>
    );
  }
}
