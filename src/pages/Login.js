import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../services/AuthProvider";

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    // console.log('Login -> form submit', { username, password });
    this.props.login({ username, password });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
        <div className="formContainer" >
            <form onSubmit={this.handleFormSubmit}>
                <div className='inpLab'>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={this.handleChange} placeholder="MyUsername" />
                </div>
                <div className='inpLab'>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="******" />
                </div>
                <input type="submit" value="Login" />
            </form>
            <Link to={"/signup"}>Not a member? <span>Sign up</span></Link>
        </div>
    );
  }
}

export default withAuth(Login);
