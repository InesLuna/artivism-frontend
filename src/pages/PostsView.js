import React, { Component } from 'react'
import { withAuth } from "../services/AuthProvider";
import postService from '../services/posts-service';
import PostCard from '../components/PostCard';

 class PostsView extends Component {
     state = {
        posts:null,
     }

     async componentDidMount(){
        postService.getAllPosts()
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
        console.log(posts)
        return (
            <>
                {
                    posts ? posts.map((post, index)=>{
                        return (
                            < PostCard post= {post} key={index}/>
                        )
                    }): <p>Loading...</p>
                }
            </>
        )
    }
}

export default withAuth(PostsView)
