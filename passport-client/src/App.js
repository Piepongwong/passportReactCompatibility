import React, { Component } from 'react';
import './App.css';
import axios from "axios"
import qs from 'qs';
import config from "./config.json"
class App extends Component {

  state = {
    password: "",
    username: "",
    isLoggedIn: false
  }

  change = (e)=> {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount = ()=> {
    this.isLoggedIn()
  }
  isLoggedIn = ()=> {
    axios.get(`${config.backendUrl}user/auth/isloggedin`, {withCredentials: true})
      .then((result)=> {
        debugger
        this.setState({isLoggedIn: true})
      })
      .catch((error)=> {
        this.setState({isLoggedIn: false})
      })
  }
  submit = ()=> {
    axios(`${config.backendUrl}user/login-react`, {
      withCredentials: true,
      method: "post",
      data: qs.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then((result)=> {
      debugger
    })
    .catch((error)=> {
      console.log(error)
    })
  }
  render() {
    if(!this.state.isLoggedIn) {
      return (
        <div>
          <div>
            <input onChange={this.change} name="username" placeholder="username"/>
            <input onChange={this.change} name="password" type="password" placeholder="password"/>
            <button onClick={this.submit}>Submit</button>
          </div>
  
          <button onClick={this.loginSlack}>Slack Login</button>
  
          <a href={`${config.backendUrl}user/auth/slack`}> Slack </a>
          <a href={`${config.backendUrl}user/auth/spotify`}> Spotify </a>
  
        </div>
      )
       } else {
        return (
          <h1> Profile </h1>
        )
      }
    }
  }

export default App;
