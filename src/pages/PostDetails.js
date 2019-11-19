import React, { Component } from 'react'
import { withAuth } from "../services/AuthProvider";
import CommentForm from '../components/CommentForm';
import postService from '../services/posts-service';
import PostCard from '../components/PostCard';
import CommentCard from '../components/CommentCard';


class PostDetails extends Component {
    state = {
        post : null,
        comments: null
    }

    
   async componentDidMount(){
        const postId = this.props.match.params.id
        const post = await postService.getOnePost(postId)
        const comments = await postService.getAllComments(postId)
        this.setState({ post, comments });
    }

    render() {
        const {post, comments} = this.state
        console.log(comments)
        return (
            <>
            {
                post ?  <div> 
                            <PostCard post = {post}/> 
                            <CommentForm post = {post}/> 
                            { 
                            comments.map((comment, index)=>{
                              return ( <CommentCard key={index} comment={comment}/> )
                            })
                            }
                        </div> 
                : <p>Loading...</p>
            }
            </>
        )
    }
}


export default withAuth(PostDetails)
