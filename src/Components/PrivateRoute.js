import { touchRippleClasses } from '@mui/material';
import { Component } from 'react'

export default class PrivateRoute extends Component {
    constructor() {
        super()
        const user = JSON.parse(localStorage.getItem("users")) || {};
        this.state = {
            user: user,
        }
    }
//   componentDidMount() {
    
//     this.setState({user: user});
//     console.log(user);
//   }
  render() {
    if (Object.keys(this.state.user).length === 0) {
        return window.location.href="/login"
    }
    return this.props.children;
  }
}
