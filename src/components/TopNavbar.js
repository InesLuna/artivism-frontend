import React from 'react';
import { withAuth } from "../services/AuthProvider";


const TopNavbar = () => {
    return (
        <nav>
            <p>LOGO</p>
        </nav>
    )
}

export default withAuth(TopNavbar)
