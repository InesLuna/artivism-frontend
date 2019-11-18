import React, { Component } from 'react'
import { withAuth } from "../services/AuthProvider";
import CommentForm from '../components/CommentForm';
import postService from '../services/posts-service';
import PostCard from '../components/PostCard';


class PostDetails extends Component {
    state = {
        post : null,
    }

    
    componentDidMount(){
        const postId = this.props.match.params.id
        postService.getOnePost(postId)
        .then(response => {
            console.log(response)
           this.setState({ post: response });
        })
        .catch(err => {
            console.log("Error finding post ", err);
        });

    }

    render() {
        const {post} = this.state
        console.log(post)
        return (
            <>
            {
                post ?  <div> <PostCard post = {post}/> <CommentForm/> </div> : <p>Loading...</p>
            }
            </>
        )
    }
}


export default withAuth(PostDetails)
