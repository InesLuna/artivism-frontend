import React from 'react';
import { withAuth } from "../services/AuthProvider";
import {Link} from 'react-router-dom'


const TopNavbar = (props) => {
   console.log(props)
    return (
        <nav className='topNavbar'>
            <img src="/images/artivism-logo-ag.svg" alt=""/>
            {
                props.needLogout ? <Link onClick={props.logout} to='/'>Logout</Link> : null
            }
            

        </nav>
    )
}

export default withAuth(TopNavbar)
