import React from 'react';
import { useTitle } from '../util';
import Container from './Container';

const Contact: React.FC = () => {
    useTitle('Contact')

    return (
        <Container>
            <div className='mt-6 max-w-prose mx-auto prose prose-headings:font-serif prose-a:text-emerald-600 prose-a:no-underline prose-a:border-b prose-a:border-b-transparent hover:prose-a:border-b-emerald-600 prose-a:transition-colors'>
                <h1>Contact</h1>
                <h2>Email</h2>
                <p>You can email me at: </p>
                <pre title="Surely this will fool the spambots">alex -at- aduzik.com</pre>
                <div className='relative text-center before:content-[""] before:absolute before:block before:border-b before:inset-x-0 before:top-1/2 before:bottm-1/2 before:-z-10'>
                    <span className='bg-white px-2 uppercase'>Or</span>
                </div>
                <h2>Twitter</h2>
                <p>If, God help you, you're on Twitter, you can find my account <a href="https://twitter.com/aduzik" title="No really, don't click it.">here</a>.</p>
            </div>
        </Container>
    )
}

export default Contact;