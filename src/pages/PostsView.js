import React, { Component } from 'react'
import { withAuth } from "../services/AuthProvider";
import postService from '../services/posts-service';
import PostCard from '../components/PostCard';
import ScrollUpButton from "react-scroll-up-button";


 class PostsView extends Component {
     state = {
        posts:null,
     }

     async componentDidMount(){
        postService.getAllPosts()
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
      //  console.log(posts)
        
        return (
            <div className='postsViewContainer'>
                <ScrollUpButton ContainerClassName="goToTopBtnContainer" TransitionClassName="transition">
                  <p >Top</p>
                </ScrollUpButton>
                 
                {
                    posts ? posts.map((post, index)=>{
                        return (
                            < PostCard post= {post} key={index}/>
                        )
                    }): <p>Loading...</p>
                }
            </div>
        )
    }
}

export default withAuth(PostsView)
