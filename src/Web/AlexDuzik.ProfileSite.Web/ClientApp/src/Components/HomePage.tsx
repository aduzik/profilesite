import React from 'react';
import { Link } from 'react-router-dom';
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
            <section className='prose prose-stone prose-headings:font-serif max-w-prose mx-auto prose-a:text-emerald-600 prose-a:no-underline prose-a:border-b prose-a:border-b-transparent hover:prose-a:border-b-emerald-600 prose-a:transition-colors'>
                <h1>Hi, I&rsquo;m Alex.</h1>
                <p>I'm a software developer from Chicago. I've been working as a consultant and software engineer since 2007.
                    I'm a full-stack developer, as comfortable working in React components as I am in Kubernetes.</p>
                <p>I've done a lot of things so far, but my primary focus has been on .NET Development and SharePoint.
                    I've worked on projects ranging from .NET Framework 2.0 Web Forms apps all the way up to .NET 6.0 SPA. (You're
                    looking at one of those right now. <a href="https://github.com/aduzik/profilesite">Wanna see the code?</a>)
                </p>
                <p>I've been fortunate to have the chance to work on some great projects throughout my career. Early on, I did a
                    number of greenfield SharePoint deployments, with some basic customizations. Later on, I worked for an insurance
                    company that used SharePoint as an application platform for several key internal systems, including an internal
                    process improvement competition site that I developed from start to finish.
                </p>
                <p>More recently, I've worked for a financial services company that uses SharePoint as a publishing platform/CMS, with
                    extensive customization and application development in .NET Framework and .NET 6.0. See
                    my <Link to="/profile">profile</Link> for more about that.
                </p>
                <p>When I'm not at work, I like to spend time with my partner, also named Alex. It's cute, we know. I have a love of
                    coffee second only, perhaps, to <a href="https://www.youtube.com/watch?v=LtmF8RRxBXg">Captain Janeway</a>. And we have
                    a very good boy, Mr. Huckleberry Hound.
                </p>
            </section>
        </>
    )
}

export default HomePage;