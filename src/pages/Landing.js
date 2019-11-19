import React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../services/AuthProvider";


const Landing = () => {
    return (
        <div className='landingContainer'>
            <img src="/images/artivism-logo-ag.svg" alt=""/>
            <div className="colorDivOne"></div>
            <p>The artivist (artist + activist) uses her artistic talents to fight and struggle against injustice and oppression—by any medium necessary. The artivist merges commitment to freedom and justice with the pen, the lens, the brush, the voice, the body, and the imagination. The artivist knows that to make an observation is to have an obligation.</p> 
            <div className="colorDivTwo"></div>
            <div className='btn-container'>
                <button><Link to="/signup" >Be a part of the revolution</Link></button>
            </div>
            
           
            <p>View the <Link to='/posts'>posts</Link></p>
        </div>
    )
}

export default withAuth(Landing)
