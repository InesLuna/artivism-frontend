import React, { Component } from 'react'
import { withAuth } from "../services/AuthProvider";
import {Link} from 'react-router-dom'

 class PostCard extends Component {
    
    render() {
        console.log(this.props)
        const {author, userImage, theme, city, country, date, textContent, makeThisHappend, _id}= this.props.post;

        return (
            <article>
                <div>
                   <img src={author.userImage} alt=""/>
                    <h2> {author.username} </h2>
                </div> 
                <div>
                    <img src={userImage} alt=""/>
                </div>
                <div>
                    <h3>{theme}</h3>
                    <p><strong>{city}</strong>, {country}</p>
                    <p>date</p>
                </div>
                {textContent ?
                    <div><p>{textContent}</p></div>
                    : null
                }
                { makeThisHappend ?
                    <p><strong>Make the change happen:</strong> {makeThisHappend}</p>
                    : null
                }

                <Link to={`/posts/details/${_id}`}>View details</Link>
            </article>
        )
    }
}

export default withAuth(PostCard)