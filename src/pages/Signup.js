import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../services/AuthProvider";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

class Signup extends Component {
  _isMounted = false
  state = { username: "", 
            aboutMe: "", 
            email: "", 
            password: "", 
            avatar: "",
            isUploading: false,
            progress: 0,
            userImage: "" };

  componentDidMount(){
    this._isMounted = true
  }
  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, aboutMe, email, userImage } = this.state;
    //console.log(userImage)
    //console.log('Signup -> form submit', { username, password });
    const data = {
      username, password, aboutMe, email, userImage
    } 
    console.log(data)
    this.props
      .signup(data)
      .then(user => {
        if(this._isMounted){
        this.setState({
          username: "", 
          aboutMe: "", 
          email: "", 
          password: "",
          avatar: "",
          isUploading: false,
          progress: 0,
          userImage: ""
        })}
      });
  };

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url =>{
        console.log(url) 
        this.setState({ userImage: url })
        console.log(this.state)
      });
  };

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
      <>
      <Link to='/' ><img src="/images/9149026111572430742.svg" alt="" className='linkToLanding'/></Link>
      <div className='signupContainer'>
        
        <form onSubmit={this.handleFormSubmit} className='SignupForm'>
            <div className='inpLab'>
                <img src="/images/artivism-logo-ag.svg" alt=""/>
              </div>
            <div className='inpLab'>
                <label>Username<strong>*</strong></label>
                <input type="text" name="username" value={username} onChange={this.handleChange} placeholder='MyUsername'/>
            </div>

            <div className='inpLab'>
                <label>About me:</label>
                <textarea name="aboutMe" cols="30" rows="5" value={aboutMe} onChange={this.handleChange}></textarea>
            </div>
          
            <div className='inpLab'>
                <label>Email<strong>*</strong></label>
                <input type="text" name="email" value={email} onChange={this.handleChange} placeholder="aaa@aaa.com" />
            </div>
          
            <div className='inpLab'>
                <label>Password<strong>*</strong></label>
                <input type="password" name="password" value={password} onChange={this.handleChange} placeholder="******" />
            </div>
            
            <div className='inpLab'>
            <label htmlFor="inputAvatar" className='inputFileAvatar'>Upload an avatar</label>
              {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
              {this.state.userImage && <img src={this.state.userImage} />}
              <FileUploader
                accept="image/*"
                name="userImage"
                randomizeFilename
                storageRef={firebase.storage().ref("images")}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
                id='inputAvatar'
              />
            </div>
            <div className='inpLab btn-container'>
              <input type="submit" value="Signup" className='btnSignup'/>
            </div>
          
        </form>
        <Link to={"/login"}>Already a member? <strong>Login</strong></Link>
      </div>
      </>
    );
  }
}

export default withAuth(Signup);
