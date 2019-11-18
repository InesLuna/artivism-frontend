import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../services/AuthProvider";
import service from '../services/cloud-service'

class Signup extends Component {
  _isMounted = false
  state = { username: "", aboutMe: "", email: "", password: "", userImage: "" };

  componentDidMount(){
    this._isMounted = true
  }
  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, aboutMe, email, userImage } = this.state;
    //console.log('Signup -> form submit', { username, password });
    this.props
      .signup({ username, password, aboutMe, email, userImage })
      .then(user => {
        if(this._isMounted){
        this.setState({
          username: "", 
          aboutMe: "", 
          email: "", 
          password: "",
          userImage: ""
        })}
      });
  };

 handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    
    uploadData.append("userImage", e.target.files[0]);

    service.handleUpload(uploadData)
        .then(response => {
          if(this._isMounted){
            this.setState({ userImage: response.secure_url });}
        })
        .catch(err => {
            console.log("Error while uploading the file: ", err);
        });
} 

  handleChange = event => {
    const { name, value } = event.target;
    if(this._isMounted){
    this.setState({ [name]: value });}
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { username, password, aboutMe, email } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
            <div className='inpLab'>
                <label>Username<span>*</span></label>
                <input type="text" name="username" value={username} onChange={this.handleChange} placeholder='MyUsername'/>
            </div>

            <div className='inpLab'>
                <label>About me:</label>
                <textarea name="aboutMe" cols="30" rows="5" value={aboutMe} onChange={this.handleChange}></textarea>
            </div>
          
            <div className='inpLab'>
                <label>Email<span>*</span></label>
                <input type="text" name="email" value={email} onChange={this.handleChange} placeholder="aaa@aaa.com" />
            </div>
          
            <div className='inpLab'>
                <label>Password<span>*</span></label>
                <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="******" />
            </div>
            
            <div className='inpLab'>
                <input type="file" onChange={this.handleFileUpload } />
            </div>

          <input type="submit" value="Signup" />
        </form>
        <Link to={"/login"}>Already a member? <span>Login</span></Link>
      </div>
    );
  }
}

export default withAuth(Signup);
