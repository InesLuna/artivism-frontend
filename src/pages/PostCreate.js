import React, { Component } from "react";
import { withAuth } from "../services/AuthProvider";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import postService from '../services/posts-service'

class PostCreate extends Component {
  _isMounted = false
  state = { 
    filenames: [],
    userImage: [],

    isUploading: false,
    uploadProgress: 0, 
    theme: "", 
    city: "", country: "", 
    textContent: "", 
    makeThisHappend: "" 
  };

  componentDidMount(){
    this._isMounted = true
    //console.log("mounted")
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { userImage, theme, city, country, textContent, makeThisHappend } = this.state;

      postService.createPost({ userImage, theme, city, country, textContent, makeThisHappend })
      .then(post => {
        if(this._isMounted){
        this.setState({
            filenames: [],
            userImage: [],
            isUploading: false,
            uploadProgress: 0, 
            theme: "", 
            city: "", 
            country: "", 
            textContent: "", 
            makeThisHappend: ""
        })}
        this.props.history.goBack()
      });
  };

  handleUploadStart = () =>
    this.setState({
      isUploading: true,
      uploadProgress: 0
    });
 
  handleProgress = progress =>
    this.setState({
      uploadProgress: progress
    });
 
  handleUploadError = error => {
    this.setState({
      isUploading: false
      // Todo: handle error
    });
    console.error(error);
  };
 
  handleUploadSuccess = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref("posts")
      .child(filename)
      .getDownloadURL();
      if(this._isMounted){
        this.setState(oldState => ({
          filenames: [...oldState.filenames, filename],
          userImage: [...oldState.userImage, downloadURL],
          uploadProgress: 100,
          isUploading: false
    }));}
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
    const { theme, city, country, textContent, makeThisHappend, userImage, filenames } = this.state;
    return (
      <>
        <div className='colorCreate'></div>
        <form onSubmit={this.handleFormSubmit} className='createPost'>
            <h2 className='inpLab'>Add a new post</h2>
            <div className='inpLab'>
            <label htmlFor="inputFile" className='inputFileLabel'>Upload Images</label>
              <FileUploader
              accept="image/*"
              name="image-uploader-multiple"
              randomizeFilename
              storageRef={firebase.storage().ref("posts")}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
              multiple
              id='inputFile'
            />
  
              <p>Progress: {this.state.uploadProgress}</p>
      
              <p>Filenames: {filenames.join(", ")}</p>
      
              <div>
                {userImage.map((downloadURL, i) => {
                  return <img key={i} src={downloadURL} />;
                })}
              </div>
            </div>

            <div className='inpLab'>
                <label>Theme<span>*</span></label>
                <input type="text" name="theme" value={theme} onChange={this.handleChange} placeholder='theme'/>
            </div>

            <div className='inpLab'>
                <label>City<span>*</span></label>
                <input type="text" name="city" value={city} onChange={this.handleChange} placeholder="city" />
            </div>
          
            <div className='inpLab'>
                <label>Country<span>*</span></label>
                <input type="text" name="country" value={country} onChange={this.handleChange} placeholder="country" />
            </div>

            <div className='inpLab'>
                <label>Post</label>
                <textarea name="textContent" cols="30" rows="5" value={textContent} onChange={this.handleChange}></textarea>
            </div>
          
            <div className='inpLab'>
                <label>Make this change happend</label>
                <input type="text" name="makeThisHappend" value={makeThisHappend} onChange={this.handleChange} placeholder="url" />
          </div>
          <div className='btnFormContainer inpLab'>
            <input type="submit" value="Create" />
          </div>
          
        </form>
      </>
    );
  }
}

export default withAuth(PostCreate);
