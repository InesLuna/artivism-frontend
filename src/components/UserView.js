import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import { withAuth } from "../services/AuthProvider";

 class UserView extends Component {
     
    render() {
        console.log(this.props)
        return (
            <div className='userviewContainer'>
                <div className='colorViewUserInfo'></div>
                <section className='userViewInfo'>
                    
                    <figure>
                        <img src={this.props.user.userImage} alt=""/>
                    </figure>
                    
                    <div>
                        <h2>{this.props.user.username}</h2>
                    </div>
                </section>
                
                <nav>
                    <Link to='/user/posts'><img src="/images/20068463741530177263.svg" alt=""/></Link>
                    <Link to='/user/notifications'>Notifications</Link>
                </nav>
            </div>
        )
    }
}

export default withAuth(UserView)