import React, { Component } from 'react';

import { withAuth } from "../services/AuthProvider";

 class UserView extends Component {
     
    render() {
        console.log(this.props)
        return (
            <div>
                <img src={this.props.user.userImage} alt=""/>
                <h2>{this.props.user.username}</h2>
            </div>
        )
    }
}

export default withAuth(UserView)