import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import auth from "./../auth/auth.user";
import { getFromStorage, deleteFromStorage } from "./../../utils/storage";
import Sidebar from "../sidebar/sidebar";

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      toLogin: false,
      token: '',
    };
  }

  componentDidMount() {
    const token = getFromStorage('token');
    if(token) {
      //verify token
      this.setState({
        token: token
      })
    }
  }

  change = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
};

submitLogout(e){
  axios
    .get(
      "http://localhost:5000/users/logout?token=" + this.state.token,
    )
    .then(response => {
      if (response.data.success === true) {
        auth.logout(() => {
          this.setState({
            toLogin: true
          });
        });
        deleteFromStorage(this.state.token);
      }
    })
    .catch(error => {
      console.log("logout error", error);
    });
  e.preventDefault();
}

  render() {
    if (this.state.toLogin === true)
    {
        return <Redirect to='/' />
    }
    return (
      <div>
        <Sidebar></Sidebar>
        <button onClick={(e) => {this.submitLogout(e)}}>LogOut</button>
      </div>
        
    );
  }
}