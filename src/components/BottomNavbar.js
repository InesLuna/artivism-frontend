import React from 'react'
import {Link} from 'react-router-dom'

const BottomNavbar = () => {
    return (
        <nav  className='bottomNavbar'>
            <div>
                <Link to= '/posts'><img  src="/images/3046788041543238896.svg" alt=""/></Link>
                <Link to= '/posts/create'><img  src="/images/5269554541547546467.svg" alt=""/></Link>
                <Link to= '/user/posts'><img  src="/images/13640110321548233620.svg" alt="" /></Link>
            </div>
            
        </nav>
    )
}
export default BottomNavbar
