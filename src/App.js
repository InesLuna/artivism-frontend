import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "./services/AuthProvider";
import './App.css';
//import components

import Signup from './pages/Signup';		//		<--	Import 
import Login from './pages/Login';			//		<--	Import 
import Landing from './pages/Landing'

import PostCreate from './pages/PostCreate'
import PostsView from './pages/PostsView'
import PostDetails from './pages/PostDetails'


import NotFound from './pages/NotFound'

import UserPosts from './pages/UserPosts'
import UserNotifications from './pages/UserNotifications'


//import routes
import AnonRoute from "./routes/AnonRoute";
import PrivateRoute from "./routes/PrivateRoute";
import UserRoute from "./routes/UserRoute";
import firebase from "firebase";
const config = {
  apiKey: "AIzaSyD4wuJM2pKGB_bGmqC5SrgL55K4xUBxnak",
  authDomain: "artivism-a0a65.firebaseapp.com",
  databaseURL: "https://artivism-a0a65.firebaseio.com",
  storageBucket: "gs://artivism-a0a65.appspot.com"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <Router> 
        <AuthProvider>
          
          <Switch>
            <Route path="/" exact component={Landing} />
            <AnonRoute path="/signup" exact component={Signup} />
            <AnonRoute path="/login" exact component={Login} />

            <PrivateRoute path="/posts" exact component={PostsView}/>
            <PrivateRoute path="/posts/create" exact component={PostCreate}/> 
            <PrivateRoute path="/posts/details/:id" exact component={PostDetails}/> 

            <UserRoute path="/user/posts" exact component={UserPosts}/> 
            <UserRoute path="/user/notifications" exact component={UserNotifications}/> 
            <Route component={NotFound} />
          </Switch>
        </AuthProvider>
      </Router>   
    );
  }
}

export default App;
