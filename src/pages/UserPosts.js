import React, { Component } from 'react'
import { withAuth } from "../services/AuthProvider";
import postService from '../services/posts-service'

class UserPosts extends Component {

    state = {
        posts: null,
    }
    async componentDidMount(){
        postService.getUserPosts()
        .then(response => {
            console.log(response)
           this.setState({ posts: response });
        })
        .catch(err => {
            console.log("Error finding posts ", err);
        });
    }
    render() {
       const {posts} = this.state
        return (
            <>
                {
                 posts ? posts.map((post, index) =>{
                     return(
                         <div  key={index}> <img src= {post.userImage} alt=""/></div>
                     )
                 }) : <p>Loading...</p>  
                }
            </>
        )
    }
}


export default withAuth(UserPosts)
