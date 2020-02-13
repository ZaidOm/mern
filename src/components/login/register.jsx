import React from "react";
import loginImg from "./../../assets/logo.png";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Alert from './../validation/alert';

import auth from "./../auth/auth.user";
import {setInStorage} from "./../../utils/storage";

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      toHome: false,
      alertVisible: false,
      alertColor: '',
      alertText: ''
     };
    this.change= this.change.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
  }

  change = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      });
  };

  submitRegister(e){
    const { username, email, password } = this.state;

    axios
      .post(
        "http://localhost:5000/users/add",
        {
          username: username,
          email: email,
          password: password
        }
      )
      .then(response => {
        if (response.data.success === 'SU001') {
          auth.login(() => {
            this.setState({
              toHome: true
            });
          });
          setInStorage("token", response.data.token);
        }
      })
      .catch(error => {
        console.log("register error", error);
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
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="login-img" />
          </div>
          <form onSubmit={e => this.submitRegister(e)} >
            <div className="form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" placeholder="username" value={this.state.username} onChange={e => this.change(e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" placeholder="email" value={this.state.email} onChange={e => this.change(e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={e => this.change(e)}/>
              </div>
            </div>
            <div className="footer">
            {this.state.alertVisible ? <Alert color={this.state.alertColor} message={this.state.alertText}/> : null}
            <button type="submit" className="btn">
              Register
            </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
