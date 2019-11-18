import React from 'react';
import { withAuth } from "../services/AuthProvider";

const UserNotifications = () => {
    return (
        <div>
            User notifications
        </div>
    )
}

export default withAuth(UserNotifications)
