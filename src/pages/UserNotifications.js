import React, { Component } from 'react'
import { withAuth } from "../services/AuthProvider";
import postService from '../services/posts-service';
import {Link} from 'react-router-dom'



class UserNotifications extends Component {
    state ={
        posts: null
    }

    async componentDidMount(){
        postService.getUserPosts()
        .then(response => {
            
            const notifyPosts = response.filter(post => {
                if(post.notifications > 0){
                    return post
                }
            })
            //console.log(notifyPosts)
           this.setState({ posts: notifyPosts });
        })
        .catch(err => {
            console.log("Error finding posts ", err);
        });
    }

    render() {
        return (
            <>
                {
                    this.state.posts ? this.state.posts.map((post, index)=>{
                            return (<article key={index} className='notificationContainer'>
                                        <figure>
                                            <img src={post.userImage[0]} alt=""/>
                                        </figure>
                                        <Link to={`/posts/details/${post._id}`}>You've got {post.notifications} new comment/s</Link>
                                    </article>)
                        }): null
                }
            </>
        )
    }
}



export default withAuth(UserNotifications)
