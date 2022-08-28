import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import SinglePost from './SinglePost';

const Blog: React.FC = () => {
    return (
        <div className='container mx-auto px-3'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/:year/:month/:slug' element={<SinglePost />} />
            </Routes>
        </div>
    )
}

export default Blog;