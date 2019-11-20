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
            <label>Avatar:</label>
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
              />
            </div>

          <input type="submit" value="Signup" />
        </form>
        <Link to={"/login"}>Already a member? <span>Login</span></Link>
      </div>
    );
  }
}

export default withAuth(Signup);
