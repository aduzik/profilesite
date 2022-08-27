import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuthentication } from '../../util';
import Container from '../Container';
import CreatePost from './CreatePost';
import Home from './Home';
import PostDetail from './PostDetail';

const Admin: React.FC = () => {
    const authenticated = useAuthentication();

    if (!authenticated) return null;

    return (
        <Container className='flex flex-col grow'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/posts/create' element={<CreatePost />} />
                <Route path='/posts/:id' element={<PostDetail />} />
            </Routes>
        </Container>
    )
}

export default Admin;