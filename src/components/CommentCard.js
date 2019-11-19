import React from 'react';
import { withAuth } from "../services/AuthProvider";
import Moment from 'moment'

const CommentCard = (props) => {
    const {author, textContent, created_at} = props.comment
    console.log(props.comment)
    return (
        <div className='commentCard'>
            <div>
            <h2>{author[0].username}</h2>
            <p>{Moment(created_at).format('L')}</p>
            </div>
            
            <p>{textContent}</p>
        </div>
    )
}

export default withAuth(CommentCard)
