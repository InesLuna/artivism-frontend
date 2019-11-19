import React, { Component } from 'react';
import { withAuth } from "../services/AuthProvider";
import postService from '../services/posts-service';



class CommentForm extends Component {
    _isMounted = false
    state = { textContent: '' };
  
    componentDidMount(){
      this._isMounted = true
    }
  
    handleFormSubmit = event => {
      event.preventDefault();
      const { textContent } = this.state;
  
        postService.createComment( this.props.post._id, textContent )
        .then(post => {
          if(this._isMounted){
          this.setState({ 
              textContent: "", 
          })}
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
      const { textContent } = this.state;
      return (
    
          <form onSubmit={this.handleFormSubmit} className='commentFormContainer'>
              <div className='inpLab'>
                  <label>Write your comment here</label>
                  <textarea name="textContent" cols="45" rows="5" value={textContent} onChange={this.handleChange}></textarea>
              </div>
              <div className='submit-container'>
                <input type="submit" value="Comment" className='submit-inp'/>
              </div>
          </form>
       
      );
    }
}


export default withAuth(CommentForm)
