import React, { Component } from 'react'
import Posts from './Posts'
import VideoUpload from './VideoUpload'

export default class Main extends Component {
  render() {
    return (
      <div>
        <VideoUpload />
        <Posts/>
      </div>
    )
  }
}
