import React from 'react';
import Container from './Container';
import Footer from './Footer';
import NavBar from './NavBar';

type LayoutProps = React.PropsWithChildren;

const Layout: React.FC<LayoutProps> = (props) => {
    const {
        children
    } = props;

    return (
        <div className='min-h-screen flex flex-col'>
            <header className='border-b border-b-stone-200'>
                <Container>
                    <NavBar />
                </Container>
            </header>
            <main>
                {children}
            </main>
            <footer className='mt-auto mb-3'>
                <Container>
                    <div className='border-t border-t-stone-200 mt-6 py-6'>
                        <Footer />
                    </div>
                </Container>
            </footer>
        </div>
    )
}

export default Layout;