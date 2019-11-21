import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import postService from '../services/posts-service';

import { withAuth } from "../services/AuthProvider";

 class UserView extends Component {
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
        console.log(this.props)
        return (
            <div className='userviewContainer'>
                <div className='colorViewUserInfo'></div>
                <section className='userViewInfo'>
                    
                    <figure>
                        <img src={this.props.user.userImage} alt=""/>
                    </figure>
                    
                    <div>
                        <h2>{this.props.user.username}</h2>
                    </div>
                </section>
                
                <nav>
                    <Link to='/user/posts'><img src="/images/20068463741530177263.svg" alt=""/></Link>
                    {this.state.posts ? 
                        <Link to='/user/notifications' className='notificationIcon'><img src='/images/notifications.svg' alt="" /></Link> 
                        : <Link to='/user/notifications' className='notificationIcon'><img src='/images/notifications.svg' alt=""/></Link> 
                    }
                    
                </nav>
            </div>
        )
    }
}

export default withAuth(UserView)