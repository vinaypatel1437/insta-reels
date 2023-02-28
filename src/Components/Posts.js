import React, { Component } from 'react'
import { database } from '../firebase'
import {getDocs} from 'firebase/firestore'
import './CSS/Posts.css';
import {AiOutlineHeart} from 'react-icons/ai';
import {BiComment} from 'react-icons/bi';

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
                    <div key={item.id} className="single-post-container">
                        <video src={data.uUrl} controls id={data.pId} className="single-post">
                        </video>
                        <AiOutlineHeart size="30px" className='like-icon' color='red'/>
                        <BiComment size="30px" className='comment-icon' color='red'/>
                        <h1>{data.uName}</h1>
                    </div>
                )
            })
        }
      </div>
    )
  }
}

