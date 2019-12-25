import React from "react";
import loginImg from "../../login.svg";
import axios from "axios";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
     };
    this.change= this.change.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  change = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      });
  };

  submitLogin(e){
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
        console.log(response.data);
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
    e.preventDefault();
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="login-img" />
          </div>
          <form onSubmit={e => this.submitLogin(e)} >
            <div className="form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="username" name="username" placeholder="username" value={this.state.username} onChange={e => this.change(e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={e => this.change(e)}/>
              </div>
            </div>
            <div className="footer">
            <button type="submit" className="btn">
              Login
            </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
