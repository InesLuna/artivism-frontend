import React, { Component } from 'react'
import { withAuth } from "../services/AuthProvider";
import CommentForm from '../components/CommentForm';
import postService from '../services/posts-service';
import CommentCard from '../components/CommentCard';
import Moment from 'moment';
import Slider from "react-slick";


class PostDetails extends Component {
    state = {
        post : null,
        comments: null
    }

    updateComments=(comment)=>{
        const comments= this.state.comments
        console.log(comments)
        comments.unshift(comment)
      
        this.setState({comments: comments})
    }
    
   async componentDidMount(){
        const postId = this.props.match.params.id
        const post = await postService.getOnePost(postId)
        const comments = await postService.getAllComments(postId)
        this.setState({ post, comments });
    }

    render() {
        const { post, comments}= this.state;
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <>
            {
                post ?  <div> 
                <article className='postContainer randomContainer'>
                    <div className='colorUserInfo'></div>

                    <div className='userInfo'>   
                        <figure><img src={post.author.userImage} alt=""/></figure>
                        <h2> {post.author.username} </h2>
                    </div> 
                </article>
                <Slider {...settings} >
                {
                    post.userImage.map((img, index)=>{
                        return (
                            <div key={index} className='carouselImageContainer'>
                                <img src={img} alt=""/>
                            </div>
                        )
                    })
                }
                    
                </Slider>
                <article className='postContainer'>
                    
                    <div className='colorContent'></div>

                    <div className='contentContainer '>
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
                                {/* // eslint-disable-next-line react/jsx-no-target-blank */}
                                <p className='makeThisHappend'><strong>Make the change happen:</strong><br/><a href={post.makeThisHappend} target="_blank">{post.makeThisHappend}</a></p>
                            </div>
                            : null
                        }
                    </div>
                    <CommentForm post = {post} updateComments = {this.updateComments}/> 
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
