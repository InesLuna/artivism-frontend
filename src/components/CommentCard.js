import React from 'react';
import { withAuth } from "../services/AuthProvider";

const CommentCard = () => {
    return (
        <div>
            comment card
        </div>
    )
}

export default withAuth(CommentCard)
