import React, { Component } from 'react'
import { database } from '../firebase'
import {getDocs} from 'firebase/firestore'

export default class Posts extends Component {
  constructor() {
    super() 
    this.state = {
        posts: []
    }
  }
  componentDidMount() {
    let postArr = [];
    const sabArr = getDocs(database.posts).then((res) => {
        console.log(res.docs);
        this.setState({posts: res.docs})
    }).catch((err) => {
        console.log(err);
    })
    // console.log(sabArr);
  }
  render() {
    return (
      <div>
        {
            this.state.posts.map((item)=> {
                const data = item.data();
                return(
                    <div key={item.id}>
                        <video src={data.uUrl} controls id={data.pId}/>
                        <h1>{data.uName}</h1>
                    </div>
                )
            })
        }
      </div>
    )
  }
}


// Auto Scroll and Auto Pause
// Likes
//  Comment
// Profile Page