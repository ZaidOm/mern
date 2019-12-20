import React from "react";
import loginImg from "../../login.svg";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
     };
  }

  change = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      });
  };

  createRequest(opts) {
    fetch('https://api.github.com/gists', {
      method: 'post',
      body: JSON.stringify(opts)
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log('Signed in');
    });
    console.log(this.state.username);
    console.log(this.state.password);
  }

  submitLogin(e){
    e.preventDefault();
    var content = document.querySelector('textarea').value;
    if (content) {
      this.createRequest({
        username: this.state.username,
        password: this.state.password
      });
    }
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="login-img" />
          </div>
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
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={e => this.submitLogin(e)}>
            Login
          </button>
        </div>
      </div>
    );
  }
}
