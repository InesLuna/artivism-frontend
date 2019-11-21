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
        postsCopy: null
     }

     async componentDidMount(){
        this._isMounted = true
        postService.getAllPosts()
        .then(response => {
          //  console.log(response)
           this.setState({ posts: response,
        postsCopy: response });
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
        
        const allPosts = [...this.state.posts]
        const filterPosts = allPosts.filter(post => post.theme.includes(terms) || post.country.includes(terms)  || post.city.includes(terms))
        this.setState(
            {postsCopy: filterPosts}
        )
      };


    render() {
        const {postsCopy, terms} = this.state
      //  console.log(posts)
        
        return (
           
            <div className='postsViewContainer'>
                <ScrollUpButton ContainerClassName="goToTopBtnContainer" TransitionClassName="transition">
                  <img src="/images/5859828701572430747.svg" alt=""/>
                </ScrollUpButton>
                <div className='colorSearchBar'></div>
                <form onSubmit={this.handleFormSubmit} className='searchForm' >   
                    <input  type="text" name="terms"  value={terms} onChange={this.handleChange}  placeholder="Search..." />
                    <button type='submit'><img src="/images/5036916221558965373.svg" alt=""/></button>
                </form>
                {
                    postsCopy ? postsCopy.map((post, index)=>{
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
