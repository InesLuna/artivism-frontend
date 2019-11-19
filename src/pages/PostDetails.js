import React, { Component } from 'react'
import { withAuth } from "../services/AuthProvider";
import CommentForm from '../components/CommentForm';
import postService from '../services/posts-service';
import CommentCard from '../components/CommentCard';
import Moment from 'moment'


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
        const { _id, post, comments}= this.state;
        console.log(this.state)
        //console.log(comments)
        return (
            <>
            {
                post ?  <div> 
                <article className='postContainer'>
                    <div className='colorUserInfo'></div>

                    <div className='userInfo'>   
                        <figure><img src={post.author.userImage} alt=""/></figure>
                        <h2> {post.author.username} </h2>
                    </div> 

                    <figure>
                        <img src={post.userImage} alt=""/>
                    </figure>

                    <div className='colorContent'></div>

                    <div className='contentContainer'>
                        <h2>{post.theme}</h2>
                        <div className='infoDiv'>
                            <p><strong>{post.city}</strong>, {post.country}</p>
                            <p className='date'>{Moment(post.created_at).format('L')}</p>
                        </div>
                        {post.textContent ?
                        <div className='textContentDetailView'><p><strong>{post.author.username}</strong> {post.textContent}</p></div>
                        : null
                        }
                        { post.makeThisHappend ?
                            <div className='makecontainer'>
                                <div className='colorMake'></div>
                                <p className='makeThisHappend'><strong>Make the change happen:</strong><br/><a href={post.makeThisHappend}>{post.makeThisHappend}</a></p>
                            </div>
                            : null
                        }
                    </div>
                    <CommentForm post = {post}/> 
                    { comments ?
                        comments.map((comment, index)=>{
                        return (<section className='commentContainer'> <CommentCard key={index} comment={comment} /></section> )  
                    }): <p>Loading...</p>
                    }
                </article>
    
                 </div> 
                : <p>Loading...</p>
            }
            </>
        )
    }
}


export default withAuth(PostDetails)
