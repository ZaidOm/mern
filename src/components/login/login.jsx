import React from "react";
import loginImg from "./../../assets/logo.png";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, FormGroup, Label, FormFeedback} from 'reactstrap';

import Alert from './../validation/alert';
import auth from "./../auth/auth.user";
import {setInStorage} from "./../../utils/storage";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.change= this.change.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.state = {
      username: '',
      usernameError: '',
      password: '',
      passwordError: '',
      toHome: false,
      alertVisible: false,
      alertColor: '',
      alertText: ''
     };
  }

  change = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      });
  };

  submitLogin(){
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
        if (response.data.code === 'SI001') {
          auth.login(() => {
            this.setState({
              toHome: true,
              alertVisible: true,
              alertColor: "success",
              alertText: "Success!"
            });
          });
          setInStorage("token", response.data.token);
        }
        if (response.data.code === 'SI002' || response.data.code === 'SI003') {
          this.setState({
            alertVisible: true,
            alertColor: "danger",
            alertText: "Invalid Username or Password"
          })
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
  }

  render() {
    if (this.state.toHome === true) {
        return <Redirect to='/home' />
    }
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="login-img" />
          </div>
          <AvForm 
          className="form"
          onSubmit={() => this.submitLogin()} >
              <FormGroup 
              className="form-group">
                <Label for="username">Username</Label>
                <AvField type="username" name="username" placeholder="username" value={this.state.username} onChange={e => this.change(e)} validate={{
                  required: {value: true, errorMessage: 'Oh No! That doesn\'t look like a Valid Username.'},
                  pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your Username must be composed only with letter and numbers'}
                }}/>
                <FormFeedback></FormFeedback>
              </FormGroup>
              <FormGroup
              className="form-group">
                <Label for="password">Password</Label>
                <AvField type="password" name="password" placeholder="password" value={this.state.password} onChange={e => this.change(e)} validate={{
                  required: {value: true, errorMessage: 'Whoops, Did you forget to put in your password?'}
                }}/>
              </FormGroup>
            <div className="footer">
            <Button type="submit" className="btn">
              Login
            </Button>
            </div>
          </AvForm>
        </div>
        {this.state.alertVisible ? <Alert color={this.state.alertColor} message={this.state.alertText}/> : null}
      </div>
    );
  }
}
