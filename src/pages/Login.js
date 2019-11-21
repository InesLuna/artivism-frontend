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
      <>
        <Link to='/' ><img src="/images/9149026111572430742.svg" alt="" className='linkToLanding'/></Link>
        <div className='signupContainer'>
            <form onSubmit={this.handleFormSubmit} className='SignupForm'>
              <div className='inpLab'>
                <img src="/images/artivism-logo-ag.svg" alt=""/>
              </div>
                <div className='inpLab'>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={this.handleChange} placeholder="MyUsername" />
                </div>
                <div className='inpLab'>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="******" />
                </div>
                <div className='inpLab btn-container'>
                  <input type="submit" value="Login" className='btnSignup'/>
                </div>
            </form>
            <Link to={"/signup"}>Not a member? <strong>Sign up</strong></Link>
        </div>
        </>
    );
  }
}

export default withAuth(Login);
