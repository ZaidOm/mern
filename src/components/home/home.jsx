import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import auth from "./../auth/auth.user";
import { getFromStorage } from "./../../utils/storage";

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      toLogin: false,
      token: '',
    };
  }

  componentDidMount() {
    const token = getFromStorage('tracker');
    if(token) {
      //verify token
      fetch('/api/account/verify?token=' + token)
        .then(response => response.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
            });
          } else {
            console.log("no valid token?");
          }
        })
    }
  }

  change = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
};

submitLogout(e){
  const { username, password } = this.state;

  axios
    .post(
      "http://localhost:5000/users/signin",
      {
        username: username,
        password: password
      }
    )
    .then(response => {
      if (response.data.success === true) {
        auth.login(() => {
          this.setState({
            toHome: true
          });
        });
      }
    })
    .catch(error => {
      console.log("login error", error);
    });
  e.preventDefault();
}

  render() {
    if (this.state.toHome === true)
    {
        return <Redirect to='/home' />
    }
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Home</div>
        <button onClick={() => {
          auth.login(() => {
            this.setState({
              toLogin: true
            });
          });
        }}>LogOut</button>
        <div className="content">
        
        </div>
      </div>
    );
  }
}
