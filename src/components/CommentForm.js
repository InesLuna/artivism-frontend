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
  
        postService.createComment({ textContent })
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
        <div>
          <form onSubmit={this.handleFormSubmit}>
              <div className='inpLab'>
                  <label>Write your comment here</label>
                  <textarea name="textContent" cols="30" rows="5" value={textContent} onChange={this.handleChange}></textarea>
              </div>
            <input type="submit" value="Signup" />
          </form>
        </div>
      );
    }
}


export default withAuth(CommentForm)
