import React from "react";
import { getFromStorage } from "./../../utils/storage";
import Sidebar from "./../sidebar/sidebar";

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={
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

  render() {
    return (
      <div>
        <Sidebar token={this.state.token}/>
      </div>
        
    );
  }
}
