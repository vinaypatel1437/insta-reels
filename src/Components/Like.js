import React, { Component } from 'react'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import { updateDoc, doc } from 'firebase/firestore';
import { database, fstore } from '../firebase';

export default class Like extends Component {
    constructor() {
        super()
        this.state = {
            like: false,
        }
    }
    handleLike = () => {
        // console.log("Helo world")
        if(this.state.like === true) {
            let tempArr = this.props.postData.likes.filter((el) => el != this.props.userData.userId);
            let tempRef = doc(fstore, "posts", this.props.id);
            updateDoc(tempRef, {likes: tempArr}).then((res) => {
                console.log(res);
                this.setState({like: false});
            }).catch((err) => {
                console.log(err);
            })
        } else {
            let tempArr = [...this.props.postData.likes, this.props.userData.userId];
            let tempRef = doc(fstore, "posts", this.props.id);
            updateDoc(tempRef, {likes: tempArr}).then((res) => {
                console.log(res);
                this.setState({like: true});
            }).catch((err) => {
                console.log(err);
            })
            // [1,2,3,5]
        }
    }
    componentDidMount() {
        // console.log(this.props)
        let check = this.props.postData.likes.includes(this.props.userData.userId) ? true: false;
        this.setState({like: check});
    }
    // componentDidUpdate() {
    //     console.log(this.props)
    //     let check = this.props.postData.likes.includes(this.props.userData.userId) ? true: false;
    //     this.setState({like: check});
    // }
  render() {
    // Why writing in render?
    // Render functions runs everytime when component mounts as well as component updates
    
    return (
      <div className='like-icon' onClick={this.handleLike}> 
        <span>{this.props.postData.likes.length}</span>
        {
            this.state.like === true ? <AiFillHeart className='like-icon' size="30px"  color='red' /> : <AiOutlineHeart size="30px" className='like-icon' color='red'/>
        }
      </div>
    )
  }
}
