import React, { Component } from 'react'
import { withAuth } from "../services/AuthProvider";
import postService from '../services/posts-service';
import PostCard from '../components/PostCard';
import ScrollUpButton from "react-scroll-up-button";


 class PostsView extends Component {
    _isMounted = false
     state = {
        posts:null,
        terms: '',
     }

     async componentDidMount(){
        this._isMounted = true
        postService.getAllPosts()
        .then(response => {
          //  console.log(response)
           this.setState({ posts: response });
        })
        .catch(err => {
            console.log("Error finding posts ", err);
        });
    }

    handleChange = event => {
        const { name, value } = event.target;
        if(this._isMounted){
        this.setState({ [name]: value });}
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const { terms } = this.state;
        console.log(terms)
          postService.search({ terms })
          .then(response => {
            if(this._isMounted){
            this.setState({
                posts: response
            })}
            /* this.props.history.goBack() */
          });
      };


    render() {
        const {posts, terms} = this.state
      //  console.log(posts)
        
        return (
           
            <div className='postsViewContainer'>
                <ScrollUpButton ContainerClassName="ScrollUpButton__Container" TransitionClassName="ScrollUpButton__Toggled">
                    {/* // Here you can add any react component or jsx
                    // ScrollButton will apply the classnames given to the container of whatever you put here.
                    // Changing appearence this way will only work when importing the default ScrollUpButton, importing any of the specific buttons do not except children */}
                </ScrollUpButton>
                <form onSubmit={this.handleFormSubmit} className='searchForm' >
                    <input  type="text" name="terms"  value={terms} onChange={this.handleChange}  placeholder="Search..." />
                    <input type="submit" value="search" />
                </form>
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
