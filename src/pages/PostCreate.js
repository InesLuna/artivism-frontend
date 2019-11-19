import React, { Component } from "react";
import { withAuth } from "../services/AuthProvider";
import service from '../services/cloud-service'
import postService from '../services/posts-service'

class PostCreate extends Component {
  _isMounted = false
  state = { userImage: '', theme: "", city: "", country: "", textContent: "", makeThisHappend: "" };

  componentDidMount(){
    this._isMounted = true
    console.log("mounted")
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { userImage, theme, city, country, textContent, makeThisHappend } = this.state;

      postService.createPost({ userImage, theme, city, country, textContent, makeThisHappend })
      .then(post => {
        if(this._isMounted){
        this.setState({
            userImage: '', 
            theme: "", 
            city: "", 
            country: "", 
            textContent: "", 
            makeThisHappend: ""
        })}
        this.props.history.goBack()
      });
  };

 handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    
    uploadData.append("userImage", e.target.files[0]);

    service.handleUpload(uploadData)
        .then(response => {
          if(this._isMounted){
            this.setState({ userImage: [response.secure_url] });}
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
    const { theme, city, country, textContent, makeThisHappend } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
            <div className='inpLab'>
                <input  type="file" onChange={this.handleFileUpload } />
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
          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }
}

export default withAuth(PostCreate);
