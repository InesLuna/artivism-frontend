import React from 'react';
import { withAuth } from "../services/AuthProvider";
import {Link} from 'react-router-dom'


const TopNavbar = (props) => {
    return (
        <nav className='topNavbar'>
            <img src="/images/artivism-logo-ag.svg" alt=""/>
            <Link onClick={props.logout} to='/'>Logout</Link>
        </nav>
    )
}

export default withAuth(TopNavbar)
