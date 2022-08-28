import React from 'react';

const Footer: React.FC = () => {
    return (
        <div>
            <div className='md:flex md:flex-row md:items-center'>
                <span className='block'>
                    Copyright &copy; 2022 Alex Duzik.
                </span>
                <span className='block md:ml-auto text-xs text-stone-400'>
                    It looks like a website, and you're reading it, and I made it.
                </span>
            </div>
        </div>)
}

export default Footer;