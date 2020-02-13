import React from "react";
import loginImg from "./../../assets/logo.png";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, FormGroup, Label} from 'reactstrap';

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

  submitRegister(){
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
            setInStorage("token", response.data.token);
          });
        }
        if (response.data.code === 'SU002') {
          this.setState({
            alertVisible: true,
            alertColor: "danger",
            alertText: "Account already exists!"
          })
        }
      })
      .catch(error => {
        console.log("register error", error);
      });
  }

  render() {
    if (this.state.toHome === true)
    {
        return <Redirect to='/home' />
    }
    return (
      <div className="base-container" ref={this.props.containerRef}>
      {this.state.alertVisible ? <Alert color={this.state.alertColor} message={this.state.alertText}/> : null}
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="login-img" />
          </div>
          <AvForm 
          className="form"
          onSubmit={() => this.submitRegister()} >
            <FormGroup
            className="form-group">
              <Label htmlFor="username">Username</Label>
              <AvField type="text" name="username" placeholder="username" value={this.state.username} onChange={e => this.change(e)} validate={{
                  required: {value: true, errorMessage: 'Oh No! That doesn\'t look like a Valid Username.'},
                  pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your Username must be composed only with letter and numbers'}
                }}/>
            </FormGroup>
            <FormGroup
            className="form-group">
              <Label htmlFor="email">Email</Label>
              <AvField type="text" name="email" placeholder="email" value={this.state.email} onChange={e => this.change(e)} validate={{
                  required: {value: true, errorMessage: 'Don\'t forget to fill out your email!'},
                  pattern: {value: '/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/', 
                  errorMessage: 'Hmm, Is that really your email?.'}
                }}/>
            </FormGroup>
            <FormGroup
            className="form-group">
              <Label htmlFor="password">Password</Label>
              <AvField type="password" name="password" placeholder="password" value={this.state.password} onChange={e => this.change(e)} validate={{
                  required: {value: true, errorMessage: 'You\'re going to want a password... right?'}
                }}/>
            </FormGroup>
            <div className="footer">
            <Button type="submit" className="btn">
              Register
            </Button>
            </div>
          </AvForm>
        </div>
      </div>
    );
  }
}
