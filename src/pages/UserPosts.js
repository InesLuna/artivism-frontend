import React, { Component } from 'react'
import { withAuth } from "../services/AuthProvider";
import postService from '../services/posts-service';
import {Link} from 'react-router-dom'

class UserPosts extends Component {

    state = {
        posts: null,
    }
    componentDidMount(){
      
        postService.getUserPosts()
        .then(response => {
          //  console.log(response)
           this.setState({ posts: response });
        })
        .catch(err => {
            console.log("Error finding posts ", err);
        });
    }
    render() {
       const {posts} = this.state
        return (
            
            <section className='userViewPosts'>
                {
                 posts ? posts.map((post, index) =>{
                     return(
                         <div  key={index}> <Link to={`/posts/details/${post._id}`}><img src= {post.userImage} alt=""/></Link> </div>
                     )
                 }) : <p>Loading...</p>  
                }
                </section>
        )
    }
}


export default withAuth(UserPosts)
