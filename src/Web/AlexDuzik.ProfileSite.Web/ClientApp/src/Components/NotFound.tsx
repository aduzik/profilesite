import React from 'react';
import { Link } from 'react-router-dom';
import lost from '../images/lost.webp';
import Container from './Container';

const NotFound: React.FC = () => {
    return (
        <Container>
            <div className='max-w-prose mt-6 mx-auto prose prose-headings:font-serif prose-a:text-emerald-600 prose-a:no-underline prose-a:border-b prose-a:border-b-transparent hover:prose-a:border-b-emerald-600 prose-a:transition-colors'>
                <h1>Did you get lost?</h1>
                <img src={lost} alt="Tatianna got lost" />
                <p>The page you requested wasn't found. Try one of the links above on the nav bar, or <Link to="/">go back to the home
                    page</Link>.</p>
            </div>
        </Container>
    )
}

export default NotFound;