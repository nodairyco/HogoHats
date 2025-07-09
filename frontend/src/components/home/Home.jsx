import React from 'react';
import Cookies from "universal-cookie";

function Home(props) {
    const cookies = new Cookies(null, { path: '/'})
    
    return (
        <div>
            {cookies.get('accessToken')} 
        </div>
    );
}

export default Home;