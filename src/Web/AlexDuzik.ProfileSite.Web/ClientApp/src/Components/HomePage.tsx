import React from 'react';
import backgroundImage from '../images/skyline.jpg';
import { useTitle } from '../util';
import Container from './Container';

const HomePage: React.FC = () => {
    useTitle('Home');

    return (
        <>
            <header className='mb-6'>
                <div style={{ backgroundImage: `url('${backgroundImage}'` }} className='h-[400px] overflow-clip bg-left-top bg-cover flex flex-row items-center'>
                    <Container>
                        <h1 className='font-serif text-6xl text-white my-auto ml-6'>Hello,<br />world.</h1>
                    </Container>
                </div>
            </header>
            <section className='prose prose-stone prose-headings:font-serif max-w-prose mx-auto'>
                <h1>Hi, I&rsquo;m Alex.</h1>
                <p>I'm a software developer from Chicago. I've been working as a consultant and software engineer since 2007.
                    I'm a full-stack developer, as comfortable working in React components as I am in Kubernetes.</p>
                <p>I've done a little bit of everything in my career, but my primary focus has been on .NET Development and SharePoint.
                    I've worked on projects ranging from .NET Framework 2.0 Web Forms apps all the way up to .NET 6.0 SPA. (You're
                    looking at one of those right now.)
                </p>
                <p>I've been fortunate to have the chance to work on some great projects throughout my career. I've developed
                    custom SharePoint solutions for clients like
                </p>
            </section>
        </>
    )
}

export default HomePage;