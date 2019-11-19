import React, { Component } from 'react'
import { withAuth } from "../services/AuthProvider";
import {Link} from 'react-router-dom'
import Moment from 'moment'

 class PostCard extends Component {
    
    render() {
      //  console.log(this.props)
        const {author, userImage, theme, city, country, created_at, textContent, makeThisHappend, _id}= this.props.post;

        return (
            <article className='postContainer'>
                <div className='colorUserInfo'></div>
                <div className='userInfo'>   
                    <figure><img src={author.userImage} alt=""/></figure>
                    <h2> {author.username} </h2>
                </div> 
                <figure>
                    <img src={userImage} alt=""/>
                </figure>
                <div className='colorContent'></div>
                <div className='contentContainer'>
                    <h2>{theme}</h2>
                    <div className='infoDiv'>
                        <p><strong>{city}</strong>, {country}</p>
                        <p className='date'>{Moment(created_at).format('L')}</p>
                    </div>
                    {textContent ?
                    <div className='textContentGeneralView'>
                    <p><strong>{author.username}</strong> {textContent}</p> 
                    <div></div>
                    </div>
                    : null
                    }
                    <Link to={`/posts/details/${_id}`}>See post details and comments</Link>
                    { makeThisHappend ?
                    <div className='makecontainer'>
                        <div className='colorMake'></div>
                        <p className='makeThisHappend'><strong>Make the change happen:</strong><br/><a href={makeThisHappend}>{makeThisHappend}</a></p>
                    </div>
                        
                        : null
                    }
                    
                </div>
 
            </article>
        )
    }
}

export default withAuth(PostCard)