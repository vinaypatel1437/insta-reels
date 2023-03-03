import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { database } from '../firebase'
import { getDocs } from 'firebase/firestore'
import './CSS/Posts.css';
import Like from './Like';
import { BiComment } from 'react-icons/bi';
import { Card } from '@mui/material';
import Comment from './Comment';


export default class Posts extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      user: {},
      isShowComment: false,
    }
  }
  componentDidMount() {
    let postArr = [];
    const sabArr = getDocs(database.posts).then((res) => {
      console.log(res.docs);

      this.setState({ posts: res.docs })
    }).catch((err) => {
      console.log(err);
    })

    const tempUser = JSON.parse(localStorage.getItem("users"));
    this.setState({ user: tempUser });
    // console.log(sabArr);
  }
  handleScroll = (e) => {
    let next = ReactDOM.findDOMNode(e.target).parentNode.parentNode.nextSibling;
    if(next) {
      next.scrollIntoView();
      console.log(next.childNodes[0].childNodes)
      next.childNodes[0].childNodes[0].autoplay = true;
      e.target.muted = true;
    }
  }
  render() {
    return (
      <div>
        {
          this.state.posts.map((item) => {
            const data = item.data();
            return (
              <div key={item.id} style={{ display: 'flex' }}>
                <div className="single-post-container">
                  <video src={data.uUrl} controls id={data.pId} className="single-post" onEnded={this.handleScroll}>
                  </video>
                  <Like userData={this.state.user} postData={data} id={item.id} />
                  <BiComment size="30px" className='comment-icon' color='red' onClick={() => this.setState({isShowComment: item.id})} />
                  <h1>{data.uName}</h1>
                </div>
                {
                  this.state.isShowComment === item.id && <Card className="commentModal" >
                    <Comment postData={data} id={item.id} userData={this.state.user} />
                  </Card>
                }

              </div>
            )
          })
        }
      </div>
    )
  }
}

