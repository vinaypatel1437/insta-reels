import { Avatar } from '@mui/material'
import React, { Component } from 'react'
import { updateDoc, doc } from 'firebase/firestore'
import { fstore } from '../firebase'

export default class Comment extends Component {
    constructor() {
        super()
        this.state = {
            comment: '',
        }
    }
    handleClick = () => {
        let tempArr = [...this.props.postData.comments, {
            uName: this.props.userData.fullName,
            uProfile: this.props.userData.profileUrl,
            text: this.state.comment,
            uId: this.props.userData.userId,
        }];
        let tempRef = doc(fstore, "posts", this.props.id);
        updateDoc(tempRef, {comments: tempArr}).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }
  render() {
    return (
      <div>
        {
            this.props.postData.comments.map((ele) => {
                return(
                    <div style={{display: 'flex'}}>
                        <Avatar src={ele.uProfile} />
                        <p><span style={{fontWeight: 'bold'}}>{ele.uName}</span>&nbsp;&nbsp;{ele.text}</p>
                    </div>
                )
            })
        }
        <div>
            <input placeholder='comment here' type="text" onChange={(e) => this.setState({comment: e.target.value})} />
            <button onClick={this.handleClick}>Comment</button>
        </div>
      </div>
    )
  }
}
