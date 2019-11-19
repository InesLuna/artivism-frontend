import React from 'react';
import { withAuth } from "../services/AuthProvider";


const TopNavbar = () => {
    return (
        <nav className='topNavbar'>
            <img src="/images/artivism-logo-ag.svg" alt=""/>
        </nav>
    )
}

export default withAuth(TopNavbar)
