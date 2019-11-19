import React from 'react';
import { withAuth } from "../services/AuthProvider";

const CommentCard = (props) => {
    const {author, textContent} = props.comment
    console.log(author)
    return (
        <div>
            <h4>{author[0].username}</h4>
            <p>{textContent}</p>
        </div>
    )
}

export default withAuth(CommentCard)
