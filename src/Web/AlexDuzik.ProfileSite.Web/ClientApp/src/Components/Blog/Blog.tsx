import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';

const Blog: React.FC = () => {
    return (
        <div className='container mx-auto'>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </div>
    )
}

export default Blog;