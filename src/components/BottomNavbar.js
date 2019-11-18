import React from 'react'
import {Link} from 'react-router-dom'

const BottomNavbar = () => {
    return (
        <nav style={navStyle}>
            <Link to= '/posts'><img style={imgStyle} src="/images/3046788041543238896.svg" alt=""/></Link>
            <Link to= '/posts/create'><img style={imgStyle} src="/images/5269554541547546467.svg" alt=""/></Link>
            <Link to= '/user/posts'><img style={imgStyle} src="/images/13640110321548233620.svg" alt=""/></Link>
        </nav>
    )
}

const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    height: "40px"
}

const imgStyle ={
    height: "100%"
}



export default BottomNavbar
